import { nextTick } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import Build from "@/views/Build.vue";
import API from "@/views/API.vue";
import About from "@/views/About.vue";
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";
import Guest from "@/views/Guest.vue";
import { scrollToHash } from "@/util/url.ts";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
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
    path: "/signup",
    name: "Sign Up",
    component: SignUp
  },
  {
    path: "/guest",
    name: "Guest",
    component: Guest
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const title = "My Geneset";

router.afterEach(to =>
  nextTick(() => {
    document.title = title + " - " + String(to.name);
    scrollToHash(to.hash);
  })
);

export default router;