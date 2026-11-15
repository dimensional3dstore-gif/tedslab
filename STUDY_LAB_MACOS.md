# Study Lab for macOS (Apple Silicon)

Study Lab is a separate Electron desktop shell for the Ted's Lab study experience. It loads the hosted Study Enlist app and exposes only the Study routes in its desktop window.

## Build locally

Requirements: macOS, Node.js 22, npm dependencies installed.

```bash
npm install --include=optional
npm run build
npm run desktop:study:mac
```

The ARM64 disk image is written to `release/study-lab/Study-Lab-1.0.4-arm64.dmg` (the version comes from `package.json`).

## GitHub Actions and releases

The `Build Study Lab for Apple Silicon` workflow builds a DMG on pull requests and uploads it as an Actions artifact. To publish a named GitHub Release, push a tag matching `study-v*`, for example:

```bash
git tag study-v1.0.0
git push origin study-v1.0.0
```

The workflow attaches the generated ARM64 DMG to that release. The website's Study Lab download page links to the Study Lab release search in GitHub.

## Focus and privacy

- The desktop shell disables developer tools, blocks reload shortcuts, restricts navigation to Study Lab routes and hides the general app sidebar.
- When a guardian has enabled supervised browser lock, the renderer asks the native shell to enter fullscreen kiosk-style mode. Without that permission, the app remains a normal fullscreen-capable window.
- The private Study Coach uses the local Ted's Lab knowledge base. Chat is held in page memory only and is not sent to the external AI provider.
- A standalone app cannot prevent all macOS-level app switching, system shortcuts, force quit, or access to other user accounts. True single-app enforcement requires a supervised Mac configured with an appropriate MDM / Automated Device Enrollment kiosk profile.
- The current workflow does not sign or notarize the DMG. Configure Apple Developer ID signing and notarization before broad distribution to avoid Gatekeeper warnings.
