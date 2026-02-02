document.addEventListener("DOMContentLoaded", () => {
  const loadTabsBtn = document.getElementById("loadTabsBtn");

  loadTabsBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      console.log("Tabs fetched:", tabs);
    });
  });
});