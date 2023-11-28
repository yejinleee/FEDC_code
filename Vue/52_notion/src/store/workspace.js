export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
    };
  },
  getters: {},
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]; // payload가 {workspaces: workspaces}로 오니까 key가 workspaces가 됨
      });
    },
  },
  actions: {
    createWorkspace() {},
    async readWorkspaces({ commit }) {
      const workspaces = await fetch(
        "https://kdt-frontend.programmers.co.kr/documents",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-username": "yejin",
          },
        }
      ).then((res) => res.json());
      commit("assignState", { workspaces });
      console.log(workspaces);
    },
    updateWorkspace() {},
    deleteWorkspace() {},
  },
};
