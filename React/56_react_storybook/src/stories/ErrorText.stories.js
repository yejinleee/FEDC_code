import ErrorText from "../components/ErrorText";

export default {
  title: "Example/ErrorText",
  component: ErrorText,
  argTypes: {},
};

export const Default = (args) => {
  return <ErrorText {...args}>Error Text</ErrorText>;
};
