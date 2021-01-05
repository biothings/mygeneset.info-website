const { search, href: oldUrl } = window.location;

const path = new URLSearchParams(search).get("path") || "";
const newUrl = decodeURIComponent(path);

console.log("redirect", { oldUrl, newUrl });

if (newUrl) window.history.replaceState(null, null, newUrl);
