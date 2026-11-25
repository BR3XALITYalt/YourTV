const RULE_IDS = [100, 101];
const VALID_MODES = new Set(["tv", "js-test", "original"]);

// This URL comes from the supplied TVHTML5 source capture. YouTube changes
// build identifiers, so this experimental target will need periodic updates.
const KABUKI_BASE_URL =
  "https://www.youtube.com/s/_/kabuki/_/js/k=kabuki.base_cr.en_US.kOH6wapiUZY.es5.O/am=AAAAAACgJACoACAQAZgBCgKAAg/d=1/excm=main/rs=ANjRhVk-UEjEbhtao6SVJDSIGkIQRmR87Q/m=base";

const tvRedirectRule = {
  id: 100,
  priority: 1,
  action: {
    type: "redirect",
    redirect: {
      transform: {
        scheme: "https",
        host: "www.youtube.com",
        path: "/tv"
      }
    }
  },
  condition: {
    regexFilter: "^https?://(?:www\\.)?youtube\\.com/?(?:\\?.*)?$",
    resourceTypes: ["main_frame"]
  }
};

// This deliberately targets only the desktop application's main JS bundle.
// It does not rewrite HTML, CSS, player scripts, or API client identity.
const kabukiSwapRule = {
  id: 101,
  priority: 1,
  action: {
    type: "redirect",
    redirect: {
      url: KABUKI_BASE_URL
    }
  },
  condition: {
    regexFilter: "^https://www\\.youtube\\.com/s/_/ytmainappweb/_/js/k=ytmainappweb\\.kevlar_base\\..*/m=kevlar_base_module,kevlar_main_module,kevlar_base_sync_mod_chunk$",
    resourceTypes: ["script"]
  }
};

async function applyMode(mode) {
  if (!VALID_MODES.has(mode)) {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  const addRules = [];
  if (mode === "tv") addRules.push(tvRedirectRule);
  if (mode === "js-test") addRules.push(kabukiSwapRule);

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULE_IDS,
    addRules
  });

  await chrome.storage.local.set({ mode });
  return mode;
}

async function initialize() {
  const stored = await chrome.storage.local.get("mode");
  const mode = VALID_MODES.has(stored.mode) ? stored.mode : "tv";
  await applyMode(mode);
}

chrome.runtime.onInstalled.addListener(() => {
  void initialize();
});

chrome.runtime.onStartup.addListener(() => {
  void initialize();
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "set-mode") return false;

  applyMode(message.mode)
    .then((mode) => sendResponse({ ok: true, mode }))
    .catch((error) => sendResponse({ ok: false, error: String(error) }));

  return true;
});
