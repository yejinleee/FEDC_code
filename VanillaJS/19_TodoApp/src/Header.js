export default function h1({ $target, initialState }) {
  const $h1 = document.createElement("h1");
  $target.appendChild($h1);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $h1.innerHTML = `
      <h1>${this.state}의 Todo APP</h1>
    `;
  };
  this.render();
}
