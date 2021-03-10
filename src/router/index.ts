import { nextTick } from "vue";
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  NavigationGuard
} from "vue-router";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import Build from "@/views/Build.vue";
import API from "@/views/API.vue";
import About from "@/views/About.vue";
import LogIn from "@/views/LogIn.vue";
import Geneset from "@/views/Geneset.vue";
import User from "@/views/User.vue";
import { scrollToHash } from "@/util/url";

// handle redirect from 404
const handleRedirect: NavigationGuard = (to, from, next) => {
  // check for redirect storage flag
  const redirect = sessionStorage.redirect;
  if (redirect) {
    console.info({ redirect });
    // route to redirect location instead
    next(redirect);
    // remove redirect storage flag
    delete sessionStorage.redirect;
  } else {
    // otherwise, proceed as normal
    next();
  }
};

// routes
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: handleRedirect
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
    name: "New Geneset",
    component: Geneset
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

// create router object for vue router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// update tab title after each navigation
router.afterEach(to =>
  nextTick(() => {
    document.title = process.env.VUE_APP_TITLE + " - " + String(to.name);
    scrollToHash(to.hash);
  })
);

export default router;
