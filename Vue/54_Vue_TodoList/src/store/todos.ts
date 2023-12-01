import axios from 'axios';
import { defineStore } from 'pinia';

export type Todos = Todo[]; // 할 일 목록
export interface Todo {
  // 각 할 일
  id: string; // 할 일 ID
  order: number; // 할 일 순서
  title: string; // 할 일 제목
  done: boolean; // 할 일 완료 여부
  createdAt: string; // 할 일 생성일
  updatedAt: string; // 할 일 수정일
}

interface CreateTodoPayload {
  title: string;
}

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todos,
  }),
  getters: {},
  actions: {
    async fetchTodos() {
      const { data } = await axios.post('/api/todos', {});
      this.todos = data;
    },
    async createTodo({ title }: CreateTodoPayload) {
      try {
        const { data: createdTodo } = await axios.post('/api/todos', {
          method: 'POST',
          data: {
            title,
          },
        });
        this.todos.unshift(createdTodo); // 맨앞으로 넣음
      } catch (err) {
        console.error('createTodo', err);
      }
    },
    async updateTodo(todo: Todo) {
      const { id, title, done } = todo;
      const { data: updatedTodo } = await axios.post(`/api/todos`, {
        method: 'PUT',
        path: id,
        data: {
          title,
          done,
        },
      });
      const foundTodo = this.todos.find((t) => t.id === todo.id);
      if (foundTodo) {
        Object.assign(foundTodo, updatedTodo);
      }
    },
  },
});
