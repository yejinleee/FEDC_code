import Title from "../components/Title";

export default {
  title: "Example/Title",
  component: Title,
  argTypes: {},
};

export const Default = (args) => {
  return <Title {...args}>Title</Title>;
};
