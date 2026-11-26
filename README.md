# YourTV

YourTV is a Manifest V3 Chrome extension that adapts YouTube's existing TVHTML5 (Kabuki) client for desktop Chrome.

## Install

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Select the folder containing `manifest.json`.
5. Open `https://www.youtube.com/`.

The default mode redirects the YouTube homepage to the official `/tv` route. The desktop adaptation runs on that route and works with the real TV client rather than loading the desktop application underneath it.

## Desktop adaptation

- Detects repeated `ytlr-tile-renderer` and `ytlr-guide-entry-renderer` elements and applies desktop-friendly layout classes.
- Uses a responsive tile grid on detected tile containers.
- Reduces television-sized typography and spacing.
- Adds visible keyboard focus and pointer cursors.
- Press `/` to focus a visible search input.
- Respects reduced-motion preferences.
- Observes dynamically rendered content and reapplies enhancements.

The adaptation intentionally uses Kabuki's existing custom elements and leaves its navigation, playback, authentication, and API behavior intact. YouTube can change its internal markup at any time, so the selectors may need maintenance.

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
- Browser playback, authentication, navigation, and mouse/keyboard behavior still need testing in Chrome. This commit is an initial adaptation layer, not a claim of complete compatibility.

## Terms

YouTube's Terms restrict certain unauthorized modification or interference with the service. This project does not claim YouTube has approved the adaptation and does not aim to bypass access controls, advertising, DRM, or account restrictions.
