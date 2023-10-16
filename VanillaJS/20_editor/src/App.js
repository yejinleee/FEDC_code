import PostsPage from "./PostsPage.js";
import PostEditPage from "./PostEditPage.js";

// url규칙
// 루트 : postPage
// /post/${id} : id에 해당하는 post생성
// /post/new : 새 post 생성

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      postsPage.render();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId }); // render아니고 setState 호출임
    }
  };
  this.route();
}
