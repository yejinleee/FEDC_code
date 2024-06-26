import useForm from "../hooks/useForm";
import Button from "./Button";
import ErrorText from "./ErrorText";
import Input from "./Input";
import CardForm from "./CardForm";
import Title from "./Title";

const LoginForm = ({ onSubmit2 }) => {
  const sleep = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: onSubmit2,
    validate: ({ name, password }) => {
      const newErrors = {};
      if (!name) newErrors.name = "이름을 입력해주세요";
      if (!password) newErrors.password = "비밀번호를 입력해주세요";
      return newErrors;
    },
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log("SUBMIIT");
  //   onSubmit2 && onSubmit2();
  // };
  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input
        type="text"
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
      {errors.name && <ErrorText>{errors.name}</ErrorText>}
      <Input
        type="password"
        name="password"
        placeholder="password"
        style={{
          marginTop: "10px",
        }}
        onChange={handleChange}
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}

      <Button
        type="submit"
        disabled={isLoading}
        style={{
          marginTop: "15px",
        }}
      >
        Login
      </Button>
    </CardForm>
  );
};

export default LoginForm;
