/* ===== Atmosfera — Cookie Consent (GDPR / Reg. UE 2016/679) ===== */
(function () {
  "use strict";

  var STORAGE_KEY = "atmosfera_cookie_consent";
  var CONSENT_VERSION = 1;

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.version !== CONSENT_VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(thirdParty) {
    var data = {
      version: CONSENT_VERSION,
      necessary: true,
      thirdParty: !!thirdParty,
      ts: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
    return data;
  }

  // Carica gli embed di terze parti (iframe con data-consent-src) e nasconde i placeholder
  function loadThirdParty() {
    var frames = document.querySelectorAll("iframe[data-consent-src]");
    frames.forEach(function (frame) {
      if (!frame.getAttribute("src")) {
        frame.setAttribute("src", frame.getAttribute("data-consent-src"));
      }
    });
    document.querySelectorAll(".map-placeholder").forEach(function (ph) {
      ph.style.display = "none";
    });
  }

  function showPlaceholders() {
    document.querySelectorAll(".map-placeholder").forEach(function (ph) {
      ph.style.display = "";
    });
  }

  function applyConsent(consent) {
    if (consent && consent.thirdParty) {
      loadThirdParty();
    } else {
      showPlaceholders();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var banner = document.getElementById("cookieBanner");
    var prefs = document.getElementById("cookiePrefs");
    var prefThirdParty = document.getElementById("prefThirdParty");
    var btnSave = document.querySelector("[data-cookie-save]");
    var btnPrefsToggle = document.querySelector("[data-cookie-prefs-toggle]");

    function openBanner(showPrefs) {
      if (!banner) return;
      banner.hidden = false;
      banner.classList.add("open");
      if (prefs) prefs.hidden = !showPrefs;
      if (btnSave) btnSave.hidden = !showPrefs;
      var current = readConsent();
      if (prefThirdParty) prefThirdParty.checked = !!(current && current.thirdParty);
    }

    function closeBanner() {
      if (!banner) return;
      banner.classList.remove("open");
      banner.hidden = true;
    }

    function decide(thirdParty) {
      var consent = saveConsent(thirdParty);
      applyConsent(consent);
      closeBanner();
    }

    // Stato iniziale
    var stored = readConsent();
    if (stored) {
      applyConsent(stored);
    } else {
      openBanner(false);
    }

    // Pulsanti del banner
    document.querySelectorAll("[data-cookie-accept-all]").forEach(function (b) {
      b.addEventListener("click", function () { decide(true); });
    });
    document.querySelectorAll("[data-cookie-reject]").forEach(function (b) {
      b.addEventListener("click", function () { decide(false); });
    });
    if (btnPrefsToggle) {
      btnPrefsToggle.addEventListener("click", function () {
        var willShow = prefs ? prefs.hidden : false;
        if (prefs) prefs.hidden = !willShow;
        if (btnSave) btnSave.hidden = !willShow;
      });
    }
    if (btnSave) {
      btnSave.addEventListener("click", function () {
        decide(prefThirdParty ? prefThirdParty.checked : false);
      });
    }

    // Riapri impostazioni dal footer
    document.querySelectorAll("[data-cookie-settings]").forEach(function (b) {
      b.addEventListener("click", function () { openBanner(true); });
    });

    // "Abilita la mappa" dal placeholder
    document.querySelectorAll("[data-cookie-accept-maps]").forEach(function (b) {
      b.addEventListener("click", function () { decide(true); });
    });
  });
})();
