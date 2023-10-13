export default function TodoList({
  $target,
  initialState,
  onToggle,
  onRemove,
}) {
  const $todo = document.createElement("div");

  $target.appendChild($todo);

  this.state = initialState;
  // 투두들을 가진 배열

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    if (this.state.length === 0) {
      $todo.innerHTML = "할일이 없습니다.";
      return;
    }
    $todo.innerHTML = `
      <ul>
      ${this.state
        .map(
          ({ _id, content, isCompleted }) => `
      <li data-id = "${_id}" class="todo-item">
      ${isCompleted ? `<s>${content}</s>` : content}
        <button class="remove">X</button>
      </li>
      `
        )
        .join("")}
      </ul>
    `;
  };

  //
  $todo.addEventListener("click", (e) => {
    // 실제 이벤트를 발생시킨 곳을 찾기 위해선 e.target
    const $li = e.target.closest("li"); // 현재기준 가장 가까운 li를 찾아줌
    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;
      console.log($li, className);
      if (className === "remove") {
        onRemove(id);
      } else {
        // 여기서 class-name === "todo-item"임을 다시 확인할 필요가 없다.
        onToggle(id);
      }
    }
  });

  this.render();
}
