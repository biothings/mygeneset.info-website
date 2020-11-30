// test if url is link to external resource (on a different domain/host)
export const isExternalLink = (url: string) => {
  try {
    return new URL(url).hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};
