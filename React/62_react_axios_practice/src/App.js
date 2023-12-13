import axios from "axios";
import { Header } from "./components";
import useAsync from "./hooks/useAsync";
import PostList from "./components/domain/PostList";
import PostProvider from "./contexts/PostProvider";
import { useCallback } from "react";
import PostAddForm from "./components/domain/PostAddForm";

const App = () => {
  const initialPosts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);
  }, []);

  const handleAddPost = useCallback(async (post) => {
    return await axios
      .post(`https://jsonplaceholder.typicode.com/posts`, post)
      .then((res) => res.data);
  }, []);

  const handleDeletePost = useCallback(async (id) => {
    return await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => ({ id }));
  }, []);

  return (
    <PostProvider
      initialPosts={initialPosts.value}
      handleDeletePost={handleDeletePost}
      handleAddPost={handleAddPost}
    >
      <Header>Posts</Header>
      <PostAddForm />
      <ul>{initialPosts.isLoading ? <div>로딩중...</div> : <PostList />}</ul>
    </PostProvider>
  );
};
export default App;
