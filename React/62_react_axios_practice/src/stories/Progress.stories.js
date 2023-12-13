import Progress from "../components/Progress";
import { useState } from "react";
export default {
  title: "Component/Progress",
  component: Progress,
};

export const Default = (args) => {
  const [value, setValue] = useState(20);
  return (
    <div>
      <Progress value={value} {...args} />
      <button onClick={() => setValue(90)}>click</button>
    </div>
  );
};
