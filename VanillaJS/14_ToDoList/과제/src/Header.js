export default function Header({ $target, text }) {
  if (!new.target) {
    throw new Error("컴포넌트를 생성자 함수로 호출해주세요");
  }
  const $header = document.createElement("h1");

  $target.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };
  this.render();
}
