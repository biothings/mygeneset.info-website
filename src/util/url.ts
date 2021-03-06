// test if url is link to external resource (on a different domain/host)
export const isExternalLink = (url = "") => {
  if (url.includes("mailto:")) return true;
  try {
    return new URL(url).hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};

// scroll hash target into view
export const scrollToHash = (hash = "") => {
  if (!hash) return;
  let target = document.querySelector(hash);
  if (!target) return;

  // move target from heading to parent section if first child
  if (target.matches(":first-child")) {
    const section = target.closest("section");
    if (section) {
      section.id = target.id;
      target.removeAttribute("id");
      target = section;
    }
  }

  target.scrollIntoView();
};
