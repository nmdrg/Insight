/* Local language routing only: no content is sent to a translation service. */
(() => {
  const locale = (navigator.language || "en").toLowerCase();
  const language = ["fr", "de", "es", "it", "ja", "ko", "pt", "ru", "zh"].find((code) => locale.startsWith(code));
  if (!language || sessionStorage.getItem("insight-site-language-routed")) return;
  const page = location.pathname.split("/").pop() || "index.html";
  const pages = new Set(["index.html", "privacy.html", "terms.html", "community-guidelines.html", "support.html", "account-deletion.html"]);
  if (!pages.has(page)) return;
  sessionStorage.setItem("insight-site-language-routed", "1");
  location.replace(`${language === "zh" ? "zh-Hans" : language}/${page}`);
})();
