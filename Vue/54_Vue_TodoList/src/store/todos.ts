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
type FilterStatus = 'all' | 'todo' | 'done';
type Filters = Filter[];
interface Filter {
  label: string;
  name: FilterStatus;
}
interface CreateTodoPayload {
  title: string;
}

const filters: Filters = [
  {
    label: '전체',
    name: 'all',
  },
  {
    label: '할 일만',
    name: 'todo',
  },
  {
    label: '완료만',
    name: 'done',
  },
];
export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todos,
    filterStatus: 'all' as FilterStatus,
    filters,
  }),
  getters: {
    filteredTodos(state) {
      //매개변수로 state 제공
      return state.todos.filter((todo) => {
        switch (state.filterStatus) {
          case 'todo':
            return !todo.done; //done이 false가 아닌, 즉 true인 애들로 filter한다는 뜻
          case 'done':
            return todo.done;
          case 'all':
          default:
            return true;
        }
      });
    },
  },
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
      const foundTodo = this.todos.find((t) => t.id === todo.id); // 바꿀 todo를 찾고 '로컬'의 데이터를 먼저! 갱신함
      if (!foundTodo) return;
      const backedUpTodo = { ...foundTodo };
      Object.assign(foundTodo, todo);

      try {
        const { id, title, done } = todo;
        const { data: updatedTodo } = await axios.post(`/api/todos`, {
          method: 'PUT',
          path: id,
          data: {
            title,
            done,
          },
        });
      } catch (err) {
        console.error('updateTodo', err);
        // 서버에서 갱신이 실패했을 경우 로컬도 돌려야 하기 때문에 Try-catch
        Object.assign(foundTodo, backedUpTodo); // 백업해둔걸로 복귀
      }
    },
    updateCheckboxes(done: boolean) {
      // 여기선 async X 병렬로 요청
      this.todos.forEach((todo) => {
        this.updateTodo({
          ...todo,
          done,
        });
      });
    },
    async deleteDoneTodos() {
      //일괄 삭제
      const todoIds = this.todos
        .filter((todo) => todo.done)
        .map((todo) => todo.id);
      if (!todoIds.length) return;
      try {
        await axios.post('/api/todos', {
          method: 'DELETE',
          path: 'deletions',
          data: {
            todoIds,
          },
        });
        // 로컬데이터 갱신
        this.todos = this.todos.filter((todo) => !todoIds.includes(todo.id)); //삭제 안할! 애들로 배열 갱신인까 !붙임
      } catch (err) {
        console.error('deleteDoneTodos', err);
      }
    },
  },
});
