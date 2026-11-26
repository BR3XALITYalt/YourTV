(() => {
  "use strict";
  const TILE = "ytlr-tile-renderer";
  const GUIDE = "ytlr-guide-entry-renderer";
  const GRID = "yourtv-tile-grid";
  let queued = false;

  function directMatches(parent, selector) {
    return [...parent.children].filter((node) => node.matches?.(selector));
  }

  function markRepeatedContainers(selector, className) {
    for (const item of document.querySelectorAll(selector)) {
      let parent = item.parentElement;
      for (let depth = 0; parent && depth < 5; depth++, parent = parent.parentElement) {
        if (directMatches(parent, selector).length >= 2) {
          parent.classList.add(className);
          break;
        }
      }
    }
  }

  function improveFocus(selector) {
    for (const item of document.querySelectorAll(selector)) {
      item.style.setProperty("cursor", "pointer");
      const hasFocusable = item.querySelector(
        'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),[role="button"]'
      );
      if (!hasFocusable && !item.hasAttribute("tabindex")) item.tabIndex = 0;
    }
  }

  function scan() {
    queued = false;
    document.documentElement.classList.add("yourtv-desktop");
    markRepeatedContainers(TILE, GRID);
    markRepeatedContainers(GUIDE, "yourtv-guide-list");
    improveFocus(TILE);
    improveFocus(GUIDE);
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
      'input[placeholder*="search" i],input[aria-label*="search" i],[role="search"] input'
    );
    if (search instanceof HTMLElement) {
      event.preventDefault();
      search.focus();
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleScan, {once:true});
  } else {
    scheduleScan();
  }

  new MutationObserver(scheduleScan).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
