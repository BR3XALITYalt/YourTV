# YourTV

YourTV is a Chrome extension that opens YouTube's existing TVHTML5 (Kabuki) client in desktop Chrome.

## Install

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Select the folder containing `manifest.json`.
5. Open `https://www.youtube.com/`.

The default mode redirects top-level requests to the YouTube homepage to the official `/tv` route before the desktop homepage loads.

## Modes

### TV client

Redirects top-level requests to the YouTube homepage to `/tv`. YouTube then serves the matching TVHTML5 document, Kabuki application bundle, TV stylesheet, and TV player assets together. YourTV does not bundle or copy YouTube's JavaScript.

A small stylesheet increases the TV client's root font size on wide desktop viewports. This is an initial sizing adjustment, not a complete desktop redesign.

### Kabuki JS swap (experimental)

Leaves the normal desktop page in place and redirects its `ytmainappweb` JavaScript request to the Kabuki base bundle observed in the supplied TVHTML5 capture.

This only replaces the main application bundle. It does not replace the desktop document, CSS, bootstrap configuration, component tree, or player setup. The two applications use different shells, so this mode may fail to initialize. The captured Kabuki asset URL is build-specific and may stop working when YouTube updates it.

### Original YouTube

Removes YourTV's dynamic request rules and leaves the normal desktop client untouched.

## Scope and limitations

- Manifest V3.
- The extension changes navigation and script requests locally in Chrome.
- It does not spoof the browser user agent.
- It does not alter account authentication, video entitlements, DRM, ads, watch history, or YouTube API permissions.
- It does not download, redistribute, or bundle YouTube's proprietary client assets.
- Direct navigation to non-homepage desktop routes is not rewritten in this initial version. Once the TV client is open, its own navigation handles subsequent pages.
- YouTube can change its internal routes, bundle paths, and markup without notice.

## Terms and compatibility

YouTube's Terms restrict modifying or interfering with parts of the service except where authorized. This project does not claim that YouTube has approved this adaptation. It does not aim to bypass access controls, advertising, DRM, or account restrictions.

## Testing notes

The source capture used for the Kabuki experiment identified the bundle as `kabuki.base_cr` and the desktop application bundle as `ytmainappweb.kevlar_base`. Those paths are internal implementation details, not stable public interfaces.

Test each mode by opening a fresh YouTube tab and inspecting the document URL, loaded scripts, console, and playback. A successful redirect does not prove that all TV controls work well with a mouse and keyboard.
