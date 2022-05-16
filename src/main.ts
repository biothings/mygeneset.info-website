import { createApp } from "vue";
import { setupWorker } from "msw";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { directive } from "@/util/tooltip";
import vueDebounce from "vue-debounce";
import { handlers } from "../tests/fixtures";

createApp(App)
  .directive("tooltip", directive)
  .use(store)
  .use(vueDebounce)
  .use(router)
  .mount("#app");

if (process.env.NODE_ENV === "development") setupWorker(...handlers).start();
