import { getItem, removeItem, setItem } from "./storage.js";
import { request } from "./api.js";
import Editor from "./Editor.js";
import { pushRoute } from "./router.js";
import LinkButton from "./LinkButton.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-post"-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        //방어코드
        clearTimeout(timer);
      }
      clearTimeout(timer);
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveData: new Date(),
        });

        const isNew = this.state.postId === "new";
        console.log(this.state.postId);
        if (isNew) {
          const createdPost = await request("/posts", {
            method: "POST",
            body: JSON.stringify(post), //this.state 아님!
          });
          console.log(createdPost); //{id: 2175, title: '', content: '43', published_at: '2023-10-17T08:03:12.383Z', created_at: '2023-10-17T08:03:12.384Z', …} 이렇게 넣어지는 값 반환
          // /new이던 상태를 생성된 포스트의 id 값을 대치를 해야함!
          history.replaceState(null, null, `/posts/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          // 무한증식 버그 해결!
          // url을 넣고 페이지의 state도 갱신해줘야 해!!
          this.setState({
            postId: createdPost.id,
          });
        } else {
          await request(`/posts/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    console.log(this.state, this.state.postId, nextState.postId);
    if (this.state.postId !== nextState.postId) {
      // setState <-> fetchPost에서 서로 호출하기때문에 무한루프에 걸리지 않으려면 처리해야함.
      postLocalSaveKey = `temp-post"-${nextState.postId}`;

      this.state = nextState; //원래는 이렇게만이어서 New POST 버튼으로 /new오면 아무것도 안뜸! ㅠㅠ
      // 해결
      if (this.state.postId === "new") {
        //이전엔new였다가 새로운페이지온경우, 즉, new였다가 입력해서 새로운id받아서 url 바뀐상황
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
        console.log(post);
        this.render(); // this.state만 넣어주고 정작 이 PostEditPage가 렌더가 안됬었던 문제임.
        editor.setState(post);
      } else {
        await fetchPost();
      }
      return;
    }
    this.state = nextState; // 렌더전에!
    console.log(this.state);
    this.render();

    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;
    if (this.state.postId !== "new") {
      const post = await request(`/posts/${postId}`);

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });
      if (tempPost.tempSaveData && tempPost.tempSaveData > post.updated_at) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            post: tempPost,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        post,
      });
    }
  };

  new LinkButton({
    $target: $page,
    initialState: {
      text: "목록으로",
      link: "/",
    },
  });

  // // 목록으로 가는 버튼
  // const $moveListButton = document.createElement("button");
  // $moveListButton.innerText = "목록으로";
  // $page.appendChild($moveListButton);
  // $moveListButton.addEventListener("click", () => {
  //   pushRoute("/");
  // });
}
