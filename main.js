/* =========================================================
   TOOLBENCH — main.js
   Vanilla JS only. No libraries, no build step. Split into
   small named functions so you (or n8n-generated code) can
   find and edit exactly the part you need.
   ========================================================= */

(function () {
  "use strict";

  /* ---- theme toggle (persisted in localStorage) ---- */
  function initTheme() {
    var root = document.documentElement;
    var stored = localStorage.getItem("tb-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    root.setAttribute("data-theme", theme);

    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    updateToggleLabel(btn, theme);

    btn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("tb-theme", next);
      updateToggleLabel(btn, next);
    });
  }

  function updateToggleLabel(btn, theme) {
    btn.textContent = theme === "dark" ? "☀ light" : "● dark";
    btn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
  }

  /* ---- tool directory search + category filter (index page) ---- */
  function initToolFilter() {
    var input = document.querySelector("[data-tool-search]");
    var chips = document.querySelectorAll("[data-chip]");
    var cards = document.querySelectorAll("[data-tool-card]");
    if (!cards.length) return;

    var activeCategory = "all";

    function apply() {
      var q = (input && input.value ? input.value : "").trim().toLowerCase();
      cards.forEach(function (card) {
        var name = (card.getAttribute("data-name") || "").toLowerCase();
        var category = card.getAttribute("data-category") || "";
        var matchesText = !q || name.indexOf(q) !== -1;
        var matchesCategory = activeCategory === "all" || category === activeCategory;
        card.style.display = matchesText && matchesCategory ? "" : "none";
      });
    }

    if (input) input.addEventListener("input", apply);

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        activeCategory = chip.getAttribute("data-chip");
        apply();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initToolFilter();
  });
})();
