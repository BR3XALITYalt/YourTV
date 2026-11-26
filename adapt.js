(() => {
  "use strict";

  const TILE = "ytlr-tile-renderer";
  const TILE_WRAPPER = "TXB27d";
  const GUIDE = "ytlr-guide-entry-renderer";
  let queued = false;

  function markTileRows() {
    // Kabuki places each tile inside a div.TXB27d. The wrappers, not the
    // custom tile elements, are the direct children of the virtual-list layer.
    for (const tile of document.querySelectorAll(TILE)) {
      const wrapper = tile.closest("." + TILE_WRAPPER);
      const container = wrapper?.parentElement;
      if (!wrapper || !container) continue;

      const tileWrappers = [...container.children].filter((child) =>
        child.classList.contains(TILE_WRAPPER) && child.querySelector(TILE)
      );

      if (tileWrappers.length >= 2) {
        container.classList.add("yourtv-tile-grid");
      }
    }
  }

  function markGuideLists() {
    for (const entry of document.querySelectorAll(GUIDE)) {
      const wrapper = entry.closest("." + TILE_WRAPPER);
      const container = wrapper?.parentElement;
      if (!wrapper || !container) continue;

      const entries = [...container.children].filter((child) =>
        child.classList.contains(TILE_WRAPPER) && child.querySelector(GUIDE)
      );

      if (entries.length >= 2) container.classList.add("yourtv-guide-list");
    }
  }

  function makeInteractive(selector) {
    for (const item of document.querySelectorAll(selector)) {
      item.style.setProperty("cursor", "pointer");
      // Kabuki often manages focus on the custom element itself. Only add
      // tabindex when it has no existing focus model or focusable descendant.
      const focusableChild = item.querySelector(
        'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),[role="button"]'
      );
      if (!focusableChild && !item.hasAttribute("tabindex")) item.tabIndex = 0;
    }
  }

  function scan() {
    queued = false;
    document.documentElement.classList.add("yourtv-desktop");
    markTileRows();
    markGuideLists();
    makeInteractive(TILE);
    makeInteractive(GUIDE);
  }

  function scheduleScan() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(scan);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    const target = event.target;
    if (target instanceof HTMLElement &&
        (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;

    const search = document.querySelector(
      'ytlr-search-text-box, input[placeholder*="search" i], input[aria-label*="search" i]'
    );
    if (search instanceof HTMLElement) {
      event.preventDefault();
      search.click();
      search.focus();
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleScan, { once: true });
  } else {
    scheduleScan();
  }

  new MutationObserver(scheduleScan).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
