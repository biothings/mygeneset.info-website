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
  const target = event.target as Element;
  const delay = target.getAttribute("data-tooltip-slow") === "true" ? 750 : 250;
  const text = target.getAttribute("data-tooltip-text") || "";
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    if (popper) popper.destroy();
    popper = createPopper(target, tooltip, options);
    tooltip.dataset.show = "true";
    tooltip.innerHTML = text;
  }, delay);
};

// close tooltip
const close = () => {
  window.clearTimeout(timer);
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
  element.addEventListener("mouseenter", open);
  element.addEventListener("focus", open);
  element.addEventListener("mouseleave", close);
  element.addEventListener("blur", close);
  element.setAttribute("data-tooltip-text", value);
  element.setAttribute("data-tooltip-slow", slow ? "true" : "false");
  element.setAttribute("aria-label", value);
}

// detach event listeners from element
const detach = (element: HTMLElement) => {
  element.removeEventListener("mouseenter", open);
  element.removeEventListener("focus", open);
  element.removeEventListener("mouseleave", close);
  element.removeEventListener("blur", close);
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
