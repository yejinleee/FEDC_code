import { getItem, removeItem, setItem } from "./storage.js";
import { request } from "./api.js";
import Editor from "./Editor.js";

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
          console.log(createdPost);
          // /new이던 상태를 생성된 포스트의 id 값을 대치를 해야함!
          history.replaceState(null, null, `/posts/${createdPost.id}`);
          removeItem(postLocalSaveKey);
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
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post"-${nextState.postId}`;

      this.state = nextState;
      await fetchPost();
      return;
    }
    this.state = nextState; // 렌더전에!
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

  // this.render();
}
