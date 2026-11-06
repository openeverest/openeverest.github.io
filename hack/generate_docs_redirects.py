#!/usr/bin/env python3
"""Replace the old MkDocs builds in assets/documentation/ with redirects.

The documentation moved to https://openeverest.io/docs/ (openeverest/docs).
Every old page, /documentation/<version>/<path>.html, becomes a small HTML
page that redirects to the same page on the new site, and every other file of
the old builds (CSS, JS, images, search indexes, sitemaps) is removed.

Mapping:

    /documentation/current/<path>.html      -> /docs/current/<path>/
    /documentation/1.16.2/<path>.html       -> /docs/1.16/<path>/
    /documentation/2.0.0-dev.4/<path>.html  -> /docs/2.0.0-dev.4/<path>/
    .../index.html                          -> the directory, e.g. /docs/1.16/
    /documentation/                         -> /docs/

Paths are normalized like the MkDocs -> Docusaurus migration did ("A (b)" ->
"A-b"). Versions that the new site does not publish are redirected by the new
site itself to the closest published version, so no version list is needed
here. static/404.html applies the same mapping to /documentation/ URLs that
have no page.

The script is idempotent: running it again over the redirect pages rewrites
them with the same content.

    hack/generate_docs_redirects.py [assets/documentation]
"""

import html
import json
import os
import re
import sys

SITE = "https://openeverest.io"
SEMVER = re.compile(r"^(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z.-]+)?$")

# Old pages that the new site does not have, mapped to the closest page
# (relative to the version root; "" is the version's start page). Keyed by
# major version; None applies to all versions.
MOVED = {
    None: {
        "api/contribute/contribute.html": "contribute/",
        "reference/index.html": "",
        "reference/glossary.html": "",
        "reference/acknowledgements.html": "",
    },
    "2": {
        "upgrade/upgrade_operators.html": "upgrade/upgrade_with_helm/",
        "upgrade/mongodb_major_upgrades.html": "upgrade/upgrade_with_helm/",
    },
}

TEMPLATE = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OpenEverest documentation has moved</title>
    <link rel="canonical" href="{canonical}">
    <script>window.location.replace({target_js} + window.location.hash);</script>
    <meta http-equiv="refresh" content="0; url={target}">
  </head>
  <body>
    <p>This page has moved to <a href="{target}">{target}</a>.</p>
  </body>
</html>
"""


def docs_version(version: str) -> str:
    m = SEMVER.match(version)
    if not m:
        return version  # "current"
    major, minor, _, pre = m.groups()
    return version if pre else f"{major}.{minor}"


def safe_name(rel: str) -> str:
    new = rel.replace(" ", "-").replace("(", "").replace(")", "")
    return re.sub(r"-{2,}", "-", new)


def target_url(version: str, rel: str) -> str:
    rel = rel.replace(os.sep, "/")
    m = SEMVER.match(version)
    major = m.group(1) if m else "1"  # "current" is the latest 1.x release
    moved = {**MOVED[None], **MOVED.get(major, {})}
    if rel in moved:
        return f"/docs/{docs_version(version)}/{moved[rel]}"
    rel = safe_name(rel)
    if rel == "index.html":
        page = ""
    elif rel.endswith("/index.html"):
        page = rel[: -len("index.html")]
    else:
        page = rel[: -len(".html")] + "/"
    return f"/docs/{docs_version(version)}/{page}"


def write_redirect(path: str, target: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        f.write(
            TEMPLATE.format(
                target=html.escape(target),
                target_js=json.dumps(target),
                canonical=html.escape(SITE + target),
            )
        )


def main() -> None:
    root = sys.argv[1] if len(sys.argv) > 1 else "assets/documentation"
    write_redirect(os.path.join(root, "index.html"), "/docs/")
    pages = removed = 0
    for version in sorted(os.listdir(root)):
        vdir = os.path.join(root, version)
        if not os.path.isdir(vdir):
            continue
        for dirpath, _, files in os.walk(vdir):
            for name in files:
                path = os.path.join(dirpath, name)
                rel = os.path.relpath(path, vdir)
                if not name.endswith(".html") or rel == "404.html":
                    os.remove(path)
                    removed += 1
                    continue
                write_redirect(path, target_url(version, rel))
                pages += 1
        for dirpath, dirs, files in os.walk(vdir, topdown=False):
            if not dirs and not files:
                os.rmdir(dirpath)
            elif not os.listdir(dirpath):
                os.rmdir(dirpath)
    print(f"{pages} redirect pages written, {removed} other files removed")


if __name__ == "__main__":
    main()
