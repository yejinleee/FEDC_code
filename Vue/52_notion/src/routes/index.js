import { createRouter, createWebHistory } from "vue-router";
import Workspace from "./Workspace";
import NotFound from "./NotFound";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }), // 일반함수 형태도 가능인데, 화살표함수로가 더 간결
  routes: [
    {
      path: "/",
      component: Workspace,
      children: [
        {
          name: "Workspace",
          path: "workspaces/:id",
          component: Workspace,
        },
      ],
    },
    {
      path: "/:notFound(.*)", // 위의 '/'경로 제외 모두 해당
      component: NotFound,
    },
  ],
});
