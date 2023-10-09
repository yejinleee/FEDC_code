export default function TodoList({ $target, initialState, onClick }) {
  const $element = document.createElement("div");
  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (Array.isArray(this.state)) {
      $element.innerHTML = `
      <h1>Simple TodoList</h1>
      <ul>
        ${this.state
          .map(({ id, text }) => `<li data-id="${id}">${text}</li>`)
          .join("")}
        <ul>`;

      // 이벤트 최적화 관점엔 이게 아니긴한데. 레더 밖에서 하면은
      // innerHTml의 경우엔 기존걸 싹 날리고 다시하는거기 떄문에
      // 이전에 걸어놓은 이벤트가 다 날라감.. 그래서 렌덜이 안에서 ㅋ..
      // 실제론 이렇게 안함. 걍 단순한 방법임
      $element.querySelectorAll("li").forEach(($li) => {
        $li.addEventListener("click", (e) => {
          const { id } = e.target.dataset;
          onClick(parseInt(id));
        });
      });
      // id를 어떻게 넣을거냐. 이럴 때 커스텀 어트리뷰트 방법ㅇ ㅣ있다. <li data-id="${id}"
    }
  };
  this.render();
}
