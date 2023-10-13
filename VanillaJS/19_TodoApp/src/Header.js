export default function Header({ $target, initialState }) {
  const $h1 = document.createElement("h1");
  $target.appendChild($h1);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { username, isLoading } = this.state;
    $h1.innerHTML = `
      <h1>${username}의 Todo APP</h1>
      <div>${isLoading ? "Loading ..." : ""}</div>
    `;
  };
  this.render();
}
