export default function PhotoList({ $target, initialState, onScrollEnded }) {
  let isInit = false;

  const $photoList = document.createElement("div");
  $target.appendChild($photoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.state.isLoading && !isLast) {
          console.log("화면 끝", entry);
          onScrollEnded();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  let $lastLi = null;

  this.render = () => {
    const { isLoading, photos } = this.state;

    if (!isInit) {
      $photoList.innerHTML = `<ul class="photoList_photos"></ul>`;
      isInit = true;
    }

    const $photos = $photoList.querySelector(".photoList_photos");

    photos.forEach((photo) => {
      // photo id를 통해 렌더링이 되어있는지 체크하고, 없는 경우에만 새로 생성
      if ($photos.querySelector(`[data-id="${photo.id}"]`) === null) {
        const $li = document.createElement("li");
        $li.setAttribute("data-id", photo.id);
        $li.style = "list-style: none; min-height: 500px"; // 최소값을 두어야 안전하게 스크롤위치 파악 가능
        $li.innerHTML = `<img src="${photo.imagePath}" width="100%"></img>`;

        $photos.appendChild($li);
      }
    });

    const $nextLi = $photos.querySelector("li:last-child");
    if ($nextLi) {
      if ($lastLi) {
        //이전 감시 대상 없애줘야함!
        observer.unobserve($lastLi);
      }
      $lastLi = $nextLi;
      observer.observe($lastLi); //관찰대상으로 등록
    }
  };

  this.render();

  window.addEventListener("scroll", () => {
    const { isLoading, photos, isLast } = this.state;
    const isScollEnded =
      window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;
    if (isScollEnded && !isLoading && !isLast) {
      onScrollEnded();
    }
  });
}
