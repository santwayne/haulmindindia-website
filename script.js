/* HaulMind India — site interactions */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var SALES_EMAIL = "hello@wayneesolutions.com";
  var APP_URL = "https://haulmindin.wayneesolutions.com";

  /* ---- mobile menu ---- */
  var body = document.body;
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") body.classList.remove("nav-open");
    });
  }

  /* ---- active nav link ---- */
  var page = location.pathname.split("/").pop() || "index.html";
  if (page.indexOf(".") === -1) page += ".html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === page) a.classList.add("active");
  });

  /* ---- header shadow + back to top ---- */
  var header = document.querySelector(".site-header");
  var backTop = document.querySelector(".back-top");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (backTop) backTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---- hero video: make sure it plays, add play/pause ---- */
  var video = document.querySelector(".hero-video");
  var vBtn = document.querySelector(".video-toggle");
  if (video) {
    video.muted = true;
    var tryPlay = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
    tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });
    if (vBtn) {
      var setLabel = function () { vBtn.innerHTML = video.paused ? "&#9654;&nbsp; Play video" : "&#10073;&#10073;&nbsp; Pause video"; };
      video.addEventListener("play", setLabel);
      video.addEventListener("pause", setLabel);
      vBtn.addEventListener("click", function () { if (video.paused) tryPlay(); else video.pause(); });
      setLabel();
    }
  }

  /* ---- graceful fallback when a remote photo cannot load ---- */
  document.querySelectorAll("img").forEach(function (img) {
    var hide = function () { img.style.visibility = "hidden"; };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) hide();
    img.addEventListener("error", hide);
  });

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- prefill contact form from ?plan= / ?topic= ---- */
  var params = new URLSearchParams(location.search);

  /* ---- demo / contact form ---- */
  var form = document.getElementById("demo-form");
  if (form) {
    var topic = params.get("topic");
    if (topic && form.interest) {
      Array.prototype.forEach.call(form.interest.options, function (o) { if (o.value === topic) form.interest.value = topic; });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) || (f.type === "tel" && f.value.replace(/\D/g, "").length < 10);
        f.classList.toggle("field-error", bad);
        if (bad) ok = false;
      });
      if (!ok) { var first = form.querySelector(".field-error"); if (first) first.focus(); return; }
      var d = new FormData(form);
      var lines = [
        "Name: " + d.get("name"),
        "Company: " + d.get("company"),
        "Phone: " + d.get("phone"),
        "Email: " + d.get("email"),
        "City / State: " + (d.get("city") || "-"),
        "Number of branches: " + (d.get("branches") || "-"),
        "Interested in: " + (d.get("interest") || "-"),
        "",
        "Message:",
        d.get("message") || "-"
      ];
      var subject = "HaulMind India demo request — " + d.get("company");
      var href = "mailto:" + SALES_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
      var done = document.getElementById("form-success");
      if (done) {
        done.querySelector("a").setAttribute("href", href);
        done.classList.add("show");
      }
      window.location.href = href;
    });
    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      f.addEventListener("input", function () { f.classList.remove("field-error"); });
    });
  }

  /* ---- LR tracking ---- */
  var track = document.getElementById("track-form");
  if (track) {
    var pre = params.get("lr");
    if (pre) track.lr.value = pre;
    track.addEventListener("submit", function (e) {
      e.preventDefault();
      var lr = track.lr.value.trim().toUpperCase();
      if (!lr) { track.lr.classList.add("field-error"); track.lr.focus(); return; }
      var url = APP_URL + "/track?lr=" + encodeURIComponent(lr);
      var w = window.open(url, "_blank", "noopener");
      if (!w) window.location.href = url;
    });
    track.lr.addEventListener("input", function () { track.lr.classList.remove("field-error"); });
  }
})();
