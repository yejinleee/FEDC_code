import Input from "../components/Input";

export default {
  title: "Example/Input",
  component: Input,
  argTypes: {
    onChange: { action: "onChange" },
  },
};
export const Default = {
  args: {
    primary: true,
    label: "Input",
  },
};
