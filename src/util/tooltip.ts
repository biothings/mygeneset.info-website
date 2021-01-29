import { createPopper } from "@popperjs/core";
import { Options } from "@popperjs/core";

const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.append(tooltip);

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

const delay = 200;
let timer: ReturnType<typeof setTimeout>;
const open = (element: HTMLElement, value: string) => {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    if (popper) popper.destroy();
    popper = createPopper(element, tooltip, options);
    tooltip.dataset.show = "true";
    tooltip.innerHTML = value;
  }, delay);
};

const close = () => {
  window.clearTimeout(timer);
  tooltip.dataset.show = "false";
};

const directive = {
  mounted(element: HTMLElement, { value }: { value: string }) {
    element.addEventListener("mouseenter", () => open(element, value));
    element.addEventListener("focus", () => open(element, value));
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
