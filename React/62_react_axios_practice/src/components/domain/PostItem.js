import { Header, Text } from "../index";

const PostItem = ({ post }) => {
  return (
    <li>
      <Header strong level={2}>
        {post.title}
      </Header>
      <Text>{post.body}</Text>
    </li>
  );
};

export default PostItem;
