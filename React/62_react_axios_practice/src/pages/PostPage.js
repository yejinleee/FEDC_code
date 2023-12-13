import axios from "axios";
import { useParams } from "react-router";
import useAsync from "../hooks/useAsync";
import { Header, Text } from "../components";

const PostPage = () => {
  const { postId } = useParams();

  const post = useAsync(async () => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.data);
  }, [postId]);
  return (
    <div>
      {post.isLoading ? (
        <h3>불러오기 중</h3>
      ) : (
        <>
          <Header strong>{post.value?.title || ""}</Header>
          <Text>{post.value?.body}</Text>
        </>
      )}
    </div>
  );
};

export default PostPage;
