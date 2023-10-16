import PostList from "./PostList.js";
import { request } from "./api.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postLists = new PostList({
    $target,
    initialState: [],
  });

  const $newPostButton = document.createElement("button");
  $newPostButton.textContent = "NEW POST";
  $page.appendChild($newPostButton);

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
