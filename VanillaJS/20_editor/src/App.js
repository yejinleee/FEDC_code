import PostsPage from "./PostsPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./router.js";

// url규칙
// 루트 : postPage
// /post/${id} : id에 해당하는 post생성
// /post/new : 새 post 생성

export default function App({ $target }) {
  const postsPage = new PostsPage({
    $target,
    onPostClick: (id) => {
      history.pushState(null, null, `/posts/${id}`);
      this.route();
    },
  });
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
    $target.innerHTML = "";
    const { pathname } = window.location;
    if (pathname === "/") {
      postsPage.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId }); // render아니고 setState 호출임
    }
  };
  this.route();

  // // 커스텀 이벤트
  // window.addEventListener("route-change", (e) => {
  //   const { nextUrl } = e.detail;
  //   if (nextUrl) {
  //     history.pushState(null, null, nextUrl);
  //     this.route();
  //   }
  // });
  initRouter(() => this.route());
}
