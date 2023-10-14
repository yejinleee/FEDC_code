import Header from "./Header.js";
import UserList from "./UserList.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { request } from "./api.js";
import { parse } from "./querystring.js";

export default function App({ $target }) {
  const $userListContainer = document.createElement("div");
  const $todoListContainer = document.createElement("div");

  $target.appendChild($userListContainer);
  $target.appendChild($todoListContainer);

  this.state = {
    userList: [],
    selectedUsername: null,
    todos: [],
    isTodoLoading: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;

    header.setState({
      isLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
    });

    todoList.setState({
      todos: this.state.todos,
      isTodoLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
    });

    userList.setState(this.state.userList);

    this.render();
  };

  this.render = () => {
    const { selectedUsername } = this.state;
    $todoListContainer.style.display = selectedUsername ? "block" : "none";
  };

  const userList = new UserList({
    $target: $userListContainer,
    initialState: this.state.userList,
    onSelect: async (username) => {
      history.pushState(null, null, `/?selectedUsername=${username}`);
      this.setState({
        ...this.state,
        selectedUsername: username,
      });
      await fetchTodos();
    },
  });

  const header = new Header({
    $target: $todoListContainer,
    initialState: {
      isLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
    },
  });

  new TodoForm({
    $target: $todoListContainer,
    onSubmit: async (content) => {
      const isFirstTodoAdd = this.state.todos.length === 0; //아래 낙관적 업데이트보다 먼저 실행해야함

      const todo = {
        content,
        isCompleted: false,
      };
      this.setState({
        ...this.state,
        todos: [...this.state.todos, todo],
      });

      await request(`/${this.state.selectedUsername}`, {
        method: "POST",
        body: JSON.stringify(todo),
      });
      await fetchTodos();

      if (isFirstTodoAdd) {
        await fetchUserList();
      }
    },
    // POST를 보낼때 서버가 이해할 수 있는 형식 중 하나가 json.
    // 그래서 body에 문자열로 처리된 Json을 보내기 위해 JSON.stringify
    // xml이거나 formData일수도 있다. 서버와 협의하는 부분
  });

  const todoList = new TodoList({
    $target: $todoListContainer,
    initialState: {
      todos: this.state.todos,
      isTodoLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
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

      await request(`/${this.state.selectedUsername}/${id}/toggle`, {
        method: "PUT",
      });
      await fetchTodos();
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

      await request(`/${this.state.selectedUsername}/${id}`, {
        method: "DELETE",
      });
      await fetchTodos();
    },
  });

  const fetchUserList = async () => {
    const userList = await request("/users");
    this.setState({
      ...this.state,
      userList,
    });
  };

  const fetchTodos = async () => {
    const { selectedUsername } = this.state;
    if (selectedUsername) {
      this.setState({
        ...this.state,
        isTodoLoading: true,
      });
      const todos = await request(`/${selectedUsername}`);
      console.log(todos);
      this.setState({
        ...this.state, // 이건 {selectedUsername : '', todos : []}
        todos, // [{content:, isCompleted:, _id:}. { } ]
        isTodoLoading: false,
      });
      // 그럼 이렇게는? === 됨 !
      // this.setState({
      //   selectedUsername,
      //   todos,
      // });
    }
  };

  // 원랜 이렇게
  // fetchUserList(); // 지금 상태에선 await 못붙인다. App에 async없어서. 지금은 호출하고 후작업 없이 끝이라 괜찮지만 묶어두는게 좋을듯
  // fetchTodos(); // 이거 또한 이젠 처음부터 부를 필요가 없다.

  const init = async () => {
    await fetchUserList();

    const { search } = location;
    if (search.length > 0) {
      const { selectedUsername } = parse(search.substring(1));

      if (selectedUsername) {
        this.setState({
          ...this.state,
          selectedUsername: selectedUsername,
        });
      }
    }
    await fetchTodos();
  };

  this.render();
  init();

  window /
    addEventListener("popstate", () => {
      init();
    });
}
