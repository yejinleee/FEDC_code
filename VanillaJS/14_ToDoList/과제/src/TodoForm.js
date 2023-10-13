export default function TodoForm({ $target, onSubmit }) {
  if (!new.target) {
    throw new Error("컴포넌트를 생성자 함수로 호출해주세요");
  }
  const $form = document.createElement("form");
  $target.appendChild($form);

  let isInit = false;

  this.render = () => {
    $form.innerHTML = `
      <input type = "text" name = "todo"/>
      <button>➕</button>`;
    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault();

        const $input = $form.querySelector("input[name=todo]");
        const text = $input.value;
        if (text.length > 1) {
          $input.value = "";

          onSubmit(text);
        }
      });
      isInit = !isInit;
    }
  };
  this.render();
}
