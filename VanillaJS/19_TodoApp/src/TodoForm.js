export default function TodoForm({ $target, onSubmit }) {
  const $form = document.createElement("form");

  $target.appendChild($form);

  //this.state를 두면 서버와 통신중일때 ui를 막는 효과를 줄 수있다.
  //이런 블로킹을 최소화 하면서 this.state 없이도 서버와의 통신도 문제없이 하는 방법을 알아보자.
  // this.state = {
  //   content: "",
  // };

  this.render = () => {
    $form.innerHTML = `
      <input type="text" placeholder="할일을 입력하세요" />
      <button>추가</button>
    `; // button의 경우 디폴트type이 submit 입니다.  다른 용도의 경우 type="button" 등 명시
  };

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const $input = document.querySelector("input");
    const content = $input.value;

    onSubmit(content);
    $input.value = ""; // 이전 값 지우기
  });

  this.render();
}
