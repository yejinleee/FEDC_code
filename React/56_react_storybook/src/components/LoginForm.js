import Button from "./Button";
import Input from "./Input";
import styled from "@emotion/styled";

const CardForm = styled.form`
  width: 400px;
  background-color: white;
  box-shadow: 0 0 4px rgb(0, 0, 0, 0.2);
  padding: 15px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const LoginForm = ({ onSubmit2 }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("SUBMIIT");
    onSubmit2 && onSubmit2();
  };
  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input type="text" name="name" placeholder="name" />
      <Input
        type="password"
        name="pw"
        placeholder="name"
        style={{
          marginTop: "10px",
        }}
      />
      <Button
        type="submit"
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
