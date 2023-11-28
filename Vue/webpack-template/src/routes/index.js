import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }), // 일반함수 형태도 가능인데, 화살표함수로가 더 간결
  routes: [
    {
      path: "/",
      component: Home,
    },
  ],
});
