export default function TodoCount({ $target, lenAll, lenCompleted }) {
  if (!new.target) {
    throw new Error("컴포넌트를 생성자 함수로 호출해주세요");
  }
  const $count = document.createElement("div");
  $target.appendChild($count);

  this.render = (lenAll, lenCompleted) => {
    if (lenAll) {
      $count.innerHTML = `You did ${lenCompleted} out of ${lenAll} !`;
    } else {
      $count.innerHTML = "";
    }
  };
  this.render(lenAll, lenCompleted);
}
