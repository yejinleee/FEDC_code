import LinkButton from "./LinkButton.js";
import PostList from "./PostList.js";
import { request } from "./api.js";
import { pushRoute } from "./router.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postLists = new PostList({
    $target: $page,
    initialState: [],
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "New POST",
      link: "/posts/new",
    },
  });
  // const $newPostButton = document.createElement("button");
  // $newPostButton.textContent = "NEW POST";
  // $page.appendChild($newPostButton);
  // $newPostButton.addEventListener("click", () => {
  //   pushRoute("/posts/new");
  // });

  this.setState = async () => {
    const posts = await request("/posts");
    postLists.setState(posts);
    this.render();
  };
  this.render = async () => {
    $target.appendChild($page);
  };
  // 위 처럼 변경. PostEditPage처럼 setState로 해두는게 일관성있음
  // const fetchPosts = async () => {
  //   const posts = await request("/posts");
  //   postLists.setState(posts);
  // };
  // this.render = async () => {
  //   await fetchPosts();
  //   // PostsPage가 렌더링될때, $target에 append되는 순서가 맞음
  //   $target.appendChild($page);
  // };
}
