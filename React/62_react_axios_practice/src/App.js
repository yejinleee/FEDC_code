import axios from "axios";
import { Header } from "./components";
import useAsync from "./hooks/useAsync";
import PostList from "./components/domain/PostList";
import PostProvider from "./contexts/PostProvider";

const App = () => {
  const initialPosts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);
  }, []);

  return (
    <PostProvider initialPosts={initialPosts.value}>
      <Header>Posts</Header>
      <ul>{initialPosts.isLoading ? <div>로딩중...</div> : <PostList />}</ul>
    </PostProvider>
  );
};
export default App;
