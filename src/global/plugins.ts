import { Plugin } from "vue";
import router from "@/router";
import store, { key } from "@/store";
import tippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/border.css";
import { options } from "./tippy";

// list of global plugins and their options
const plugins: Array<[Plugin, unknown]> = [
  [router, {}],
  [store, key],
  [tippy, options],
];

export default plugins;
