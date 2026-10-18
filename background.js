/**
 * Background script for copy-rich-link
 */

// Function injected into the active tab to copy content and display a toast
function copyPageLinkInTab() {
  const url = window.location.href;
  const title = (document.title || url).trim();

  // Escape HTML entities for the rich link
  const escapedTitle = title
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Rich HTML for MS Teams, Outlook, Word, Slack
  const htmlContent = `<a href="${url}">${escapedTitle}</a>`;

  // Markdown format: [Title](URL) for plain text / Markdown editors
  const markdownContent = `[${title}](${url})`;

  let copySucceeded = false;

  // 1. Try modern navigator.clipboard.write with ClipboardItem
  if (navigator.clipboard && window.ClipboardItem) {
    try {
      const item = new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
        "text/plain": new Blob([markdownContent], { type: "text/plain" }),
      });
      navigator.clipboard.write([item]).then(() => {
        showConfirmationToast(title, url);
      }).catch((err) => {
        console.warn("Async clipboard failed, trying fallback:", err);
        fallbackCopy();
      });
      copySucceeded = true;
    } catch (err) {
      console.warn("ClipboardItem creation failed:", err);
    }
  }

  // 2. Fallback using document.execCommand('copy') with copy listener
  if (!copySucceeded) {
    fallbackCopy();
  }

  function fallbackCopy() {
    const handleCopyEvent = (e) => {
      e.preventDefault();
      e.clipboardData.setData("text/html", htmlContent);
      e.clipboardData.setData("text/plain", markdownContent);
    };

    document.addEventListener("copy", handleCopyEvent, { once: true });
    try {
      const ok = document.execCommand("copy");
      if (ok) {
        showConfirmationToast(title, url);
      } else {
        console.error("document.execCommand('copy') returned false");
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
  }

  function showConfirmationToast(pageTitle, pageUrl) {
    const TOAST_ID = "__copy_rich_link_toast__";
    const existing = document.getElementById(TOAST_ID);
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = TOAST_ID;

    // Toast styles
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      backgroundColor: "rgba(28, 27, 34, 0.95)",
      color: "#ffffff",
      padding: "10px 16px",
      borderRadius: "8px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.2)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      fontSize: "13px",
      fontWeight: "500",
      zIndex: "2147483647",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(8px)",
      transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      opacity: "0",
      transform: "translateY(10px) scale(0.98)",
      pointerEvents: "none",
      maxWidth: "380px",
    });

    const truncatedTitle = pageTitle.length > 35 ? pageTitle.substring(0, 32) + "..." : pageTitle;

    // Build toast contents safely using standard DOM methods (no innerHTML)
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "18");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "#2ecc71");
    svg.setAttribute("stroke-width", "2.5");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.style.flexShrink = "0";

    const polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("points", "20 6 9 17 4 12");
    svg.appendChild(polyline);

    const textContainer = document.createElement("div");
    Object.assign(textContainer.style, {
      lineHeight: "1.35",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    });

    const titleDiv = document.createElement("div");
    const boldTitle = document.createElement("b");
    boldTitle.textContent = "Copied as Rich Link!";
    titleDiv.appendChild(boldTitle);

    const subDiv = document.createElement("div");
    Object.assign(subDiv.style, {
      fontSize: "11px",
      opacity: "0.8",
      overflow: "hidden",
      textOverflow: "ellipsis",
    });
    subDiv.textContent = `[${truncatedTitle}](${pageUrl})`;

    textContainer.appendChild(titleDiv);
    textContainer.appendChild(subDiv);

    toast.appendChild(svg);
    toast.appendChild(textContainer);

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0) scale(1)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px) scale(0.98)";
      setTimeout(() => toast.remove(), 260);
    }, 2000);
  }
}

// Background fallback copy when tab cannot run content scripts (e.g. about: pages)
function copyFromBackground(title, url) {
  const htmlContent = `<a href="${url}">${title}</a>`;
  const markdownContent = `[${title}](${url})`;

  const listener = (e) => {
    e.preventDefault();
    e.clipboardData.setData("text/html", htmlContent);
    e.clipboardData.setData("text/plain", markdownContent);
  };
  document.addEventListener("copy", listener, { once: true });
  document.execCommand("copy");
}

// Core action handler
async function handleCopy(tab) {
  if (!tab || !tab.id) return;

  const originalTitle = "Copy Rich Link (Alt+Shift+C)";

  // Visual confirmation on the address bar button
  browser.pageAction.setTitle({
    tabId: tab.id,
    title: "✓ Copied Rich Link!",
  });

  browser.pageAction.setIcon({
    tabId: tab.id,
    path: {
      "16": "icons/check.svg",
      "32": "icons/check.svg",
    },
  });

  setTimeout(() => {
    browser.pageAction.setTitle({ tabId: tab.id, title: originalTitle });
    browser.pageAction.setIcon({
      tabId: tab.id,
      path: {
        "16": "icons/icon.svg",
        "32": "icons/icon.svg",
      },
    });
  }, 1500);

  // Execute copy inside the active tab
  try {
    await browser.tabs.executeScript(tab.id, {
      code: `(${copyPageLinkInTab.toString()})();`,
    });
  } catch (err) {
    // If the tab is a restricted page (e.g. about:, moz-extension:, etc.)
    const title = tab.title || tab.url;
    copyFromBackground(title, tab.url);
  }
}

// Ensure the page action icon is visible on tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url) {
    browser.pageAction.show(tabId);
  }
});

// Click on the address bar icon OR shortcut via _execute_page_action
browser.pageAction.onClicked.addListener(handleCopy);

// Fallback for custom commands
browser.commands.onCommand.addListener(async (command) => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs.length > 0) {
    handleCopy(tabs[0]);
  }
});
