!function(){
  // Inject CSS styles for the download cards
  var s = document.createElement("style");
  s.textContent = "/* Full width container for download cards */\
.dcWrap { display: block; width: 100%; margin-bottom: 16px; }\
/* Grid container for side-by-side cards */\
.cDC { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; align-items: start; width: 100%; }\
/* Download card styling */\
.dCard { border-radius: 6px; display: flex; justify-content: space-between; align-items: center; text-decoration: none; box-shadow: 0 3px 6px rgba(0,0,0,0.15); padding: 12px 16px; transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, border 0.3s ease; }\
.dCard:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }\
.dLeft { display: flex; flex-direction: column; }\
.dLeft strong { font-size: 0.95rem; }\
.dLeft small { font-size: 0.8rem; opacity: 0.7; margin-top: 4px; font-weight: normal; }\
svg:not(.dropdown) { width: 18px; height: 18px; min-width: 18px; min-height: 18px; transition: transform 0.2s; flex-shrink: 0; margin-left: 8px; }\
a.dCard:hover svg:not(.dropdown) { transform: translateY(2px); }\
/* Light theme styles */\
html:not([data-theme=dark]) a.dCard { background: #eff6ff; border: 1px solid #ccc; color: #2563eb; }\
html:not([data-theme=dark]) a.dCard:hover { background: #dbeafe; color: #1d4ed8; }\
/* Dropdown icon */\
.dropdown { width: 10px; height: 10px; margin-left: 8px; transition: transform 0.3s ease; fill: currentColor; stroke: currentColor; }\
details.dCard summary { list-style: none; margin: 0; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }\
details.dCard[open] .dropdown { transform: rotate(180deg); }";
  document.head.appendChild(s);

  // Download card functions
  function downloadMacAll(o) {
    return '<div class="cDC">' +
             '<a class="dCard" href="'+(o["mac-intel"]||"#")+'" target="_blank">' +
               '<div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div>' +
               '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
                 '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
                 '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
               '</svg>' +
             '</a>' +
             '<a class="dCard" href="'+(o["mac-arm"]||"#")+'" target="_blank">' +
               '<div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon/M-Series</small></div>' +
               '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
                 '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
                 '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
               '</svg>' +
             '</a>' +
           '</div>';
  }

  // Injection function: looks for blockquotes starting with "download-mac-all"
  function injectAll() {
    var bqs = document.querySelectorAll("blockquote");
    bqs.forEach(function(bq) {
      var txt = bq.textContent.trim();
      if(txt.toLowerCase().indexOf("download-mac-all") !== 0) return;
      // Parse parameters from the blockquote
      var parts = txt.split(";");
      var key = parts[0].trim().toLowerCase(); // should be "download-mac-all"
      var o = {};
      for(var i = 1; i < parts.length; i++){
        var kv = parts[i].split("=");
        if(kv.length === 2){
          o[kv[0].trim().toLowerCase()] = kv[1].trim();
        }
      }
      // Generate HTML for the two download cards
      var html = "";
      if(key === "download-mac-all"){
        html = downloadMacAll(o);
      }
      if(html) {
        var d = document.createElement("div");
        d.innerHTML = html;
        d.className = "cDC";
        var wrap = document.createElement("div");
        wrap.className = "dcWrap";
        wrap.appendChild(d);
        bq.parentNode.replaceChild(wrap, bq);
        // Optional: log for debugging
        console.log("Replaced blockquote with download-mac-all cards:", o);
      }
    });
  }

  // Run injection once immediately if the DOM is ready, or wait for DOMContentLoaded
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", injectAll);
  } else {
    injectAll();
  }

  // Also watch for future additions to the DOM
  new MutationObserver(injectAll).observe(document.body, { childList: true, subtree: true });
}();
