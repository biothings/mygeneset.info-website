import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { directive } from "@/util/tooltip.ts";

createApp(App)
  .directive("tooltip", directive)
  .use(store)
  .use(router)
  .mount("#app");
