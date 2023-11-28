import { createRouter, createWebHistory } from "vue-router";
import About from "./About";
import Home from "./Home";
import LogIn from "./LogIn";

export default createRouter({
  history: createWebHistory(),
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
    {
      path: "/login",
      component: LogIn,
    },
  ],
});
