/* Local language routing only: no content is sent to a translation service. */
(() => {
  const locale = (navigator.language || "en").toLowerCase();
  if (!locale.startsWith("fr") || sessionStorage.getItem("insight-site-language-routed")) return;
  const page = location.pathname.split("/").pop() || "index.html";
  const pages = new Set(["index.html", "privacy.html", "terms.html", "community-guidelines.html", "support.html", "account-deletion.html"]);
  if (!pages.has(page)) return;
  sessionStorage.setItem("insight-site-language-routed", "1");
  location.replace(`fr/${page}`);
})();
