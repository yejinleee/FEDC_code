import Button from "../components/Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    onClick: { action: "onClick!" },
  },
};
export const Default = (args) => {
  return <Button {...args}>Button!!</Button>;
};
