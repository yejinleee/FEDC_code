import { pushRoute } from "./router.js";

export default function LinkButton({ $target, initialState }) {
  const $linkButton = document.createElement("button");
  this.state = initialState;

  $target.appendChild($linkButton);

  this.render = () => {
    $linkButton.textContent = this.state.text;
    $target.appendChild($linkButton);
  };

  this.render();

  $linkButton.addEventListener("click", () => {
    pushRoute(this.state.link);
  });
}
