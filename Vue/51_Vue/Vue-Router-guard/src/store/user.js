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
    logIn(context, payload) {
      const { id, pw } = payload;
      if (id && pw) {
        context.commit("updateLoggedIn", true);
      }
    },
    logOut(context) {
      context.commit("updateLoggedIn", false);
    },
  },
};
