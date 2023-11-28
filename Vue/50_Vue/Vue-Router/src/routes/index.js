import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import About from "./About";
import Docs from "./Docs";
import DocsId from "./DocsId";
import NotFound from "./NotFound";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/documents",
      component: Docs,
    },
    {
      path: "/documents/:id",
      component: DocsId,
      name: "docsId",
    },
    // 하위로 지정해줄 수도 있음, 단 상,하위 둘다 출력됨
    // {
    //   path: "/documents",
    //   component: Docs,
    //   children: [
    //     {
    //       path: ":id", // 슬래쉬사용 XX
    //       component: DocsId,
    //     },
    //   ],
    // },

    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});
