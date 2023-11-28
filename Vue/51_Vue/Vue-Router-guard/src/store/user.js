import router from "~/routes";

export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    updateLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    initialize({ commit }) {
      // context.commit 가져오는 것
      if (localStorage.getItem("isLoggedIn")) {
        commit("updateLoggedIn", true);
      }
    },
    logIn(context, payload) {
      const { id, pw } = payload;
      if (id && pw) {
        localStorage.setItem("isLoggedIn", true); // 로컬스토리지
        context.commit("updateLoggedIn", true);
        const redirect = router.currentRoute.value.query.redirect;
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      }
    },
    logOut(context) {
      localStorage.removeItem("isLoggedIn");
      context.commit("updateLoggedIn", false);
      // const requiredAuth = router.currentRoute.value.meta.requiredAuth;
      const { requiredAuth } = router.currentRoute.value.meta; //구조분해
      if (requiredAuth) {
        router.push("/");
      }
    },
  },
};
