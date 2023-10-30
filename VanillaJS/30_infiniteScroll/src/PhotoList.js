export default function PhotoList({ $target, initialState, onScrollEnded }) {
  const $photoList = document.createElement("ul");
  $target.appendChild($photoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    const { PhotoList } = this.state;
    $photoList.innerHTML = `
      ${this.state
        .map(
          (photo) =>
            `<li><img src="${photo.imagePath}" width="100%"></img></li>`
        )
        .join("")}
    `; //최적화를 배제하고 매번 새로그린다는 코드다.
  };
  this.render();
}
