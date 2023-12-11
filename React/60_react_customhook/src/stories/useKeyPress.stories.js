import useKeyPress from "../hooks/useKeyPress";

export default {
  title: "Hook/useKeyPress",
};

export const Default = () => {
  const keyPressed = useKeyPress("a");

  return (
    <>
      <div>{keyPressed ? "Key Pressed!" : "Press key!"}</div>
    </>
  );
};
