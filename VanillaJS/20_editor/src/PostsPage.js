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

  const fetchPosts = async () => {
    const posts = await request("/posts");
    postLists.setState(posts);
  };
  this.render = async () => {
    await fetchPosts();
    // PostsPage가 렌더링될때, $target에 append되는 순서가 맞음
    $target.appendChild($page);
  };
}
