// 기능 추가 2 :  ToggleButton 외에 5초 뒤에 자동 토글되는 버튼

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

const $body = document.querySelector("body");

const btn1 = new ToggleButton({
  $target: $body,
  text: "Button1",
  onClick: (count) => {
    // 이렇게 추가
    if (count === 3) {
      alert("세번!");
    }
  },
});
const btn2 = new ToggleButton({
  $target: $body,
  text: "Button2",
  onClick: (count) => {
    if (count % 2 === 0) {
      // 확장도 가능
      alert("두번씩");
    }
  },
});
const btn3 = new ToggleButton({
  $target: $body,
  text: "Button3",
});

new TimeButton({
  $target: $body,
  text: "3초뒤",
});
