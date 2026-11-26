# YourTV repository instructions

## Project
YourTV is a Manifest V3 Chrome extension adapting YouTube's existing TVHTML5 (Kabuki) client for desktop Chrome.

## Architecture
- `service-worker.js` owns dynamic request rules and selected mode.
- `popup.html`, `popup.css`, and `popup.js` expose the mode selector.
- `adapt.js` detects live Kabuki tile and guide elements and applies desktop behavior.
- `desktop.css` styles the existing TV client for desktop screens.
- The default mode uses YouTube's official `/tv` page so document, bootstrap data, scripts, CSS, and player assets remain matched.
- The Kabuki JavaScript replacement mode is an isolated experiment and must remain labelled experimental.

## Boundaries
- Do not bundle, mirror, or redistribute YouTube's proprietary client assets.
- Do not bypass DRM, ads, account entitlements, access controls, or safety restrictions.
- Do not spoof browser identity by default.
- Keep request rules narrowly scoped and provide an original-client fallback.
- Do not claim measured performance improvements without profiling data.

## Testing
- Keep the extension dependency-free and use native Chrome Extension APIs.
- Validate JSON and JavaScript syntax after changes.
- Browser playback, authentication, navigation, and mouse/keyboard behavior must be tested before being described as working.
- YouTube's internal paths and DOM are unstable; document assumptions.
