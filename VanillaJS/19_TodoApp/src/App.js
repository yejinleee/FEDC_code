import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
  this.state = {
    username: "aaaa",
    todos: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;

    todoList.setState(this.state.todos);
  };

  new Header({
    $target,
    initialState: this.state.username,
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
      await fetchTodo(); // 말고 todoList.setState를 부르며 안되나?
    },
    // POST를 보낼때 서버가 이해할 수 있는 형식 중 하나가 json.
    // 그래서 body에 문자열로 처리된 Json을 보내기 위해 JSON.stringify
    // xml이거나 formData일수도 있다. 서버와 협의하는 부분
  });

  const todoList = new TodoList({
    $target,
    initialState: this.state.todos,
    onToggle: (id) => {
      console.log("onToggle", id);
    },
    onRemove: (id) => {
      console.log(id);
    },
  });

  const fetchTodo = async () => {
    const { username } = this.state;
    if (username) {
      const todos = await request(`/${username}?delay=3000`);
      this.setState({
        ...this.state, // 이건 {username : '', todos : []}
        todos, // [{content:, isCompleted:, _id:}. { } ]
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
