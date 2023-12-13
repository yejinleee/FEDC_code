import Toast from "../components/Toast";

export default {
  title: "Component/Toast",
  component: Toast,
};
export const Default = (args) => {
  return <button onClick={() => Toast.show("hi", 3000)}>Show Toast</button>;
};
