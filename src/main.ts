import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { directive } from "@/util/tooltip.ts";
import vueDebounce from "vue-debounce";

createApp(App)
  .directive("tooltip", directive)
  .use(store)
  .use(vueDebounce)
  .use(router)
  .mount("#app");
