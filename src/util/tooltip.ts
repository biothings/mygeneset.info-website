// tooltip directive
// e.g. v-tooltip="Tooltip text" or v-tooltip.slow="Tooltip text"

import { createPopper } from "@popperjs/core";
import { Options } from "@popperjs/core";

// tooltip DOM element
const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.append(tooltip);

// popper.js instance and options
let popper: ReturnType<typeof createPopper>;
const options: Options = {
  strategy: "absolute",
  placement: "top",
  modifiers: [
    // https://github.com/popperjs/popper-core/issues/1138
    { name: "computeStyles", options: { adaptive: false } },
    { name: "offset", options: { offset: [0, 10] } }
  ]
};

// open tooltip
let timer: ReturnType<typeof setTimeout>;
const open = (event: Event) => {
  // get tooltip modifiers and values
  const target = event.target as Element;
  const delay = target.getAttribute("data-tooltip-slow") === "true" ? 750 : 250;
  const text = target.getAttribute("data-tooltip-text") || "";

  // don't show if no text
  if (!text) return;

  // clear any running delay timer
  window.clearTimeout(timer);

  // open tooltip after delay
  timer = window.setTimeout(() => {
    // remove any previous popper instance
    if (popper) popper.destroy();
    // new popper instance
    popper = createPopper(target, tooltip, options);
    // set tooltip element props
    tooltip.dataset.show = "true";
    tooltip.innerHTML = text;
  }, delay);
};

// close tooltip
const close = () => {
  // stop any running delay timer
  window.clearTimeout(timer);
  // hide tooltip element
  tooltip.dataset.show = "false";
};

// attach event listeners to element
function attach(
  element: HTMLElement,
  {
    value,
    modifiers: { slow }
  }: { value: string; modifiers: { slow?: boolean } }
) {
  // add hover/focus listeners to target
  element.addEventListener("mouseenter", open);
  element.addEventListener("focus", open);
  element.addEventListener("mouseleave", close);
  element.addEventListener("blur", close);
  // transfer directive value and modifiers to element
  element.setAttribute("data-tooltip-text", value);
  element.setAttribute("data-tooltip-slow", slow ? "true" : "false");
  element.setAttribute("aria-label", value);
}

// detach event listeners from element
const detach = (element: HTMLElement) => {
  // remove hover/focus listeners from target
  element.removeEventListener("mouseenter", open);
  element.removeEventListener("focus", open);
  element.removeEventListener("mouseleave", close);
  element.removeEventListener("blur", close);
  // remove directive value and modifiers from element
  element.removeAttribute("data-tooltip-text");
  element.removeAttribute("data-tooltip-slow");
  element.removeAttribute("aria-label");
  close();
};

// create directive
const directive = {
  mounted: attach,
  beforeUpdate: detach,
  updated: attach,
  beforeUnmount: detach
};

export { directive };
