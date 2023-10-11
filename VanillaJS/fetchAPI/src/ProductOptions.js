export default function ProductOptions({ $target, initialState, onSelect }) {
  const $select = document.createElement("select");
  $target.appendChild($select);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state && Array.isArray(this.state)) {
      $select.innerHTML = `${this.state
        .map(
          ({ id, optionName, optionPrice, stock }) =>
            `<option value = "${id}" ${
              !stock ? "disabled" : ""
            }>${optionName} (가격 : ${optionPrice} | 재고 : ${stock})</option>`
        )
        .join("")}`;

      $select.addEventListener("change", (e) => {
        const id = parseInt(e.target.value);
        const selectedOption = this.state.find((option) => option.id === id);
        if (selectedOption) {
          onSelect(selectedOption);
        }
      });
    }
  };
  this.render();
}
