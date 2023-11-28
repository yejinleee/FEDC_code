import router from "./index";
import store from "~/store";
// 전역실행됨
router.beforeEach((to) => {
  // next 놉
  console.log(to);
  if (to.meta.requiredAuth && !store.state.user.isLoggedIn) {
    return {
      path: "/login",
      query: { redirect: to.fullPath }, // 로그인 이후 다시 돌아기 위해 지금 주소 보내주는 것
    };
  }
});
