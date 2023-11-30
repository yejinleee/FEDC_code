import { defineStore } from 'pinia';

export const useTodosStore = defineStore('todos', {
  // 이게 state() { } 도 되는거여싼 ?
  state: () => ({}),
  getters: {},
  actions: {
    createTodo() {},
  },
});
