import useForm from "../hooks/useForm";
import Button from "./Button";
import ErrorText from "./ErrorText";
import Input from "./Input";
import CardForm from "./CardForm";
import Title from "./Title";

const SignUpForm = ({ onSubmit2 }) => {
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: onSubmit2,
    validate: ({ name, password, passwordConfirm }) => {
      const newErrors = {};
      if (!name) newErrors.name = "이름을 입력해주세요";
      if (!password) newErrors.password = "비밀번호를 입력해주세요";
      if (password !== passwordConfirm)
        newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
      return newErrors;
    },
  });

  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>SignUp</Title>
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
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="password Confirm"
        style={{
          marginTop: "10px",
        }}
        onChange={handleChange}
      />
      {errors.passwordConfirm && (
        <ErrorText>{errors.passwordConfirm}</ErrorText>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        style={{
          marginTop: "15px",
        }}
      >
        Signup
      </Button>
    </CardForm>
  );
};

export default SignUpForm;
