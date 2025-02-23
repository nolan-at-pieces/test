!function(){
  // Helper function to append the gaGlobal visitor id
  function appendGaVisitor(url) {
    if (!url) return "#";
    var param = (typeof gaGlobal !== "undefined" && gaGlobal.vid) ? ("ga_visitor=" + gaGlobal.vid) : "";
    if (param === "") return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + param;
  }
  
  // Inject styles only once by checking for an existing style element.
  if (!document.getElementById("download-card-styles")){
    var s = document.createElement("style");
    s.id = "download-card-styles";
    s.textContent =
      "/* Full width container for download cards */\n" +
      ".dcWrap{display:block;width:100%;margin-bottom:16px}\n" +
      "/* Grid container fills full width and stretches items */\n" +
      ".cDC{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;align-items:stretch;width:100%;}\n" +
      "/* Single download cards now use full container width */\n" +
      ".singleDC{display:flex;justify-content:center;margin-top:16px}\n" +
      ".singleDC .dCard, .singleDC details.dCard{width:100%;}\n" +
      ".macCard{}\n" +
      ".winCard{grid-column:2;grid-row:1;align-self:start;}\n" +
      ".linuxCard{grid-column:1/3;grid-row:2;}\n" +
      ".dCard{border-radius:6px;display:flex;justify-content:space-between;align-items:center;text-decoration:none;box-shadow:0 3px 6px rgba(0,0,0,0.15);padding:12px 16px;margin-bottom:0;transition:background 0.3s ease,color 0.3s ease,transform 0.3s ease,border 0.3s ease;}\n" +
      ".dCard:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 4px 8px rgba(0,0,0,0.15);}\n" +
      ".dLeft{display:flex;flex-direction:column;}\n" +
      ".dLeft strong{font-size:0.95rem;}\n" +
      ".dLeft small{font-size:0.8rem;opacity:0.7;margin-top:4px;font-weight:normal;}\n" +
      "svg:not(.dropdown){width:18px;height:18px;min-width:18px;min-height:18px;transition:transform 0.2s;flex-shrink:0;margin-left:8px;}\n" +
      "a.dCard:hover svg:not(.dropdown){transform:translateY(2px);}\n" +
      "html:not([data-theme=dark]) a.dCard{background:#eff6ff;border:1px solid #ccc;color:#2563eb;box-shadow:0 3px 6px rgba(0,0,0,0.15);transition:background 0.3s ease,color 0.3s ease,transform 0.3s ease,border 0.3s ease;}\n" +
      "html:not([data-theme=dark]) a.dCard svg{color:#2563eb;transition:color 0.3s ease,stroke 0.3s ease;}\n" +
      "html:not([data-theme=dark]) .dropdown{stroke:#2563eb;transition:color 0.3s ease,stroke 0.3s ease;}\n" +
      "html:not([data-theme=dark]) a.dCard:hover{background:#dbeafe;color:#1d4ed8;}\n" +
      "html:not([data-theme=dark]) a.dCard:hover svg,html:not([data-theme=dark]) a.dCard:hover .dropdown{color:#1d4ed8;stroke:#1d4ed8;}\n" +
      "html[data-theme=dark] a.dCard{background:#1f1f1f;border:1px solid #333;color:#fff;box-shadow:0 3px 6px rgba(0,0,0,0.6);transition:background 0.3s ease,color 0.3s ease,transform 0.3s ease,border 0.3s ease;}\n" +
      "html[data-theme=dark] a.dCard svg,html[data-theme=dark] .dropdown{color:#fff;stroke:#fff;transition:color 0.3s ease,stroke 0.3s ease;}\n" +
      "html[data-theme=dark] a.dCard:hover{background:#2a2a2a;border-color:#444;box-shadow:0 4px 8px rgba(0,0,0,0.6);color:rgb(59 130 246/var(--tw-text-opacity,1));}\n" +
      "html[data-theme=dark] a.dCard:hover svg,html[data-theme=dark] a.dCard:hover .dropdown{color:rgb(59 130 246/var(--tw-text-opacity,1));stroke:rgb(59 130 246/var(--tw-text-opacity,1));}\n" +
      "details.dCard{border:1px solid #ccc;background:#fff;color:#000;transition:background 0.3s ease,color 0.3s ease,transform 0.3s ease,border 0.3s ease;padding:0;box-shadow:0 3px 6px rgba(0,0,0,0.15);margin-bottom:0;border-radius:6px;}\n" +
      "html[data-theme=dark] details.dCard{background:#1f1f1f;border:1px solid #333;color:#fff;box-shadow:0 3px 6px rgba(0,0,0,0.6);}\n" +
      "details.dCard summary{list-style:none;margin:0;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:background 0.3s ease,color 0.3s ease,transform 0.3s ease;}\n" +
      "details.dCard summary .dropdown{width:10px;height:10px;margin-left:8px;transition:transform 0.3s ease;}\n" +
      "details.dCard[open] .dropdown{transform:rotate(180deg);}\n" +
      "details.dCard:hover{transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.15);}\n" +
      "details.dCard>div{padding:12px 16px;border-top:1px solid rgba(0,0,0,0.1);}\n" +
      ".macCard>div a.dCard+a.dCard{margin-top:8px;}\n" +
      "pre{background:rgba(0,0,0,0.05);padding:8px;border-radius:4px;white-space:pre-wrap;word-wrap:break-word;}\n" +
      "code{font-family:monospace;}\n" +
      "html:not([data-theme=dark]) details.dCard summary:hover{background:#dbeafe;}\n" +
      ".dropdown{color:inherit;fill:currentColor;stroke:currentColor;}\n" +
      "/* --- New CSS for download-mac-all only --- */\n" +
      ".download-mac-all{grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)) !important;}\n" +
      ".download-mac-all .dCard{padding:8px 16px !important;}\n";
    document.head.appendChild(s);
  }
  
  // (Helper functions for building download cards)
  function downloadMacAll(o){
    return '<div class="cDC download-mac-all">' +
           '<div><a class="dCard macCard" style="width:100%" href="'+appendGaVisitor(o["mac-intel"]||"#")+'" target="_blank">' +
           '<div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div>' +
           '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
           '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
           '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
           '</svg></a></div>' +
           '<div><a class="dCard macCard" style="width:100%" href="'+appendGaVisitor(o["mac-arm"]||"#")+'" target="_blank">' +
           '<div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon / M-Series</small></div>' +
           '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
           '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
           '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
           '</svg></a></div>' +
           '</div>';
  }
  
  function macDetails(o){
    return '<details class="dCard macCard"><summary><div class="dLeft"><strong>macOS</strong><small>macOS 12.0 (Monterey) or higher</small></div>' +
           '<svg class="dropdown" viewBox="0 0 10 10"><polyline points="1,3 5,7 9,3" stroke="currentColor" fill="none" stroke-width="1"/></svg></summary>' +
           '<div><a class="dCard" href="'+appendGaVisitor(o["mac-intel"]||"#")+'" target="_blank"><div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div>' +
           '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
           '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
           '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
           '</svg></a>' +
           '<a class="dCard" href="'+appendGaVisitor(o["mac-arm"]||"#")+'" target="_blank"><div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon / M-Series</small></div>' +
           '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
           '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
           '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
           '</svg></a></div></details>';
  }
  
  function winLink(o){
    return '<a class="dCard winCard" href="'+appendGaVisitor(o.windows||"#")+'" target="_blank">' +
           '<div class="dLeft"><strong>Windows</strong><small>Windows 10 (1809) or higher</small></div>' +
           '<svg viewBox="0 0 16 16" fill="none">' +
           '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
           '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
           '</svg></a>';
  }
  
  function linuxDetails(o){
    return '<details class="dCard linuxCard"><summary><div class="dLeft"><strong>Linux</strong><small>Ubuntu 22+ required</small></div>' +
           '<svg class="dropdown" viewBox="0 0 10 10"><polyline points="1,3 5,7 9,3" stroke="currentColor" fill="none" stroke-width="1"/></svg></summary>' +
           '<div><p>Run these commands in <strong>order</strong> to install and set up Pieces Desktop App:</p>' +
           '<pre><code>sudo snap install pieces-os\nsudo snap connect pieces-os:process-control :process-control\nsudo snap install pieces-for-developers</code></pre>' +
           "<p>Then, type <code>pieces-for-developers</code> to launch.</p></div></details>";
  }
  
 // 4) Instead of replaceChild, transform blockquote in place
  function transformBlockquote(bq, contentHTML, multipleCards) {
    // Mark it as processed and style it
    bq.setAttribute("data-download-processed", "true");
    bq.classList.add("dcWrap");

    // Clear the existing content
    bq.innerHTML = "";

    // Create a container for the cards
    const container = document.createElement("div");
    container.innerHTML = contentHTML.trim();

    // Decide .cDC or .singleDC
    if (multipleCards) {
      container.className = "cDC";
    } else {
      container.className = "singleDC";
    }

    // Append container into the blockquote
    bq.appendChild(container);
  }

  // 5) The main injection logic
  function injectAll() {
    // Skip if 404
    if (document.title && document.title.indexOf("404") > -1) return;

    const bqs = Array.from(document.querySelectorAll("blockquote"));
    bqs.forEach((bq) => {
      if (bq.getAttribute("data-download-processed")) return;

      const txt = bq.textContent.trim();
      const l = txt.toLowerCase();

      // Check if blockquote text matches
      const isMatch = (
        l === "all" ||
        l === "dual" ||
        l === "intel" ||
        l === "windows" ||
        l === "linux" ||
        l === "arm" ||
        l === "pkg" ||
        l === "download-mac-all" ||
        l.indexOf("download-link-section") === 0 ||
        l.indexOf("download-link-dual") === 0 ||
        l.indexOf("download-link-intel") === 0 ||
        l.indexOf("download-link-windows") === 0 ||
        l.indexOf("download-link-linux") === 0 ||
        l.indexOf("download-link-arm") === 0 ||
        l.indexOf("download-lnk-intel") === 0 ||
        l.indexOf("download-mac-all") === 0
      );
      if (!isMatch) return;

      // Parse parameters
      const parts = txt.split(";");
      const key = parts[0].trim().toLowerCase();
      const o = {};
      for (let i = 1; i < parts.length; i++) {
        const eqIndex = parts[i].indexOf("=");
        if (eqIndex > -1) {
          const pKey = parts[i].substring(0, eqIndex).trim().toLowerCase();
          const pVal = parts[i].substring(eqIndex + 1).trim();
          o[pKey] = pVal;
        }
      }

      // Build the final HTML snippet
      let html = "";
      let multiple = false;
      switch(key) {
        case "all":
        case "download-link-section":
          html = macDetails(o) + winLink(o) + linuxDetails(o);
          multiple = true;
          break;
        case "download-mac-all":
          html = downloadMacAll(o);
          multiple = true;
          break;
        case "dual":
        case "download-link-dual":
          html = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;width:100%;">
              <div>${macDetails(o)}</div>
              <div>${winLink(o)}</div>
            </div>`;
          multiple = false; // because we put them in one grid
          break;
        case "intel":
        case "download-link-intel":
          html = `<a class="dCard macCard" href="${appendGaVisitor(o["mac-intel"]||"#")}" target="_blank">
                    <!-- ... omitted for brevity ... -->
                  </a>`;
          break;
        case "arm":
        case "download-link-arm":
          html = `<a class="dCard macCard" href="${appendGaVisitor(o["mac-arm"]||"#")}" target="_blank">
                    <!-- ... -->
                  </a>`;
          break;
        case "pkg":
        case "download-lnk-intel":
          html = `<a class="dCard macCard" href="${appendGaVisitor(o["mac-intel"]||"#")}" target="_blank">
                    <!-- ... -->
                  </a>`;
          break;
        case "windows":
        case "download-link-windows":
          html = winLink(o);
          break;
        case "linux":
        case "download-link-linux":
          html = linuxDetails(o);
          break;
      }

      if (html) {
        // Transform the blockquote in place
        transformBlockquote(bq, html, multiple);
      }
    });
  }

  // 6) Observe changes if needed
  document.addEventListener("DOMContentLoaded", injectAll);

  const observerTarget = document.querySelector(".post-content") || document.body;
  const obs = new MutationObserver(injectAll);
  obs.observe(observerTarget, { childList: true, subtree: true });

}();
