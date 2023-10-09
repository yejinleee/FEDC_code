// params.$target : 해당 컴포넌트가 추가될 DOM요소
// params.initialState: 해당 컴포넌트 초기 상태
export function TodoList({ $target, initialState }) {
  const $todoList = document.createElement("div");
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todoList.replaceChildren(); //// 투두를 추가해서 새로 렌더링될때 이전값에 추가로 전부다 생기니까 한번 리셋하고 전체를 그린다

    // 실행하면 현재 상태를 기준으로 컴포넌트를 렌더링하는 동작
    this.state.map(({ text, isCompleted }) => {
      // console.log(text);
      new TodoEach({ $target: $todoList, text });

      /// 이거 그냥 $todoList 넘기며 안되고 $target: $todoList, 이렇게 키벨류 줘라.
    });
    // $todoList.innerHTML = `
    // <ul>
    //     ${this.state
    //       .map(
    //         ({ todo, isCompleted }) => `<li>
    //     ${todo.text}</li>`
    //       )
    //       .join("")}
    // </ul>`;
  };

  this.render();
}

export function TodoEach({ $target, text }) {
  // console.log("tt", $target);
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
