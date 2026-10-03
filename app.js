/* ============================================================================
   app.js — turns content.js into the website.
   You do NOT need to edit this file. Change your words in content.js instead.
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {}, C = window.CHARS, D = window.DECO;
  var N = S.names || { him: "Babe", me: "Me" };
  var mascotsOn = !(S.mascots && S.mascots.enabled === false);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var arr = function (a) { return Array.isArray(a) ? a : []; };

  /* ---------- text helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function sub(s) {   // escape, swap {him}/{me}, keep line breaks
    return esc(s).split("{him}").join(esc(N.him)).split("{me}").join(esc(N.me)).replace(/\\n|\n/g, "<br>");
  }
  function fmtDate(d) {
    if (!d) return "";
    var t = new Date(d + "T00:00:00Z");
    if (isNaN(t)) return esc(d);
    return t.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  }
  function dateInfo(d) {
    var t = new Date(d.date + "T00:00:00");
    if (isNaN(t)) return "";
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var target = t;
    if (d.yearly) {
      target = new Date(now.getFullYear(), t.getMonth(), t.getDate());
      if (target < now) target = new Date(now.getFullYear() + 1, t.getMonth(), t.getDate());
    }
    var diff = Math.round((target - now) / 864e5);
    if (diff === 0) return "today! 🎉";
    if (diff > 0) return "in " + diff + " day" + (diff > 1 ? "s" : "");
    return -diff + " days ago";
  }
  function imgSrc(p) { return p ? esc(p) : ""; }

  /* ---------- little decorations ---------- */
  function peek(ch, cls, style) {
    if (!mascotsOn || !C[ch]) return "";
    return '<div class="peek ' + cls + '" style="' + (style || "") + '" aria-hidden="true"><div class="peek-in">' + C[ch]() + "</div></div>";
  }
  function pop(ch, cls, style) {
    if (!mascotsOn || !C[ch]) return "";
    return '<div class="pop ' + cls + '" style="' + (style || "") + '" aria-hidden="true"><div class="peek-in">' + C[ch]() + "</div></div>";
  }
  function scatter(n, kinds, colors) {
    var out = "";
    for (var i = 0; i < n; i++) {
      var k = kinds[i % kinds.length], c = colors[i % colors.length];
      var size = 10 + Math.random() * 16;
      out += '<i style="left:' + (Math.random() * 96).toFixed(1) + "%;top:" + (Math.random() * 94).toFixed(1) +
        "%;width:" + size.toFixed(0) + "px;height:" + size.toFixed(0) + "px;--d:" + (4 + Math.random() * 5).toFixed(1) +
        "s;--delay:-" + (Math.random() * 5).toFixed(1) + "s;--o:" + (0.45 + Math.random() * 0.4).toFixed(2) + '">' + D[k](c) + "</i>";
    }
    return '<div class="scatter" aria-hidden="true">' + out + "</div>";
  }
  function head(h, extra) {
    h = h || {};
    return '<div class="sec-head reveal">' + (extra || "") + '<span class="kicker">' + sub(h.kicker) + "</span><h2>" + sub(h.title) +
      "</h2>" + (h.subtitle ? "<p>" + sub(h.subtitle) + "</p>" : "") + "</div>";
  }
  function placeholder(i) {
    var cols = [["#D9233E", "#FFF0F2"], ["#A9142B", "#FFD3DA"], ["#FFF0F2", "#D9233E"], ["#2A0D12", "#D9233E"]][i % 4];
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='" + cols[0] +
      "'/><path d='M200 330C100 250 130 170 200 225C270 170 300 250 200 330Z' fill='" + cols[1] +
      "'/><text x='200' y='400' font-family='sans-serif' font-size='26' text-anchor='middle' fill='" + cols[1] + "'>your photo here</text></svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  /* ---------- sections ---------- */
  function hero() {
    var H = S.hero || {};
    var title = esc(H.title || "Happy Boyfriend's Day, {him} ❤️");
    var parts = title.split("{him}");
    var titleHtml = parts.length > 1 ? parts[0].replace(/,\s*$/, ",") + '<span class="name">' + esc(N.him) + parts.slice(1).join("") + "</span>" : title;
    return '<header class="hero" id="hero">' +
      scatter(16, ["heart", "star", "sparkle", "cloud"], ["#fff", "#FFC2CC", "#fff", "#FFE3E8"]) +
      peek("puff", "hero-puff", "") + peek("puff", "hero-puff2", "") + peek("mochi", "hero-mochi edge-b", "") +
      '<div class="hero-inner">' +
        '<div class="hero-badge">' + D.bow("#fff") + "<span>for " + esc(N.him) + "</span>" + D.bow("#fff") + "</div>" +
        "<h1>" + titleHtml + "</h1>" +
        '<p class="hero-sub">' + sub(H.subtitle) + "</p>" +
        '<button class="btn pulse" id="openBtn"><span class="ico">' + D.bow("#D9233E") + "</span>" + esc(H.button || "open your surprise ♡") + "</button>" +
        '<p class="hero-hint">' + sub(H.hint) + "</p>" +
      "</div></header>";
  }

  function story() {
    var St = S.story || {};
    var days = Math.floor((Date.now() - new Date(S.relationshipDate + "T00:00:00")) / 864e5);
    var counter = isNaN(days) ? "" :
      '<div class="counter reveal"><small>' + sub(S.counterLabel) + "</small><b>" + days.toLocaleString() + "</b><span>days · " +
      Math.floor(days / 7).toLocaleString() + " weeks of you &amp; me ♡</span></div>";
    var chips = arr(S.importantDates).map(function (d) {
      return '<div class="date-chip reveal"><em>' + esc(d.emoji || "♡") + "</em><div><b>" + sub(d.label) + "</b><small>" +
        fmtDate(d.date) + " · " + dateInfo(d) + "</small></div></div>";
    }).join("");
    var events = arr(St.events), items = "";
    events.forEach(function (e, i) {
      items += '<li class="tl-item reveal"><span class="tl-dot">' + D.heart(i % 2 ? "#A9142B" : "#D9233E") + '</span><div class="tl-card">' +
        '<span class="tl-date">' + fmtDate(e.date) + "</span><h3>" + sub(e.title) + "</h3><p>" + sub(e.text) + "</p>" +
        (e.photo ? '<figure class="tl-photo"><img loading="lazy" src="' + imgSrc(e.photo) + '" alt="' + esc(e.title) + '"></figure>' : "") +
        "</div></li>";
      if (i % 3 === 2 && i < events.length - 1) items += '<li class="tl-sticker" aria-hidden="true">' + pop(i % 6 === 2 ? "puff" : "mochi", "") + "</li>";
    });
    return '<section class="sec bg-blush" id="story" style="--prev:#A9142B">' +
      scatter(10, ["heart", "sparkle", "star"], ["#FFC2CC", "#D9233E", "#FFD3DA"]) +
      pop("puff", "seam-r", "top:-50px;width:68px") +
      '<div class="wrap">' + head(St) + counter + '<div class="dates">' + chips + '</div><ul class="timeline">' + items + "</ul></div></section>";
  }

  function loves() {
    var L = S.loves || {};
    var items = arr(L.items).map(function (it, i) {
      var stk = it.sticker || (i % 4 === 1 ? "puff" : i % 4 === 3 ? "mochi" : "none");
      return '<li class="love reveal" style="--r:' + [-1.2, 0.9, -0.6, 1.2][i % 4] + 'deg">' +
        (stk !== "none" ? pop(stk, "sit") : "") +
        '<span class="love-ic">' + esc(it.emoji || "♡") + "</span><h3>" + sub(it.title) + "</h3><p>" + sub(it.text) + "</p></li>";
    }).join("");
    return '<section class="sec bg-red" id="loves" style="--prev:#FFF0F2">' +
      scatter(14, ["heart", "star", "sparkle"], ["#fff", "#FFC2CC", "#FFE3E8"]) +
      peek("mochi", "seam-l", "top:-52px;width:70px") +
      '<div class="wrap">' + head(L) + '<ul class="loves">' + items + "</ul></div></section>";
  }

  function jokes() {
    var J = S.jokes || {};
    var items = arr(J.items).map(function (it, i) {
      return '<li class="joke reveal" style="--r:' + [-1.5, 1.2, -0.8, 1.6][i % 4] + 'deg"><h3>' + sub(it.title) + "</h3><p>" + sub(it.text) + "</p></li>";
    }).join("");
    return '<section class="sec bg-white" id="jokes" style="--prev:#A9142B">' +
      peek("puff", "side-r", "top:34%;width:64px") +
      '<div class="wrap">' + head(J) + '<ul class="jokes">' + items + "</ul></div></section>";
  }

  function memories() {
    var M = S.memories || {};
    var items = arr(M.photos).map(function (p, i) {
      var stk = p.sticker || (i % 3 === 0 ? "mochi" : i % 3 === 1 && i % 2 ? "puff" : "none");
      var src = p.image ? imgSrc(p.image) : placeholder(i);
      return '<figure class="polaroid reveal" style="--r:' + [-2.2, 1.8, -1.2, 2.4, -1.8, 1.2][i % 6] + 'deg" data-src="' + src + '" data-cap="' + esc(p.caption || "") + '">' +
        '<span class="tape"></span><img loading="lazy" src="' + src + '" alt="' + esc(p.caption || "our photo") + '">' +
        "<figcaption>" + sub(p.caption) + (p.date ? "<small>" + fmtDate(p.date) + "</small>" : "") + "</figcaption>" +
        (stk !== "none" ? pop(stk, "stk") : "") + "</figure>";
    }).join("");
    return '<section class="sec bg-blush" id="memories" style="--prev:#fff">' +
      scatter(10, ["heart", "sparkle", "star"], ["#FFC2CC", "#D9233E", "#FFD3DA"]) +
      peek("mochi", "seam-r", "top:-52px;width:70px") +
      '<div class="wrap">' + head(M) + '<div class="polaroids">' + items + "</div></div></section>";
  }

  function openWhen() {
    var O = S.openWhen || {}, prefix = O.prefix || "Open when";
    var items = arr(O.letters).map(function (l, i) {
      return '<li class="ow reveal"><button class="env" aria-expanded="false" aria-label="' + esc(prefix + " " + l.label) + '">' +
        '<span class="env-body"><span class="env-paper">' + D.heart("#D9233E").replace("<svg", '<svg width="34" height="34"') + '</span><span class="env-front"></span>' +
        '<span class="env-flap"></span><span class="env-seal">' + D.heart("#D9233E") + "</span></span>" +
        '<span class="env-label"><b>' + esc(prefix) + "</b>" + sub(l.label) + "</span></button>" +
        '<div class="ow-note"><div><p>' + sub(l.message) + "</p></div></div>" +
        pop(i % 2 ? "puff" : "mochi", "beside") + "</li>";
    }).join("");
    return '<section class="sec bg-burgundy" id="open" style="--prev:#FFF0F2">' +
      scatter(14, ["heart", "star", "sparkle"], ["#D9233E", "#A9142B", "#FFC2CC"]) +
      '<div class="wrap">' + head(O) + '<ul class="envs">' + items + "</ul></div></section>";
  }

  function song() {
    var So = S.song || {};
    return '<section class="sec bg-white" id="song" style="--prev:#2A0D12">' +
      peek("puff", "side-l", "top:20%;width:60px") +
      '<div class="wrap">' + head(So) +
      '<div class="player reveal">' + pop("puff", "sit") +
        '<div class="cover" id="cover">' + (So.cover ? '<img src="' + imgSrc(So.cover) + '" alt="">' : '<span class="heart">' + D.heart("#D9233E") + "</span>") + "</div>" +
        '<div class="song-name">' + sub(So.name) + '</div><div class="song-artist">' + sub(So.artist) + "</div>" +
        '<div class="controls"><button class="play" id="playBtn" aria-label="play">' +
          '<svg viewBox="0 0 24 24" id="playIco"><path d="M7 4.5v15l13-7.5z" fill="#fff"/></svg></button>' +
          '<input class="seek" id="seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="seek"><span class="time" id="time">0:00</span></div>' +
        (So.note ? '<p class="song-note">' + sub(So.note) + "</p>" : "") +
        (So.spotifyEmbed ? '<iframe loading="lazy" allow="encrypted-media" src="' + esc(So.spotifyEmbed) + '"></iframe>' : "") +
        '<audio id="audio" preload="none"' + (So.audio ? ' src="' + imgSrc(So.audio) + '"' : "") + "></audio>" +
      "</div></div></section>";
  }

  function letter() {
    var Lt = S.letter || {};
    var paras = arr(Lt.body).map(function (p) { return "<p>" + sub(p) + "</p>"; }).join("");
    return '<section class="sec bg-red" id="letter" style="--prev:#fff">' +
      scatter(12, ["heart", "star", "sparkle"], ["#fff", "#FFC2CC", "#FFE3E8"]) +
      '<div class="wrap">' + head(Lt) +
      '<div class="letter-wrap">' + peek("mochi", "mochi-back", "") +
        '<article class="letter reveal"><span class="tape"></span><p class="greet">' + sub(Lt.greeting) + "</p>" + paras +
        '<p class="sign">' + sub(Lt.signoff) + '</p><span class="sig">' + sub(Lt.signature) + "</span></article>" +
        pop("puff", "stick") +
      "</div></div></section>";
  }

  function finale() {
    var F = S.finale || {};
    var paras = arr(F.message).map(function (p) { return "<p>" + sub(p) + "</p>"; }).join("");
    return '<section class="sec bg-blush finale" id="finale" style="--prev:#A9142B">' +
      scatter(10, ["heart", "sparkle", "star"], ["#FFC2CC", "#D9233E", "#FFD3DA"]) +
      '<div class="wrap"><div class="sec-head reveal"><span class="kicker">' + sub(F.kicker) + "</span></div>" +
      '<div class="fin-stage"><div class="fin-btn-wrap"><button class="btn red big pulse" id="finBtn">' + esc(F.button || "there's one more thing…") + "</button></div>" +
        '<div class="fin-chars">' + (mascotsOn ? '<div class="pop fl" id="finMochi">' + '<div class="peek-in">' + C.mochi() + '</div></div><div class="pop fr" id="finPuff"><div class="peek-in">' + C.puff() + "</div></div>" : "") + "</div></div>" +
      '<div class="fin-card" id="finCard"><span class="corner c1">' + D.bow() + '</span><span class="corner c2">' + D.bow() + "</span><h3>" + sub(F.title) + "</h3>" + paras +
        '<p class="sign">' + sub(F.signoff) + "</p></div></div></section>";
  }

  function footer() {
    var Fo = S.footer || {};
    return '<footer class="foot">' + pop("puff", "wave") + peek("mochi", "mochi-f", "") +
      '<p class="big">' + sub(Fo.text) + '</p><p class="small">' + sub(Fo.small) + "</p></footer>";
  }

  /* ---------- render ---------- */
  document.title = "Happy Boyfriend's Day, " + N.him + " ♡";
  $("#app").innerHTML = hero() + '<main id="main" hidden>' + story() + loves() + jokes() + memories() + openWhen() + song() + letter() + finale() + "</main>" +
    footer().replace("<footer", "<footer hidden id=\"foot\"") +
    '<div class="lightbox" id="lb"><figure><img id="lbImg" alt=""><figcaption id="lbCap"></figcaption></figure></div><div class="toast" id="toast"></div>';

  /* ---------- reveal on scroll ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }) : null;
  function watch() {
    $$(".reveal,.peek,.pop").forEach(function (el) {
      if (el.classList.contains("beside") || el.id === "finMochi" || el.id === "finPuff") return; // opened by clicks instead
      if (io) io.observe(el); else el.classList.add("in");
    });
  }
  watch();
  // hero mascots start partly outside the screen, so the scroll observer can't see them: bring them in by timer
  $$(".hero .peek").forEach(function (el, i) { setTimeout(function () { el.classList.add("in"); }, 500 + i * 350); });

  /* ---------- toast ---------- */
  var toastT;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ---------- heart burst + mascot hop ---------- */
  function burst(x, y, n) {
    var cols = ["#D9233E", "#A9142B", "#fff", "#FFC2CC", "#FF5A75"];
    for (var i = 0; i < n; i++) {
      var el = document.createElement("div"), a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 190;
      el.className = "burst";
      el.style.left = x - 11 + "px"; el.style.top = y - 11 + "px";
      el.style.setProperty("--dx", Math.cos(a) * d + "px");
      el.style.setProperty("--dy", Math.sin(a) * d - 60 + "px");
      el.style.setProperty("--rot", (Math.random() * 120 - 60) + "deg");
      el.style.setProperty("--s", (0.7 + Math.random() * 1.1).toFixed(2));
      el.innerHTML = (i % 5 === 4 ? D.star("#fff") : i % 7 === 3 ? D.sparkle("#fff") : D.heart(cols[i % cols.length]));
      document.body.appendChild(el);
      setTimeout(function (e) { e.remove(); }.bind(null, el), 1600);
    }
  }
  function hop(x, y, ch) {
    if (!mascotsOn) return;
    var el = document.createElement("div");
    el.className = "hop"; el.style.left = x + "px"; el.style.top = y + "px";
    el.innerHTML = C[ch]();
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1700);
  }

  /* ---------- hero button → reveal the site ---------- */
  var opened = false;
  $("#openBtn").addEventListener("click", function (e) {
    if (opened) return; opened = true;
    var r = e.currentTarget.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    burst(x, y, 34); hop(x, r.top, "mochi"); setTimeout(function () { hop(x + 70, r.top, "puff"); }, 220);
    setTimeout(function () {
      document.body.classList.remove("locked");
      var main = $("#main"); main.hidden = false; $("#foot").hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        main.classList.add("show");
        setTimeout(function () { $("#story").scrollIntoView({ behavior: "smooth" }); }, 250);
      }); });
    }, 700);
  });

  /* ---------- open-when envelopes ---------- */
  $$(".ow").forEach(function (li) {
    var btn = $(".env", li), b = $(".beside", li);
    btn.addEventListener("click", function () {
      var open = !li.classList.contains("open");
      li.classList.toggle("open", open); btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
      if (b) b.classList.toggle("in", open);
      if (open) { var r = btn.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 3, 10); }
    });
  });

  /* ---------- polaroid lightbox ---------- */
  var lb = $("#lb");
  document.addEventListener("click", function (e) {
    var p = e.target.closest && e.target.closest(".polaroid");
    if (p) { $("#lbImg").src = p.getAttribute("data-src"); $("#lbCap").textContent = p.getAttribute("data-cap"); lb.classList.add("show"); }
    else if (lb.classList.contains("show")) lb.classList.remove("show");
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("show"); });

  /* ---------- song player (never autoplays) ---------- */
  var au = $("#audio"), pb = $("#playBtn"), sk = $("#seek"), tm = $("#time"), cover = $("#cover");
  var PLAY = '<path d="M7 4.5v15l13-7.5z" fill="#fff"/>', PAUSE = '<path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#fff"/>';
  function mmss(s) { s = Math.floor(s || 0); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  pb.addEventListener("click", function () {
    if (!au.getAttribute("src")) { toast("add your song link in content.js ♡"); return; }
    if (au.paused) au.play().catch(function () { toast("hmm, that song link didn't work"); }); else au.pause();
  });
  au.addEventListener("play", function () { $("#playIco").innerHTML = PAUSE; cover.style.animation = "spin 6s linear infinite"; });
  au.addEventListener("pause", function () { $("#playIco").innerHTML = PLAY; cover.style.animation = "none"; });
  au.addEventListener("timeupdate", function () { if (au.duration) sk.value = (au.currentTime / au.duration) * 100; tm.textContent = mmss(au.currentTime) + " / " + mmss(au.duration); });
  au.addEventListener("ended", function () { sk.value = 0; });
  sk.addEventListener("input", function () { if (au.duration) au.currentTime = (sk.value / 100) * au.duration; });
  var st = document.createElement("style"); st.textContent = "@keyframes spin{to{transform:rotate(360deg)}}"; document.head.appendChild(st);

  /* ---------- final surprise ---------- */
  $("#finBtn").addEventListener("click", function (e) {
    var btn = e.currentTarget, r = btn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 46);
    setTimeout(function () { burst(r.left + r.width / 2, r.top, 30); }, 350);
    var m = $("#finMochi"), p = $("#finPuff");
    if (m) m.classList.add("in"); if (p) setTimeout(function () { p.classList.add("in"); }, 200);
    btn.parentNode.style.display = "none";
    setTimeout(function () {
      $("#finCard").classList.add("show");
      $("#finCard").scrollIntoView({ behavior: "smooth", block: "center" });
    }, 600);
  });
})();
