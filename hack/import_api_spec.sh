#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

# Verify we are working on the root of the repo
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "${REPO_ROOT}"

# Parse arguments
UPDATE_DEFAULT=true
VERSION=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --not-latest)
            UPDATE_DEFAULT=false
            shift
            ;;
        *)
            VERSION="$1"
            shift
            ;;
    esac
done

# Require a version to be specified
if [ -z "$VERSION" ]; then
    echo "Usage: hack/import_api_spec.sh [--not-latest] release-version"
    echo "e.g. hack/import_api_spec.sh 1.10.0"
    echo "     hack/import_api_spec.sh --not-latest 1.9.0"
    echo ""
    echo "Options:"
    echo "  --not-latest    Don't update the default API version in hugo.toml"
    exit 1
fi

# Clean the version input (remove 'v' prefix if provided by user)
VERSION=${VERSION#v}
RAW_URL="https://raw.githubusercontent.com/percona/everest/v${VERSION}/docs/spec/openapi.yml"

# Define paths
SPEC_DEST_DIR="${REPO_ROOT}/static/documents/api"
DOC_DEST_DIR="${REPO_ROOT}/content/docs/api"
SPEC_FILE="${SPEC_DEST_DIR}/openeverest-openapi.${VERSION}.yml"
MD_FILE="${DOC_DEST_DIR}/${VERSION}.md"

echo "Processing API Spec for version: ${VERSION}"

# 1. Create directories if they don't exist
mkdir -p "$SPEC_DEST_DIR"
mkdir -p "$DOC_DEST_DIR"

# commented out as we take the file directly from git now
# 2. Download the OpenAPI spec
#echo "Downloading spec from: ${RAW_URL}"
#if ! curl -sSfL "$RAW_URL" -o "$SPEC_FILE"; then
#    echo "Error: Failed to download spec. Ensure version v${VERSION} exists."
#    exit 1
#fi

# 3. Create the Hugo Markdown file
echo "Generating ${MD_FILE}"
cat > "$MD_FILE" <<EOF
---
title: "API Reference v${VERSION}"
layout: api-standalone
---
EOF

# 4. Update default API version in hugo.toml if --not-latest flag was not used
if [ "$UPDATE_DEFAULT" = true ]; then
    TOML_FILE="${REPO_ROOT}/hugo.toml"
    echo "Updating defaultApiVersion to ${VERSION} in hugo.toml"
    
    # Use sed to update the defaultApiVersion parameter
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS requires -i '' syntax
        sed -i '' "s/defaultApiVersion = '[^']*'/defaultApiVersion = '${VERSION}'/" "$TOML_FILE"
    else
        # Linux sed syntax
        sed -i "s/defaultApiVersion = '[^']*'/defaultApiVersion = '${VERSION}'/" "$TOML_FILE"
    fi
    
    git add "$TOML_FILE"
    echo "Updated default API version to ${VERSION}"
else
    echo "Skipping default API version update (--not-latest flag used)"
fi

# 5. Git add the new files
#git add "$SPEC_FILE" "$MD_FILE"
git add "$MD_FILE"


echo "Done! API spec and documentation page created."