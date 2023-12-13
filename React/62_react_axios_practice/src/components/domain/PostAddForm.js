import { usePostContext } from "../../contexts/PostProvider";
import useForm from "../../hooks/useForm";

const PostAddForm = () => {
  const { onAddPost } = usePostContext();

  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialState: {
      userId: 1,
      title: "",
      body: "",
    },
    onSubmit: async (values) => {
      await onAddPost(values);
    },
    validate: ({ title, body }) => {
      const errors = {};
      if (!title) errors.title = "제목을 입력하세요";
      if (!body) errors.body = "내용을 입력하세요";
      return errors;
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="title" onChange={handleChange} />
        {errors.title}
      </div>
      <div>
        <input type="text" name="body" onChange={handleChange} />
        {errors.body}
      </div>
      {isLoading ? <div>추가중...</div> : <button type="submit">Add</button>}
    </form>
  );
};

export default PostAddForm;
