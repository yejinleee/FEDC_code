import TodoList from "./TodoList.js";
import TodoComments from "./TodoComments.js";
import { request } from "./api.js";

export default function App({ $app }) {
  this.state = {
    todos: [],
    selectedTodo: null,
    comments: [],
  };
  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todos);
    todoComments.setState({
      selectedTodo: this.state.selectedTodo,
      comments: this.state.comments,
    });
  };

  const todoList = new TodoList({
    $target: $app,
    initialState: this.todos,
    onClick: (id) => {
      const selectedTodo = this.state.todos.find((todo) => todo.id === id);
      this.setState({
        ...this.state,
        selectedTodo,
      });
      request(
        `https://kdt-frontend.programmers.co.kr/comments?todo.id=${id}`
      ).then((comments) => {
        this.setState({ ...this.state, comments });
      });
    },
  });

  const todoComments = new TodoComments({
    $target: $app,
    initialState: {
      selectedTodo: this.state.selectedTodo,
      comments: this.state.comments,
    },
  });

  // todos 불러오기
  this.init = () => {
    request("https://kdt-frontend.programmers.co.kr/todos").then((todos) => {
      this.setState({ ...this.state, todos });
    });
  };
  this.init();
}

/////////////////// async await를 이용했다면,

/*
const init = async () => {
  const todos = await request("https://kdt-frontend.programmers.co.kr/todos");
  this.setState({ ...this.state, todos });
};

const todoList = new TodoList({
  $target: $app,
  initialState: this.todos,
  onClick: async (id) => {
    const selectedTodo = this.state.todos.find((todo) => todo.id === id);
    this.setState({
      ...this.state,
      selectedTodo,
    });
    try {
      const comments = await request(
        `https://kdt-frontend.programmers.co.kr/comments?todo.id=${id}`
      );
      this.setState({ ...this.state, comments });
    } catch (e) {
      console.log(e);
    } finally {
      // promise의 .finally와 비슷한 역할
      // 로딩중 숨겨주는 처리 등
    }
  },
});
*/
