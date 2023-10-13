import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
  this.state = {
    username: "aaaa",
    todos: [],
    isTodoLoading: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;

    header.setState({
      isLoading: this.state.isTodoLoading,
      username: this.state.username,
    });

    todoList.setState({
      todos: this.state.todos,
      isTodoLoading: this.state.isTodoLoading,
    });
  };

  const header = new Header({
    $target,
    initialState: {
      isLoading: this.state.isTodoLoading,
      username: this.state.username,
    },
  });

  new TodoForm({
    $target,
    onSubmit: async (content) => {
      const todo = {
        content,
        isCompleted: false,
      };
      this.setState({
        ...this.state,
        todos: [...this.state.todos, todo],
      });
      await request(`/${this.state.username}`, {
        method: "POST",
        body: JSON.stringify(todo),
      });
      await fetchTodo();
    },
    // POST를 보낼때 서버가 이해할 수 있는 형식 중 하나가 json.
    // 그래서 body에 문자열로 처리된 Json을 보내기 위해 JSON.stringify
    // xml이거나 formData일수도 있다. 서버와 협의하는 부분
  });

  const todoList = new TodoList({
    $target,
    initialState: {
      todos: this.state.todos,
      isTodoLoading: this.state.isTodoLoading,
    },
    onToggle: async (id) => {
      // 낙관적 업데이트 추가
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);
      const nextTodos = [...this.state.todos];
      nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted;
      this.setState({
        ...this.state,
        todos: nextTodos,
      });

      await request(`/${this.state.username}/${id}/toggle/?delay=2000`, {
        method: "PUT",
      });
      await fetchTodo();
    },

    onRemove: async (id) => {
      // 낙관적 업데이트 추가
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);
      const nextTodos = [...this.state.todos];
      nextTodos.splice(todoIndex, 1);
      this.setState({
        ...this.state,
        todos: nextTodos,
      });

      await request(`/${this.state.username}/${id}/?delay=500`, {
        method: "DELETE",
      });
      await fetchTodo();
    },
  });

  const fetchTodo = async () => {
    const { username } = this.state;
    if (username) {
      this.setState({
        ...this.state,
        isTodoLoading: true,
      });
      const todos = await request(`/${username}?delay=1000`);
      this.setState({
        ...this.state, // 이건 {username : '', todos : []}
        todos, // [{content:, isCompleted:, _id:}. { } ]
        isTodoLoading: false,
      });
      // 그럼 이렇게는? === 됨 !
      // this.setState({
      //   username,
      //   todos,
      // });
    }
  };

  fetchTodo();
}
