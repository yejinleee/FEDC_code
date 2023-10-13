// state 형태
// {
//   productName : 상품명,
//   basePrice : 상품 기본 가격,
//   selectedOptions: [Option]
// }

export default function Cart({ $target, initialState, onRemove }) {
  const $cart = document.createElement("div");
  $target.appendChild($cart);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const calcurateTotalPrice = () => {
    const { basePrice, selectedOptions } = this.state;
    return selectedOptions.reduce(
      (acc, option) => acc + (basePrice + option.optionPrice) * option.ea,
      0
    );
  };

  this.render = () => {
    const { productName, basePrice, selectedOptions } = this.state;

    $cart.innerHTML = `
    <ul>
      ${
        Array.isArray(selectedOptions) &&
        selectedOptions
          .map(
            (option, idx) => `
          <li data-index =${idx} class="cartItem">
            ${productName} - ${option.optionName} | ${
              basePrice + option.optionPrice
            }
            x ${option.ea}개
          <button class="remove">X</button></li>`
          )
          .join("")
      }
    </ul>
    <div>
      총 가격 : ${calcurateTotalPrice()}
    </div>`;

    $cart.querySelectorAll(".remove").forEach(($button) => {
      $button.addEventListener("click", (e) => {
        // closest ㄴㅐ 상위로 가장 가까운 지정한 요소
        const $li = e.target.closest(".cartItem");

        if ($li) {
          const { index } = $li.dataset;
          onRemove(parseInt(index));
        }
      });
    });
  };

  this.render();
}
