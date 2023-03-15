// test if url is link to external resource (on a different domain/host)
export const isExternalLink = (url = "") =>
  url.startsWith("mailto:") ||
  url.startsWith("https:") ||
  url.startsWith("http:");
