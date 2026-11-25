# YourTV repository instructions

## Project

YourTV is a Manifest V3 Chrome extension that adapts YouTube's existing TVHTML5 (Kabuki) web client for desktop Chrome.

## Architecture

- `service-worker.js` owns the dynamic Declarative Net Request rules and selected client mode.
- `popup.html`, `popup.css`, and `popup.js` expose the mode selector.
- `desktop.css` applies desktop sizing only on the `/tv` route.
- The normal mode must use YouTube's official `/tv` page so its HTML, bootstrap data, JavaScript, CSS, and player remain matched.
- The Kabuki JavaScript replacement mode is an isolated experiment. It replaces only the desktop application bundle and must remain clearly labelled as experimental.

## Boundaries

- Do not bundle, mirror, or redistribute YouTube's proprietary client assets.
- Do not bypass DRM, ads, account entitlements, access controls, or safety restrictions.
- Do not spoof browser identity by default. The official `/tv` route already selects the TVHTML5 application.
- Keep request rules limited to the required YouTube host and exact resource types and paths.
- Provide a quick way to disable all request redirects.
- Do not claim measured performance improvements without browser profiling data.

## Changes and testing

- Keep the extension dependency-free and use native Chrome Extension APIs.
- Keep Manifest V3 permissions minimal.
- Validate JSON files and run JavaScript syntax checks after changes.
- Inspect the final diff and verify that each DNR rule is narrowly scoped.
- Browser playback, authentication, and navigation must be tested in Chrome before being described as working.
- YouTube's internal paths and DOM are unstable. Document build-specific assumptions and preserve an original-client fallback.
