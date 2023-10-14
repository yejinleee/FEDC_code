export default function Header({ $target, initialState }) {
  const $h2 = document.createElement("h2");
  $target.appendChild($h2);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selectedUsername, isLoading } = this.state;
    if (!selectedUsername) {
      $h2.innerHTML = "";
      return;
    }
    $h2.innerHTML = `
      <h2>${selectedUsername}의 Todo APP</h2>
      <div>${isLoading ? "Loading ..." : ""}</div>
    `;
  };
  this.render();
}
