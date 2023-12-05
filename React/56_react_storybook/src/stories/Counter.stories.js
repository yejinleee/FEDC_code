import Counter from "../components/Counter";

export default {
  title: "Example/Counter",
  component: Counter,
  argTypes: {
    onIncrease: { action: "increased" },
  },
};
export const Default = {
  args: {
    primary: true,
    label: "Counter",
  },
};
