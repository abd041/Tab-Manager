document.addEventListener("DOMContentLoaded", () => {
  const loadTabsBtn = document.getElementById("loadTabsBtn");
  const closeDuplicatesBtn = document.getElementById("closeDuplicatesBtn");
  const groupTabsBtn = document.getElementById("groupTabsBtn");
  const tabsContainer = document.getElementById("tabsContainer");

  function renderTabs() {
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
  }

  loadTabsBtn.addEventListener("click", renderTabs);

  closeDuplicatesBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const seenUrls = new Set();
      const duplicateTabIds = [];

      tabs.forEach((tab) => {
        if (tab.pinned) return;

        if (seenUrls.has(tab.url)) {
          duplicateTabIds.push(tab.id);
        } else {
          seenUrls.add(tab.url);
        }
      });

      if (duplicateTabIds.length > 0) {
        chrome.tabs.remove(duplicateTabIds, renderTabs);
      }
    });
  });

  groupTabsBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const domainMap = {};

      tabs.forEach((tab) => {
        if (tab.pinned) return;

        const domain = new URL(tab.url).hostname;

        if (!domainMap[domain]) {
          domainMap[domain] = [];
        }

        domainMap[domain].push(tab.id);
      });

      Object.entries(domainMap).forEach(([domain, tabIds]) => {
        if (tabIds.length < 2) return;

        chrome.tabs.group({ tabIds }, (groupId) => {
          chrome.tabGroups.update(groupId, {
            title: domain,
            color: "blue"
          });
        });
      });
    });
  });

  renderTabs();
});