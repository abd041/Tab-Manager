document.addEventListener("DOMContentLoaded", () => {
  const loadTabsBtn = document.getElementById("loadTabsBtn");
  const tabsContainer = document.getElementById("tabsContainer");

  loadTabsBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      tabsContainer.innerHTML = "";

      tabs.forEach((tab) => {
        const tabEl = document.createElement("div");
        tabEl.className = "tab-item";

        tabEl.innerHTML = `
          <img src="${tab.favIconUrl || ""}" />
          <div class="tab-info">
            <div class="tab-title">${tab.title}</div>
            <div class="tab-domain">${new URL(tab.url).hostname}</div>
          </div>
        `;

        tabEl.addEventListener("click", () => {
          chrome.tabs.update(tab.id, { active: true });
        });

        tabsContainer.appendChild(tabEl);
      });
    });
  });
});