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
const open = (element: HTMLElement, value: string, slow?: boolean) => {
  const delay = slow ? 750 : 250;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    if (popper) popper.destroy();
    popper = createPopper(element, tooltip, options);
    tooltip.dataset.show = "true";
    tooltip.innerHTML = value;
  }, delay);
};

// close tooltip
const close = () => {
  window.clearTimeout(timer);
  tooltip.dataset.show = "false";
};

// create directive
const directive = {
  mounted(
    element: HTMLElement,
    { value, modifiers }: { value: string; modifiers: { slow?: boolean } }
  ) {
    const { slow } = modifiers;
    element.addEventListener("mouseenter", () => open(element, value, slow));
    element.addEventListener("focus", () => open(element, value, slow));
    element.addEventListener("mouseleave", close);
    element.addEventListener("blur", close);
    element.setAttribute("aria-label", value);
  },
  beforeUnmount(element: HTMLElement, { value }: { value: string }) {
    element.removeEventListener("mouseenter", () => open(element, value));
    element.removeEventListener("focus", () => open(element, value));
    element.removeEventListener("mouseleave", close);
    element.removeEventListener("blur", close);
    close();
  }
};

export { directive };
