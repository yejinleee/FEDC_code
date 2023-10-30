export default function PhotoList({ $target, initialState, onScrollEnded }) {
  let isInit = false;

  const $photoList = document.createElement("div");
  $target.appendChild($photoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading, photos } = this.state;

    if (!isInit) {
      $photoList.innerHTML = `
      <ul class="photoList_photos">
        ${photos
          .map(
            (photo) =>
              `<li data-id="${photo.id}" style="list-style: none"><img src="${photo.imagePath}" width="100%"></img></li>`
          )
          .join("")}
      </ul>
      <button class="PhotoList_loadMore">Load More</button>
      `;
      isInit = true;
    }

    const $photos = $photoList.querySelector(".photoList_photos");

    photos.forEach((photo) => {
      // photo id를 통해 렌더링이 되어있는지 체크하고, 없는 경우에만 새로 생성
      if ($photos.querySelector(`[data-id="${photo.id}"]`) === null) {
        const $li = document.createElement("li");
        $li.setAttribute("data-id", photo.id);
        $li.style = "list-style: none";
        $li.innerHTML = `<img src="${photo.imagePath}" width="100%"></img>`;

        $photos.appendChild($li);
      }
    });
  };

  this.render();
  $photoList.addEventListener("click", (e) => {
    if (e.target.className === "PhotoList_loadMore" && !this.state.isLoading) {
      onScrollEnded();
    }
  });
}
