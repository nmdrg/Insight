(() => {
  const languages = {
    en: "English", fr: "Français", de: "Deutsch", es: "Español", it: "Italiano",
    ja: "日本語", ko: "한국어", pt: "Português", ru: "Русский", ar: "العربية", "zh-CN": "简体中文"
  };
  const supported = Object.keys(languages);
  const saved = localStorage.getItem("insight-site-language");
  const detected = (navigator.language || "en").replace("_", "-");
  const language = saved || (supported.includes(detected) ? detected : (supported.includes(detected.split("-")[0]) ? detected.split("-")[0] : "en"));

  const select = document.createElement("select");
  select.className = "language-selector";
  select.setAttribute("aria-label", "Language");
  for (const [code, name] of Object.entries(languages)) {
    const option = new Option(name, code, false, code === language);
    select.add(option);
  }
  select.addEventListener("change", () => {
    localStorage.setItem("insight-site-language", select.value);
    openTranslation(select.value);
  });

  function openTranslation(targetLanguage) {
    if (targetLanguage === "en") {
      window.location.href = window.location.href.replace(/https:\/\/nmdrg-insight\.translate\.goog\//, "https://nmdrg.github.io/Insight/").replace(/[?&]_x_tr_[^&]+/g, "");
      return;
    }
    const path = window.location.pathname.replace(/^\/Insight\//, "");
    window.location.href = `https://nmdrg-insight.translate.goog/${path}?_x_tr_sl=auto&_x_tr_tl=${encodeURIComponent(targetLanguage)}&_x_tr_hl=${encodeURIComponent(targetLanguage)}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("header nav")?.append(select);
    if (!saved && language !== "en" && window.location.hostname === "nmdrg.github.io") openTranslation(language);
  });
})();
