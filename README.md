# YourTV

YourTV is a Manifest V3 Chrome extension that adapts YouTube's existing TVHTML5 (Kabuki) client for desktop Chrome.

## Install

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Select the folder containing `manifest.json`.
5. Open `https://www.youtube.com/`.

The default mode redirects the YouTube homepage to the official `/tv` route. The adaptation runs on the real TV client.

## Desktop adaptation

The supplied Kabuki HTML capture shows video tiles nested as `.NUDen > .TXB27d > ytlr-tile-renderer`. YourTV detects those wrappers and applies a responsive grid to containers holding multiple tile wrappers.

It also:
- Increases the root font size from the TV-oriented baseline to a desktop-oriented responsive scale.
- Removes fixed inline tile widths and margins within detected grids.
- Makes tile thumbnails maintain a 16:9 aspect ratio.
- Adds pointer feedback and visible keyboard focus.
- Provides a `/` shortcut to activate the search control.
- Observes dynamically inserted content.

YouTube can change its internal markup. This adaptation is based on the supplied capture and still requires live Chrome testing.

## Modes

### TV client
Redirects homepage requests to YouTube's official `/tv` route, preserving the matching TV document, bootstrap data, scripts, styles, and player assets.

### Kabuki JS swap (experimental)
Replaces the desktop application's main JavaScript bundle with a captured Kabuki bundle. This does not replace the desktop document, CSS, bootstrap data, component tree, or player setup, so it may fail to initialize. The captured URL is build-specific.

### Original YouTube
Removes YourTV's dynamic request rules and leaves the normal desktop client untouched.

## Scope and limitations

- Manifest V3, no external dependencies.
- Does not bundle or redistribute YouTube client assets.
- Does not spoof browser identity.
- Does not alter authentication, entitlements, DRM, ads, watch history, or API permissions.
- Browser playback, authentication, navigation, and mouse/keyboard behavior still need testing in Chrome.

## Terms

YouTube's Terms restrict certain unauthorized modification or interference with the service. This project does not claim YouTube has approved the adaptation and does not aim to bypass access controls, advertising, DRM, or account restrictions.
