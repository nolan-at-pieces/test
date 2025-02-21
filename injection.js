(function () {
  // Helper function to append the gaGlobal visitor id
  function appendGaVisitor(url) {
    if (!url) return "#placeholder"; 
    if (typeof gaGlobal !== "undefined" && gaGlobal.vid) {
      var separator = url.indexOf('?') !== -1 ? '&' : '?';
      return url + separator + "ga_visitor=" + gaGlobal.vid;
    }
    return url;
  }

  // Insert CSS styles
  var s = document.createElement("style");
  s.textContent =
    ".cDC{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;align-items:start}" +
    ".singleDC{display:flex;justify-content:center;margin-top:16px}" +
    ".singleDC .dCard, .singleDC details.dCard{width:100%;max-width:600px}" +
    ".macCard{grid-column:1;grid-row:1}" +
    ".winCard{grid-column:2;grid-row:1;align-self:start}" +
    ".linuxCard{grid-column:1/3;grid-row:2}" +
    ".dCard{border-radius:6px;display:flex;justify-content:space-between;align-items:center;text-decoration:none;box-shadow:0 2px 4px rgba(0,0,0,0.1);padding:12px 16px;margin-bottom:0;transition:background .3s ease,color .3s ease,transform .3s ease,border .3s ease}" +
    ".dCard:hover{transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.15)}" +
    ".dLeft{display:flex;flex-direction:column}" +
    ".dLeft strong{font-size:.95rem}" +
    ".dLeft small{font-size:.8rem;opacity:.7;margin-top:4px;font-weight:normal}" +
    "svg:not(.dropdown){width:18px;height:18px;min-width:18px;min-height:18px;transition:transform .2s;flex-shrink:0;margin-left:8px}" +
    "a.dCard:hover svg:not(.dropdown){transform:translateY(2px)}" +
    "html:not([data-theme=dark]) a.dCard{background:#fff;border:1px solid #ccc;color:#000}" +
    "html:not([data-theme=dark]) a.dCard svg{color:#000}" +
    "html:not([data-theme=dark]) .dropdown{stroke:#000}" +
    "html:not([data-theme=dark]) a.dCard:hover{background:#f7f7f7}" +
    "html[data-theme=dark] a.dCard{background:#1f1f1f;border:1px solid #333;color:#fff;box-shadow:0 2px 4px rgba(0,0,0,0.5)}" +
    "html[data-theme=dark] a.dCard svg{color:rgb(59 130 246/var(--tw-text-opacity,1))}" +
    "html[data-theme=dark] .dropdown{stroke:rgb(59 130 246/var(--tw-text-opacity,1))}" +
    "html[data-theme=dark] a.dCard:hover{background:#2a2a2a;border-color:#444;box-shadow:0 4px 8px rgba(0,0,0,0.6)}" +
    "details.dCard{border:1px solid #ccc;background:#fff;color:#000;transition:background .3s ease,color .3s ease,transform .3s ease,border .3s ease;padding:0;box-shadow:0 2px 4px rgba(0,0,0,0.1);margin-bottom:0;border-radius:6px}" +
    "html[data-theme=dark] details.dCard{background:#1f1f1f;border:1px solid #333;color:#fff;box-shadow:0 2px 4px rgba(0,0,0,0.5)}" +
    "details.dCard summary{list-style:none;margin:0;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:background .3s ease,color .3s ease,transform .3s ease}" +
    "details.dCard summary .dropdown{width:10px;height:10px;margin-left:8px;transition:transform .3s ease}" +
    "details.dCard[open] .dropdown{transform:rotate(180deg)}" +
    "details.dCard:hover{transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.15)}" +
    "details.dCard>div{padding:12px 16px;border-top:1px solid rgba(0,0,0,0.1)}" +
    ".macCard>div a.dCard+a.dCard{margin-top:8px}" +
    "pre{background:rgba(0,0,0,0.05);padding:8px;border-radius:4px;white-space:pre-wrap;word-wrap:break-word}" +
    "code{font-family:monospace}";
  document.head.appendChild(s);

  // New Mac Buttons – downloadMacAll returns a grid of two buttons (Intel & Apple Silicon)
  function downloadMacAll(o) {
    return '<div class="cDC download-mac-all">' +
           '<div><a class="dCard macCard" style="width:100%" href="' + appendGaVisitor(o["mac-intel"]) + '" target="_blank">' +
           '<div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div>' +
           '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
           '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
           '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
           '</svg></a></div>' +
           '<div><a class="dCard macCard" style="width:100%" href="' + appendGaVisitor(o["mac-arm"]) + '" target="_blank">' +
           '<div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon / M-Series</small></div>' +
           '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
           '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
           '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
           '</svg></a></div>' +
           '</div>';
  }

  // Parsing and injection – uses robust splitting and replaces the first matching blockquote
  function inject() {
    var bq = [].slice.call(document.querySelectorAll("blockquote")).find(function (e) {
      var t = e.textContent.trim().toLowerCase();
      return t.indexOf("download-link") === 0 || t === "windows" || t === "linux" || t === "all";
    });
    if (!bq) return;
    console.log("Parsing blockquote text:", bq.textContent);

    // Split on semicolon followed by any whitespace
    var parts = bq.textContent.split(/;\s*/),
        key = parts[0].trim().toLowerCase(),
        o = {};

    // FIX: only split each key=value pair on the first "="
    for (var i = 1; i < parts.length; i++) {
      var eqIndex = parts[i].indexOf("=");
      if (eqIndex > -1) {
        var k = parts[i].substring(0, eqIndex).trim().toLowerCase();
        var v = parts[i].substring(eqIndex + 1).trim();
        o[k] = v;
      }
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
        html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;width:100%;">' +
               '<div>' + macDetails(o) + '</div>' +
               '<div>' + winLink(o) + '</div></div>';
        break;
      case "intel":
      case "download-link-intel":
        html = '<a class="dCard macCard" href="' + appendGaVisitor(o["mac-intel"]) + '" target="_blank">' +
               '<div class="dLeft"><strong>Intel</strong><small>Download for macOS - Intel</small></div>' +
               '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
               '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
               '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
               '</svg></a>';
        break;
      case "arm":
      case "download-link-arm":
        html = '<a class="dCard macCard" href="' + appendGaVisitor(o["mac-arm"]) + '" target="_blank">' +
               '<div class="dLeft"><strong>Apple Silicon</strong><small>Download for macOS - Apple Silicon / M-Series</small></div>' +
               '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
               '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
               '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
               '</svg></a>';
        break;
      case "pkg":
      case "download-lnk-intel":
        html = '<a class="dCard macCard" href="' + appendGaVisitor(o["mac-intel"]) + '" target="_blank">' +
               '<div class="dLeft"><strong>Intel (pkg)</strong><small>Download for macOS - Intel (.pkg)</small></div>' +
               '<svg style="transform:scale(-1,1)" viewBox="0 0 16 16" fill="none">' +
               '<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="currentColor"/>' +
               '<path d="M14 14H2V16H14V14Z" fill="currentColor"/>' +
               '</svg></a>';
        break;
      case "windows":
      case "download-link-windows":
        html = winLink(o);
        break;
      case "linux":
      case "download-link-linux":
        html = linuxDetails(o);
        break;
      default:
        html = "";
        break;
    }

    if (html) {
      var d = document.createElement("div");
      d.innerHTML = html.trim();
      var cnt = d.querySelectorAll("a.dCard, details.dCard").length;
      d.className = cnt > 1 ? "cDC" : "singleDC";
      bq.parentNode.replaceChild(d, bq);
    }
  }

  document.addEventListener("DOMContentLoaded", inject);
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
})();
