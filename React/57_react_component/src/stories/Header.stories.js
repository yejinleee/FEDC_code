import Header from "../components/Header";

export default {
  title: "Component/Header",
  component: Header,
  argTypes: {
    level: { control: { type: "range", min: 1, max: 6 } },
    strong: { control: "boolean" },
    color: { control: "color" },
    underline: { control: "boolean" },
    backgroundColor: { control: "color" },
  },
};
export const Default = (args) => {
  return <Header {...args}>Header!!</Header>;
};
