import { nextTick } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import Build from "@/views/Build.vue";
import API from "@/views/API.vue";
import About from "@/views/About.vue";
import LogIn from "@/views/LogIn.vue";
import Guest from "@/views/Guest.vue";
import New from "@/views/New.vue";
import { scrollToHash } from "@/util/url.ts";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      let redirect = sessionStorage.redirect;
      if (redirect) {
        console.log({ redirect });
        redirect = redirect.replace(process.env.BASE_URL, "");
        next(redirect);
        delete sessionStorage.redirect;
      } else {
        next();
      }
    }
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse
  },
  {
    path: "/build",
    name: "Build",
    component: Build
  },
  {
    path: "/api",
    name: "API",
    component: API
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/login",
    name: "Log In",
    component: LogIn
  },
  {
    path: "/guest",
    name: "Guest",
    component: Guest
  },
  {
    path: "/new",
    name: "New",
    component: New
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.afterEach(to =>
  nextTick(() => {
    document.title = process.env.VUE_APP_TITLE + " - " + String(to.name);
    scrollToHash(to.hash);
  })
);

export default router;
