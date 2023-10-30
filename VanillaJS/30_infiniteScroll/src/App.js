import PhotoList from "./PhotoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
  const $h1 = document.createElement("h1");
  $h1.innerText = "Cat Photos";
  $target.appendChild($h1);

  this.state = {
    limit: 5,
    nextStart: 0, //limit갯수만큼 계속 더해지도록
    photos: [],
    isLoading: false, //로딩중임을 나타낸다. isLoading:true인 상태에선 추가적으로 데이터 요청을 못하도록 막는 등의 역할 가능
    isLast: false,
  };

  const photoListComponent = new PhotoList({
    $target,
    initialState: {
      isLoading: this.state.isLoading,
      photos: this.state.photos,
      isLast: this.state.isLast,
    },
    onScrollEnded: async () => {
      await fetchPhotos();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    photoListComponent.setState({
      isLoading: this.state.isLoading,
      photos: nextState.photos,
      totalCount: this.state.totalCount,
      isLast: this.state.isLast,
    });
  };

  const fetchPhotos = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const { limit, nextStart } = this.state;
    const photos = await request(
      `/cat-photos?_limit=${limit}&_start=${nextStart}`
    );

    this.setState({
      ...this.state,
      nextStart: nextStart + limit,
      photos: [...this.state.photos, ...photos],
      isLoading: false,
      isLast: photos.length < limit,
    });
  };

  const init = async () => {
    await fetchPhotos();
  };

  init();
}
