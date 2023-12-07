import Skeleton from "../components/Skeleton";

export default {
  title: "Component/Skeleton",
  component: Skeleton,
};
export const Box = (args) => <Skeleton.Box {...args} />;
Box.args = {
  width: 200,
  height: 100,
};
Box.argTypes = {
  width: { control: "number" },
  height: { control: "number" },
};
export const Circle = (args) => <Skeleton.Circle {...args} />;
Circle.args = {
  size: 200,
};
Circle.argTypes = {
  size: { control: "number" },
};
export const Paragraph = (args) => <Skeleton.Paragraph {...args} />;
Paragraph.args = {
  line: 3,
};
Paragraph.argTypes = {
  line: { control: "number" },
};

export const Sample = () => {
  return (
    <>
      <div style={{ float: "left", marginRight: "15px" }}>
        <Skeleton.Circle size={60} />
      </div>
      <div style={{ float: "left", width: "80%" }}>
        <Skeleton.Paragraph line={4} />
      </div>
      <div style={{ clear: "both" }} />
    </>
  );
};
