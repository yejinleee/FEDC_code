// 기능 추가 3: ButtonGroup 만들기

function TimeButton({ $target, text, timer = 3000 }) {
  const button = new ToggleButton({
    $target,
    text,
    onClick: () => {
      setTimeout(() => {
        button.setState({
          ...button.state,
          toggled: !button.state.toggled,
        });
      }, timer);
    },
  });
}

function ToggleButton({ $target, text, onClick }) {
  const $button = document.createElement("button");
  $target.appendChild($button);

  this.state = {
    clickCount: 0,
    toggled: false,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $button.textContent = text;

    $button.style.textDecoration = this.state.toggled ? "line-through" : "none";
  };

  $button.addEventListener("click", () => {
    this.setState({
      clickCount: this.state.clickCount + 1,
      toggled: !this.state.toggled,
    });

    if (onClick) {
      onClick(this.state.clickCount);
    }
  });
  this.render();
}

function ButtonGroup({ $target, buttons }) {
  const $group = document.createElement("div");

  // render함수가 여러번 불릴 수 있으니까 안전하게 플래그
  let isInit = false;
  this.render = () => {
    if (!isInit) {
      buttons.forEach(({ type, ...props }) => {
        //이거 button ()안에 넣는거 아닌거 차이가 뭘까
        if (type === "toggle") {
          new ToggleButton({ $target: $group, ...props });
        } else if (type === "timer") {
          new TimeButton({ $target: $group, ...props });
        }
      });
      $target.appendChild($group);
      isInit = true;
    }
  };
  this.render();
}

const $body = document.querySelector("body");

new ButtonGroup({
  $target: $body,
  buttons: [
    {
      type: "toggle",
      text: "토글 버튼",
    },
    {
      type: "toggle",
      text: "토글 버튼",
    },
    {
      type: "timer",
      text: "타이머 버튼",
    },
  ],
});
