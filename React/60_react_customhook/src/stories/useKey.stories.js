import useKey from "../hooks/useKey";

export default {
  title: "Hook/useKey",
};

export const Default = () => {
  useKey("keydown", "a", () => {
    alert("a Key down");
  });
  return <>useKey</>;
};
