import Circle from "../components/Circle";

export default {
  title: "Example/Circle",
  component: Circle,
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    backgroundColor: { control: "color" },
  },
};
export const Default = {
  args: {
    primary: true,
    label: "Circle",
  },
};
