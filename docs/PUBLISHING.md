# Publishing the repository

The archive includes everything needed for a GitHub repository. It has no configured GitHub owner or remote. No assets need to be built before using them.

1. Extract the archive and open its project directory.
2. Create an empty GitHub repository, for example `blatt-und-nadel`, without adding a new README or license.
3. Run the commands below. Replace `YOUR_ACCOUNT` with your account or organization. Use your existing Git identity and authentication.

```sh
git init -b main
git add .
git commit -m "init"
git remote add origin git@github.com:YOUR_ACCOUNT/blatt-und-nadel.git
git push -u origin main
```

The archive excludes Git history, development dependencies and temporary review files. The included GitHub Actions workflow checks pull requests and pushes to `main`.

After publishing, add the real source URL to README/attribution examples and optionally create a `v1.0.1` tag and GitHub Release. The prebuilt `index.html` can be hosted as a static gallery. If using GitHub Pages, set the repository’s Pages source to the root of `main`; the gallery’s asset links are relative. Deployment is not configured automatically.

`package.json` uses `private: true`: this repository distributes reusable assets directly and is not an npm package release.

## Versioning

The initial release is `1.0.0` (v1.0). Future compatible corrections increment the patch version; additions increment the minor version; breaking changes increment the major version. Each release gets a dated `CHANGELOG.md` entry with concrete changes. Keep package/lock versions, both READMEs, quality notes and release archive names in sync, then rebuild the generated gallery, manifest, sprites and previews. Species `since` fields record their first introduction and remain unchanged for redraws.

## Build a release archive

Use Git, `zip` and `unzip` (available on macOS and the Ubuntu CI runner). Stage any new project files that belong in the release, then run:

```sh
npm test
npm run test:release
npm run release
```

The archive is written to `dist/`. An optional output path can be passed with `npm run release -- /absolute/path/release.zip`. Packaging reads Git-tracked paths and uses their current working-tree bytes. New untracked files are excluded. Every run builds a new temporary ZIP, verifies its exact file list and byte contents, and atomically replaces the destination; it never appends to a previous archive.

When updating an existing checkout, copy the contents of the single `blatt-und-nadel/` folder into that checkout. The archive contains no Git metadata.
