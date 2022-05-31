import { createApp, Component } from "vue";
import { setupWorker } from "msw";
import App from "@/App.vue";
import components from "@/global/components";
import plugins from "@/global/plugins";
import { handlers } from "../tests/fixtures";

// create main app object
let app = createApp(App);

// register plugins/middleware
for (const [plugin, options] of plugins) app = app.use(plugin, options);

// register global components
for (const [name, component] of Object.entries(components))
  app = app.component(name, component as Component);

// run app
(async () => {
  // use mock api calls when developing locally, like we do during tests
  if (process.env.NODE_ENV === "development")
    await setupWorker(...handlers).start({ onUnhandledRequest: "bypass" });
  // wait to mount app so we can catch immediate requests

  // render app
  app.mount("#app");
})();
