import { nextTick } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import Build from "@/views/Build.vue";
import API from "@/views/API.vue";
import About from "@/views/About.vue";
import LogIn from "@/views/LogIn.vue";
import New from "@/views/New.vue";
import Geneset from "@/views/Geneset.vue";
import User from "@/views/User.vue";
import { scrollToHash } from "@/util/url.ts";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const redirect = sessionStorage.redirect;
      if (redirect) {
        console.log({ redirect });
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
    path: "/new",
    name: "New",
    component: New
  },
  {
    path: "/geneset/:id",
    name: "Geneset",
    component: Geneset
  },
  {
    path: "/user",
    name: "User",
    component: User
  }
];

const router = createRouter({
  routes
});

router.afterEach(to =>
  nextTick(() => {
    document.title = process.env.VUE_APP_TITLE + " - " + String(to.name);
    scrollToHash(to.hash);
  })
);

export default router;
