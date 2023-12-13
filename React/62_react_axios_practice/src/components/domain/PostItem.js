import { useCallback, useState } from "react";
import { usePostContext } from "../../contexts/PostProvider";
import { Header, Text } from "../index";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { onDeletePost } = usePostContext();

  const handleDeletePost = useCallback(
    async (id) => {
      setLoading(true);
      await onDeletePost(id);
      setLoading(false);
    },
    [onDeletePost]
  );

  return (
    <li>
      <Header strong level={2}>
        {post.title}
      </Header>
      <Link to={`/posts/${post.id}`}>..Detail</Link>
      {/* <Text>{post.body}</Text> */}
      {loading ? (
        <span>((삭제중...))</span>
      ) : (
        <button onClick={() => handleDeletePost(post.id)}>DELETE</button>
      )}
    </li>
  );
};

export default PostItem;
