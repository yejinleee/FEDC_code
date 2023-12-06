import SignUpForm from "../components/SignUpForm";

export default {
  title: "Example/SignUpForm",
  component: SignUpForm,
  argTypes: {
    onSubmit2: {
      action: "signup submit",
    },
  },
};

export const Default = (args) => {
  return <SignUpForm {...args}></SignUpForm>;
};
