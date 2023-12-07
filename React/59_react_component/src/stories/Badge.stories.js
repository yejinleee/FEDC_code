import { bool } from "prop-types";
import Badge from "../components/Badge";
import Image from "../components/Image";

export default {
  title: "Component/Badge",
  component: Badge,
  args: {
    count: 8,
    maxCount: 100,
  },
  argTypes: {
    count: { control: "number" },
    maxCount: { control: "number" },
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    showZero: { control: "boolean" },
  },
};

export const Default = (args) => {
  return (
    <Badge {...args}>
      <Image
        src="https://picsum.photos/60"
        width={60}
        style={{ borderRadius: 8 }}
      />
    </Badge>
  );
};
export const Dot = (args) => {
  return (
    <Badge dot>
      <Image src="https://picsum.photos/60" width={40} />
    </Badge>
  );
};
