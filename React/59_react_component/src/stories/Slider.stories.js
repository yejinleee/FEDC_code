import Slider from "../components/Slider";

export default {
  title: "Component/Slider",
  component: Slider,
  argTypes: {
    defaultValue: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    onChange: { action: "onChange!" },
  },
};

export const Default = (args) => {
  return <Slider {...args} />;
};
