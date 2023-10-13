const body = document.querySelector("body");

const btn1 = document.createElement("button");
btn1.textContent = "Button 1";

const btn2 = document.createElement("button");
btn2.textContent = "Button 2";

const btn3 = document.createElement("button");
btn3.textContent = "Button 3";

body.appendChild(btn1);
body.appendChild(btn2);
body.appendChild(btn3);

//명령형으로 한다면
/*
btn1.addEventListener("click", () => {
  if (btn1.style.textDecoration === "line-through") {
    btn1.style.textDecoration = "none";
  } else {
    btn1.style.textDecoration = "line-through";
  }
});
btn2.addEventListener("click", () => {
  if (btn2.style.textDecoration === "line-through") {
    btn2.style.textDecoration = "none";
  } else {
    btn2.style.textDecoration = "line-through";
  }
});
btn3.addEventListener("click", () => {
  if (btn3.style.textDecoration === "line-through") {
    btn3.style.textDecoration = "none";
  } else {
    btn3.style.textDecoration = "line-through";
  }
});
*/

// 선언형
// document.querySelectorAll("button").forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     const { target } = e;
//     if (target.style.textDecoration === "line-through") {
//       target.style.textDecoration = "none";
//     } else {
//       target.style.textDecoration = "line-through";
//     }
//   });
// });

// 취소선 기능 꺼내기
const toggleButton = (btn) => {
  if (btn.style.textDecoration === "line-through") {
    btn.style.textDecoration = "none";
  } else {
    btn.style.textDecoration = "line-through";
  }
};
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const { target } = e;
    toggleButton(target);
  });
});
