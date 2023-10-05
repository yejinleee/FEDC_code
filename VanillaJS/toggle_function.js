// ToggleButton 이라는 이름으로 추상화하기!

/*
function ToggleButton({ $target, text }) {
  const $button = document.createElement("button");
  $target.appendChild($button);
  $button.addEventListener("click", () => {
    if ($button.style.textDecoration === "line-through") {
      $button.style.textDecoration = "none";
    } else {
      $button.style.textDecoration = "line-through";
    }
  });

  this.render = () => {
    $button.textContent = text;
  };
  this.render();
}

const $body = document.querySelector("body");

new ToggleButton({
  $target: $body,
  text: "Button1",
});
new ToggleButton({
  $target: $body,
  text: "Button2",
});
new ToggleButton({
  $target: $body,
  text: "Button3",
});
*/

// isInit 플래그를 사용해서 append, 이벤트로직을 render안으로!

function ToggleButton({ $target, text }) {
  const $button = document.createElement("button");
  let isInit = false;
  this.render = () => {
    $button.textContent = text;

    if (!isInit) {
      $target.appendChild($button);
      $button.addEventListener("click", () => {
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
});
const btn2 = new ToggleButton({
  $target: $body,
  text: "Button2",
});
const btn3 = new ToggleButton({
  $target: $body,
  text: "Button3",
});
