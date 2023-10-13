// 기능 추가 1 :  3번 클릭할 때마다 alert 띄우기

//// + 특정 버튼에만 기능을 추가하고 싶으면 ??

function ToggleButton({ $target, text, onClick }) {
  const $button = document.createElement("button");
  let isInit = false;
  let count = 0;
  this.render = () => {
    $button.textContent = text;

    if (!isInit) {
      $target.appendChild($button);
      $button.addEventListener("click", () => {
        count++;
        if (onClick) {
          onClick(count);
        }
        if ($button.style.textDecoration === "line-through") {
          $button.style.textDecoration = "none";
        } else {
          $button.style.textDecoration = "line-through";
        }
      });
      isInit = true;
    }
  };
  this.render();
}

const $body = document.querySelector("body");

const btn1 = new ToggleButton({
  $target: $body,
  text: "Button1",
  onClick: (count) => {
    // 이렇게 추가
    if (count % 3 === 0) {
      alert(`세번, ${count}`);
    }
  },
});
const btn2 = new ToggleButton({
  $target: $body,
  text: "Button2",
  onClick: (count) => {
    if (count % 2 === 0) {
      // 확장도 가능
      alert(`두번, ${count}`);
    }
  },
});
const btn3 = new ToggleButton({
  $target: $body,
  text: "Button3",
});
