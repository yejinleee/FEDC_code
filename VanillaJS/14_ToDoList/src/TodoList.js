// params.$target : 해당 컴포넌트가 추가될 DOM요소
// params.initialState: 해당 컴포넌트 초기 상태
export default function TodoList({ $target, initialState }) {
  const $todoList = document.createElement("div");
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = `
    <ul>
        ${this.state
          .map(
            ({ text }) => `<li>
        ${text}</li>`
          )
          .join("")}
    </ul>`;
  };

  this.render();
}

function TodoEach({ $target, text }) {
  const $todo = document.createElement("div");
  const $todoText = document.createElement("span");
  const $completeButton = document.createElement("button");

  this.state = {
    isCompleted: false,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todoText.textContent = text;
    $completeButton.textContent = "Done!";
    $todoText.style.textDecoration = this.state.isCompleted
      ? "line-through"
      : "none";

    $todoText.addEventListener("click", () => {
      this.setState({
        isCompleted: !this.state.isCompleted,
      });
    });
  };
  this.render();

  $todo.appendChild($todoText);
  $todo.appendChild($completeButton);
  $target.appendChild($todo);
}
