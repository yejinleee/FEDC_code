import CardForm from "../components/CardForm";

export default {
  title: "Example/CardForm",
  component: CardForm,
  argTypes: {},
};

export const Default = (args) => {
  return <CardForm {...args}>CardForm</CardForm>;
};
