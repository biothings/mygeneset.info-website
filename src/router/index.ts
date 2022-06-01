import { waitFor } from "./../util/dom";
import { nextTick } from "vue";
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  NavigationGuard,
  RouterScrollBehavior,
} from "vue-router";
import PageHome from "@/views/PageHome.vue";
// import Browse from "@/views/Browse.vue";
// import Build from "@/views/Build.vue";
import PageApi from "@/views/PageApi.vue";
import PageAbout from "@/views/PageAbout.vue";
import PageLogin from "@/views/PageLogin.vue";
import PageUser from "@/views/PageUser.vue";
// import Geneset from "@/views/Geneset.vue";

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
    component: PageHome,
    beforeEnter: handleRedirect,
  },
  // {
  //   path: "/browse",
  //   name: "Browse",
  //   component: Browse,
  // },
  // {
  //   path: "/build",
  //   name: "Build",
  //   component: Build,
  // },
  {
    path: "/api",
    name: "API",
    component: PageApi,
  },
  {
    path: "/about",
    name: "About",
    component: PageAbout,
  },
  {
    path: "/login",
    name: "Log In",
    component: PageLogin,
  },
  {
    path: "/user",
    name: "User",
    component: PageUser,
  },
  // {
  //   path: "/new",
  //   name: "New Geneset",
  //   component: Geneset,
  // },
  // {
  //   path: "/geneset/:id",
  //   name: "Geneset",
  //   component: Geneset,
  // },
];

// vue-router's scroll behavior handler
const scrollBehavior: RouterScrollBehavior = async (
  to,
  from,
  savedPosition
) => {
  // scroll to element corresponding to hash
  const element = await waitFor(to.hash);
  if (element) return { el: getTarget(element), behavior: "smooth" };

  // scroll to previous position if exists
  if (savedPosition?.left || savedPosition?.top) return savedPosition;
};

// given element, get (possibly) modified target
const getTarget = (element: Element): Element => {
  // move target to parent section element if first child
  if (
    element.parentElement?.tagName === "SECTION" &&
    element.matches(":first-child")
  )
    return element.parentElement;

  return element;
};

// navigation history object
const history = createWebHistory(process.env.BASE_URL);

// router object
const router = createRouter({
  history,
  routes,
  scrollBehavior,
});

// update tab title after each navigation
router.afterEach(async ({ name }) => {
  // https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  await nextTick();

  document.title = process.env.VUE_APP_TITLE + " - " + String(name);
});

export default router;
