import Select from "../components/Select";

export default {
  title: "Component/Select",
  component: Select,
  args: {
    label: "Label",
    placeholder: "PLACEHOLDER",
    invalid: false,
    block: false,
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    invalid: { control: "boolean" },
    block: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Default = (args) => {
  return (
    <Select data={["t1", "t2", { label: "t3o", value: "t3ov" }]} {...args} />
  );
};
