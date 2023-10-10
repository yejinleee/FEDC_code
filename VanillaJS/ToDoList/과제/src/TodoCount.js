export default function TodoCount({ $target, lenAll, lenCompleted }) {
  const $count = document.createElement("div");
  $target.appendChild($count);

  this.render = (lenAll, lenCompleted) => {
    $count.innerHTML = `전체 투두 갯수 ${lenAll} 중 ${lenCompleted} 개 완료 !`;
  };
  this.render(lenAll, lenCompleted);
}
