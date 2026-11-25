const applyButton = document.querySelector("#apply");
const status = document.querySelector("#status");
const warning = document.querySelector("#warning");
const modeInputs = [...document.querySelectorAll('input[name="mode"]')];

function selectedMode() {
  return modeInputs.find((input) => input.checked)?.value ?? "tv";
}

function updateWarning() {
  warning.hidden = selectedMode() !== "js-test";
}

async function loadMode() {
  const { mode = "tv" } = await chrome.storage.local.get("mode");
  const selected = modeInputs.find((input) => input.value === mode);
  if (selected) selected.checked = true;
  updateWarning();
}

modeInputs.forEach((input) => {
  input.addEventListener("change", updateWarning);
});

applyButton.addEventListener("click", async () => {
  applyButton.disabled = true;
  status.textContent = "Applying…";

  try {
    const response = await chrome.runtime.sendMessage({
      type: "set-mode",
      mode: selectedMode()
    });

    if (!response?.ok) {
      throw new Error(response?.error ?? "The extension did not confirm the change.");
    }

    status.textContent = "Mode saved. Reload YouTube to apply it.";
  } catch (error) {
    status.textContent = `Could not apply mode: ${error.message}`;
  } finally {
    applyButton.disabled = false;
  }
});

void loadMode().catch((error) => {
  status.textContent = `Could not load settings: ${error.message}`;
});
