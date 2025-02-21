!function(){
  // Inject CSS styles
  var s = document.createElement("style");
  s.textContent = "/* Full width container for download cards */\n.dcWrap{display:block;width:100%;margin-bottom:16px}\n/* Grid container fills full width */\n.cDC{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;align-items:start;width:100%}\n/* Single download cards now use full container width */\n.singleDC{display:flex;justify-content:center;margin-top:16px}\n.singleDC .dCard, .singleDC details.dCard{width:100%}\n.macCard{grid-column:1;grid-row:1}\n.winCard{grid-column:2;grid-row:1;align-self:start}\n.linuxCard{grid-column:1/3;grid-row:2}\n.dCard{border-radius:6px;display:flex;justify-content:space-between;align-items:center;text-decoration:none;box-shadow:0 3px 6px rgba(0,0,0,0.15);padding:12px 16px;margin-bottom:0;transition:background 0.3s ease,color 0.3s ease,transform 0.3s ease,border 0.3s ease}\n.dCard:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 4px 8px rgba(0,0,0,0.15)}\n.dLeft{display:flex;flex-direction:column}\n.dLeft strong{font-size:0.95rem}\n.dLeft small{font-size:0.8rem;opacity:0.7;margin-top:4px;font-weight:normal}\nsvg:not(.dropdown){width:18px;height:18px;min-width:18px;min-height:18px;transition:transform 0.2s;flex-shrink:0;margin-left:8px}\na.dCard:hover svg:not(.dropdown){transform:translateY(2px)}\nhtml:not([data-theme=dark]) a.dCard{background:#eff6ff;border:1px solid #ccc;color:#2563eb;box-shadow:0 3px 6px rgba(0,0,0,0.15)}\nhtml:not([data-theme=dark]) a.dCard svg{color:#2563eb}\nhtml:not([data-theme=dark]) .dropdown{stroke:#2563eb}\nhtml:not([data-theme=dark]) a.dCard:hover{background:#dbeafe;color:#1d4ed8}\nhtml:not([data-theme=dark]) a.dCard:hover svg,html:not([data-theme=dark]) a.dCard:hover .dropdown{color:#1d4ed8;stroke:#1d4ed8}\nhtml[data-theme=dark] a.dCard{background:#1f1f1f;border:1px solid #333;color:#fff;box-shadow:0 3px 6px rgba(0,0,0,0.6)}\nhtml[data-theme=dark] a.dCard svg,html[data-theme=dark] .dropdown{color:#fff;stroke:#fff}\nhtml[data-theme=dark] a.dCard:hover{background:#2a2a2a;border-color:#444;box-shadow:0 4px 8px rgba(0,0,0,0.6);color:rgb(59 130 246)}\nhtml[data-theme=dark] a.dCard:hover svg,html[data-theme=dark] a.dCard:hover .dropdown{color:rgb(59 130 246);stroke:rgb(59 130 246)}\ndetails.dCard{border:1px solid #ccc;background:#fff;color:#000;transition:background 0.3s ease,color 0.3s ease,transform 0.3s ease,border 0.3s ease;padding:0;box-shadow:0 3px 6px rgba(0,0,0,0.15);margin-bottom:0;border-radius:6px}\nhtml[data-theme=dark] details.dCard{background:#1f1f1f;border:1px solid #333;color:#fff;box-shadow:0 3px 6px rgba(0,0,0,0.6)}\ndetails.dCard summary{list-style:none;margin:0;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer}\ndetails.dCard summary .dropdown{width:10px;height:10px;margin-left:8px;transition:transform 0.3s ease}\ndetails.dCard[open] .dropdown{transform:rotate(180deg)}\ndetails.dCard:hover{transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.15)}\ndetails.dCard>div{padding:12px 16px;border-top:1px solid rgba(0,0,0,0.1)}\npre{background:rgba(0,0,0,0.05);padding:8px;border-radius:4px;white-space:pre-wrap;word-wrap:break-word}\ncode{font-family:monospace}\nhtml:not([data-theme=dark]) details.dCard summary:hover{background:#dbeafe}\n.dropdown{color:inherit;fill:currentColor;stroke:currentColor}";
  document.head.appendChild(s);

  // Create download card functions
  function macDetails(o) {
    return '<details class="dCard macCard"><summary><div class="dLeft"><strong>macOS</strong><small>macOS 12.0 (Monterey) or higher</small></div><svg class="dropdown" viewBox="0 0 10 10"><polyline points="1,3 5,7 9,3" stroke="currentColor" fill="none" stroke-width="1"/></svg></summary><div><a class="dCard" href="'+(o["mac-intel"]||"#")+'" target="_blank"><div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div><svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a><a class="dCard" href="'+(o["mac-arm"]||"#")+'" target="_blank"><div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon/M-Series</small></div><svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a></div></details>';
  }

  function winLink(o) {
    return '<a class="dCard winCard" href="'+(o["windows"]||"#")+'" target="_blank"><div class="dLeft"><strong>Windows</strong><small>Windows 10 (1809) or newer</small></div><svg viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a>';
  }

  function linuxDetails(o) {
    return '<details class="dCard linuxCard"><summary><div class="dLeft"><strong>Linux</strong><small>Ubuntu 22+ required</small></div><svg class="dropdown" viewBox="0 0 10 10"><polyline points="1,3 5,7 9,3" stroke="currentColor" fill="none" stroke-width="1"/></svg></summary><div><p>Run these commands in <strong>order</strong> to install and set up the Pieces Desktop App:</p><pre><code>sudo snap install pieces-os\nsudo snap connect pieces-os:process-control :process-control\nsudo snap install pieces-for-developers</code></pre><p>Then, type <code>pieces-for-developers</code> to launch.</p></div></details>';
  }

  function downloadMacAll(o) {
    // Full width grid with side-by-side download cards
    return '<div class="cDC"><a class="dCard" href="'+(o["mac-intel"]||"#")+'" target="_blank"><div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div><svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a><a class="dCard" href="'+(o["mac-arm"]||"#")+'" target="_blank"><div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon/M-Series</small></div><svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a></div>';
  }

  // Process blockquotes with download keywords and replace them with download cards
  function injectAll() {
    var bqs = [].slice.call(document.querySelectorAll("blockquote"));
    bqs.forEach(function(bq) {
      var txt = bq.textContent.trim(), l = txt.toLowerCase();
      var isMatch = (
        "all" === l ||
        "dual" === l ||
        "intel" === l ||
        "windows" === l ||
        "linux" === l ||
        "arm" === l ||
        "pkg" === l ||
        0 === l.indexOf("download-mac-all") ||
        0 === l.indexOf("download-link-section") ||
        0 === l.indexOf("download-link-dual") ||
        0 === l.indexOf("download-link-intel") ||
        0 === l.indexOf("download-link-windows") ||
        0 === l.indexOf("download-link-linux") ||
        0 === l.indexOf("download-link-arm") ||
        0 === l.indexOf("download-lnk-intel")
      );
      if (!isMatch) return;
      var parts = txt.split(";"), key = parts[0].trim().toLowerCase(), o = {};
      for (var i = 1; i < parts.length; i++) {
        var kv = parts[i].split("=");
        kv.length === 2 && (o[kv[0].trim().toLowerCase()] = kv[1].trim());
      }
      var html = "";
      switch (key) {
        case "all":
        case "download-link-section":
          html = macDetails(o) + winLink(o) + linuxDetails(o);
          break;
        case "download-mac-all":
          html = downloadMacAll(o);
          break;
        case "dual":
        case "download-link-dual":
          html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;width:100%;"><div>' + macDetails(o) + '</div><div>' + winLink(o) + '</div></div>';
          break;
        case "intel":
        case "download-link-intel":
          html = '<a class="dCard macCard" href="'+(o["mac-intel"]||"#")+'" target="_blank"><div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div><svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a>';
          break;
        case "arm":
        case "download-link-arm":
          html = '<a class="dCard macCard" href="'+(o["mac-arm"]||"#")+'" target="_blank"><div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon/M-Series</small></div><svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a>';
          break;
        case "pkg":
        case "download-lnk-intel":
          html = '<a class="dCard macCard" href="'+(o["mac-intel"]||"#")+'" target="_blank"><div class="dLeft"><strong>Intel (pkg)</strong><small>Download for macOS - Intel (.pkg)</small></div><svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none"><path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/><path d="M14 14H2V16H14V14Z" fill="currentColor"/></svg></a>';
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
        var d = document.createElement("div");
        d.innerHTML = html.trim();
        var cnt = d.querySelectorAll("a.dCard, details.dCard").length;
        d.className = cnt > 1 ? "cDC" : "singleDC";
        var wrap = document.createElement("div");
        wrap.className = "dcWrap";
        wrap.appendChild(d);
        bq.parentNode.replaceChild(wrap, bq);
      }
    });
  }

  // If DOM is already ready, run injectAll immediately; otherwise, wait for DOMContentLoaded.
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", injectAll);
  } else {
    injectAll();
  }

  new MutationObserver(injectAll).observe(document.body, { childList: true, subtree: true });
}();
