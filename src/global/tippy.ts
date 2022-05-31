import { Instance } from "tippy.js";

// cancel show if no content to show
const onShow = (instance: Instance): boolean =>
  !!String(instance.props.content).trim();

// return false to inspect popup for debugging
const onHide = (): boolean => true;

export const options = {
  directive: "tippy",
  component: "tippy",
  defaultProps: {
    delay: 100,
    duration: 200,
    offset: [13, 13],
    allowHTML: true,
    onShow,
    onHide,
  },
};

// https://github.com/KABBOUCHI/vue-tippy/issues/140
export const appendToBody = (): Element => document.body;
