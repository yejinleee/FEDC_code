/* eslint-disable import/no-anonymous-default-export */
import Image from "../components/Image";

export default {
  title: "Component/Image",
  component: Image,
  args: {
    // 기본값 이렇게 줘야함!
    lazy: false,
    threshold: 0.5,
    placeholder: "https://via.placeholder.com/200",
    src: "https://picsum.photos/200",
    width: 200,
    height: 200,
    alit: "alt",
    mode: "cover",
  },
  argTypes: {
    lazy: {
      control: { type: "boolean" },
    },
    threshold: {
      control: { type: "number" },
    },
    placeholder: {
      control: { type: "text" },
    },
    src: {
      name: "src",
      type: { name: "string", require: true },
      // defaultValue: "https://picsum.photos/200", // 작동 X ..
      control: { type: "text" },
    },
    width: {
      name: "width", // name 은 다 생략 가능
      defaultValue: 200,
      control: { type: "range", min: 200, max: 600 },
    },
    height: {
      defaultValue: 200,
      control: { type: "range", min: 200, max: 600 },
    },
    alt: {
      control: "string",
    },
    mode: {
      options: ["cover", "fill", "contain"],
      control: { type: "radio" },
    },
  },
};
export const Default = (args) => {
  return <Image {...args}>Image!!</Image>;
};
export const Lazy = (args) => {
  return (
    <div>
      {Array.from(new Array(20), (_, k) => k).map((i) => (
        <Image {...args} lazy block src={`${args.src}?${i}`} key={i} />
      ))}
    </div>
  );
};
