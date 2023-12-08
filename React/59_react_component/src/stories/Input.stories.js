import Input from "../components/Input";

export default {
  title: "Component/Input",
  component: Input,
  args: {
    label: "Label",
    invalid: false,
    block: false,
  },
  argTypes: {
    label: { control: "text" },
    invalid: { control: "boolean" },
    block: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Default = (args) => {
  return <Input {...args} />;
};
