import { createRouter, createWebHistory } from "vue-router";
import About from "./About";
import Home from "./Home";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: About,
      meta: {
        requiredAuth: true,
      },
    },
  ],
});
