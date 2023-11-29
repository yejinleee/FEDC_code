import router from "~/routes";

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {},
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
    async createWorkspace({ dispatch }, payload = {}) {
      // 최상의 목록은 parentId가 없기 때문에 undefined가 넘어온다. 이때 디폴트로 {}처리
      const { parentId } = payload;
      const workspace = await _request({
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: parentId,
        }),
      });
      await dispatch("readWorkspaces");
      router.push({
        name: "Workspace",
        params: {
          id: workspace.id,
        },
      });
    },
    async readWorkspaces({ commit, dispatch }) {
      //전체목록
      const workspaces = await _request({
        method: "GET",
      });
      commit("assignState", { workspaces });
      if (workspaces.length === 0) {
        dispatch("createWorkspace");
      }
    },
    async readWorkspace({ commit }, payload) {
      //개별
      const { id } = payload;
      try {
        const workspace = await _request({
          id,
          method: "GET",
        });
        commit("assignState", {
          currentWorkspace: workspace,
        });
      } catch (error) {
        router.push("/error");
      }
    },
    async updateWorkspace({ dispatch }, payload) {
      const { id, title, content } = payload;
      await _request({
        id,
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });
      dispatch("readWorkspaces");
    },
    async deleteWorkspace({ state, dispatch }, payload) {
      const { id } = payload;
      await _request({
        id,
        method: "DELETE",
      });
      await dispatch("readWorkspaces");
      if (id === parseInt(router.currentRoute.value.params.id, 10)) {
        router.push({
          name: "Workspace",
          params: {
            id: state.workspaces[0].id, // context를 구조분해해서 가져온 state임!
          },
        });
      }
    },
  },
};

// function은 호이스팅에 의해 맨 위에서 선언됨
// 실제로도 맨 위에 해도 되긴 하지만, 다른 중요한게 밀리게 되니까..
async function _request(options) {
  const { id = "" } = options; //undefined인경우 방어를 위한 ''
  return await fetch(`https://kdt-frontend.programmers.co.kr/documents/${id}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-username": "yejin",
    },
  }).then((res) => res.json());
}
