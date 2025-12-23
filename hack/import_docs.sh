#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

# Verify we are working on the root of the repo
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "${REPO_ROOT}"

CNPG_REPOSITORY=https://github.com/percona/everest-doc.git

# Require a version to be specified
if [ "$#" -ne 1 ]; then
    echo "Usage: hack/import_docs.sh release-version"
    echo ""
    echo "e.g. hack/import_docs.sh 1.15"
    exit 1
fi

# Set target directory
release_version=${1#v}
DOCDIR=$REPO_ROOT/assets/documentation
TARGETDIR=$DOCDIR/$release_version
PREVIEW_RELEASE=0

# Create a temporary folder in which to clone the CNPG branch
WORKDIR=$(mktemp -d)
mkdir -p $WORKDIR/cnpg

# Decide which ref (branch or tag) to clone from the upstream repository.
# Strategy:
# 1) Try branch `release-MAJOR.MINOR` (if release_version contains MAJOR.MINOR)
# 2) Try tags in order: exact `release_version`, `v<release_version>`,
#    `MAJOR.MINOR`, `vMAJOR.MINOR`.
# 3) Fallback to `main` (and mark as preview).

# extract MAJOR.MINOR if possible
MAJOR_MINOR=""
if [[ "${release_version}" =~ ^([0-9]+)\.([0-9]+)(\.[0-9]+)?$ ]]; then
  MAJOR_MINOR="${BASH_REMATCH[1]}.${BASH_REMATCH[2]}"
fi

REF_NAME=""
REF_TYPE=""

if [ -n "$MAJOR_MINOR" ]; then
  BRANCH_CAND="release-$MAJOR_MINOR"
  if git ls-remote --heads "$CNPG_REPOSITORY" "$BRANCH_CAND" | grep -q .; then
    REF_NAME="$BRANCH_CAND"
    REF_TYPE="branch"
    PREVIEW_RELEASE=0
  fi
fi

if [ -z "$REF_NAME" ]; then
  # try tags (exact and with v-prefix), also try MAJOR_MINOR variants
  for t in "$release_version" "v$release_version" "$MAJOR_MINOR" "v$MAJOR_MINOR"; do
    [ -z "$t" ] && continue
    if git ls-remote --tags "$CNPG_REPOSITORY" "refs/tags/$t" | grep -q .; then
      REF_NAME="$t"
      REF_TYPE="tag"
      PREVIEW_RELEASE=0
      break
    fi
  done
fi

if [ -z "$REF_NAME" ]; then
  REF_NAME="main"
  REF_TYPE="branch"
  PREVIEW_RELEASE=1
fi

echo "Cloning $CNPG_REPOSITORY (ref: $REF_NAME, type: $REF_TYPE)"
git clone --depth 1 --branch "$REF_NAME" "$CNPG_REPOSITORY" "$WORKDIR/cnpg"

mkdir -p $TARGETDIR

# Find where `mkdocs.yml` is located in the cloned repo (repo root or docs/)
DOCS_SRC_DIR=""
if [ -f "$WORKDIR/cnpg/docs/mkdocs.yml" ]; then
  DOCS_SRC_DIR="$WORKDIR/cnpg/docs"
elif [ -f "$WORKDIR/cnpg/mkdocs.yml" ]; then
  DOCS_SRC_DIR="$WORKDIR/cnpg"
else
  echo "mkdocs.yml not found in cloned repository; aborting" >&2
  rm -rf "$WORKDIR"
  exit 1
fi

pushd "$DOCS_SRC_DIR"
# If mkdocs.yml has a `site_name:` line, append the version to it (generic)
if grep -q '^site_name:' mkdocs.yml; then
  sed -i "s/^\(site_name:.*\)$/\1 v$release_version/" mkdocs.yml || true
fi

docker pull minidocks/mkdocs:latest
# Install Python requirements (if any) inside the container before building
docker run --rm -v "$(pwd):$(pwd)" -w "$(pwd)" \
  -v "$TARGETDIR:/var/cnpg" \
  -e GIT_PYTHON_REFRESH=quiet \
  minidocks/mkdocs:latest \
   /bin/sh -c 'if [ -f requirements.txt ]; then \
     pip install --no-cache-dir mkdocs-git-revision-date-plugin mkdocs-meta-descriptions-plugin || pip install --no-cache-dir -r requirements.txt; \
   fi; \
   # remove "with-pdf" plugin from mkdocs config files (mkdocs-base.yml and mkdocs.yml) to avoid heavy PDF deps
   for f in mkdocs-base.yml mkdocs.yml; do \
     if [ -f "$f" ]; then \
            awk '\''BEGIN{skip=0} /^[[:space:]]*(with-pdf|git-revision-date):/ {skip=1; next} skip && /^[[:space:]]+/ {next} {skip=0; print}'\'' "$f" > "$f.tmp" && mv "$f.tmp" "$f" || true; \
     fi; \
   done; \
   mkdocs build -v -d /var/cnpg'
popd

rm -rf $WORKDIR

# Detect the current version (one with the highest release number that is not RC)
latest_version=$(ls $DOCDIR | grep '^[0-9]' | grep -v '\-rc\?' | sort -V | tail -1)
LATEST_VERSION_LINK_DIR=current

# Preview release
if [ $PREVIEW_RELEASE -eq 1 ]
then
  ROBOTS_FILE="$REPO_ROOT/assets/robots.txt"
  if [ ! -f "$ROBOTS_FILE" ]
  then
    cat > "$ROBOTS_FILE" <<EOF
User-agent: *
EOF
  fi
  cat >> "$ROBOTS_FILE" <<EOF
Disallow: /documentation/$release_version/
EOF
  latest_version=$(ls $DOCDIR | sort -n | grep '\-rc\?' | tail -1)
  LATEST_VERSION_LINK_DIR=preview
else
  # Standard release
  if [ ! -f content/docs/$release_version.md ]
  then
    hugo new docs/$release_version.md
    git add content/docs/$release_version.md
  fi
fi

# This is a hack as with GH Pages it is not possible
# to issue server-side redirects
if [ -d $DOCDIR/$LATEST_VERSION_LINK_DIR ]
then
  git rm -fr $DOCDIR/$LATEST_VERSION_LINK_DIR
fi
# Replace the content of the last available doc folder as 'current' or 'preview'
cp -a $DOCDIR/$latest_version $DOCDIR/$LATEST_VERSION_LINK_DIR
git add $DOCDIR/$LATEST_VERSION_LINK_DIR
git add $TARGETDIR
