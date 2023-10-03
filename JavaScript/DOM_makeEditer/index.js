/*
document.querySelector(".bold").addEventListener("click", () => {
  document.execCommand("bold");
});
document.querySelector(".italic").addEventListener("click", () => {
  document.execCommand("italic");
});

document.querySelector(".align-left").addEventListener("click", () => {
  document.execCommand("justifyLeft");
});
document.querySelector(".align-center").addEventListener("click", () => {
  document.execCommand("justifyCenter");
});

document.querySelector(".align-right").addEventListener("click", () => {
  document.execCommand("justifyRight");
});
*/

// 위 처럼 커맨드 만들때마다 요소찾는걸 매번 추가하지 않도록 태그에 data-command 속성을 추가했다.
(() => {
  document.querySelectorAll(".toolbar button").forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const command = e.target.getAttribute("data-command");
      if (command == "BackColor") {
        document.execCommand(command, false, "ffffb4");
      }
      document.execCommand(command);
    });
  });
})();
