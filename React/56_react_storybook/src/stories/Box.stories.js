import Box from "../components/Box";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/Box",
  component: Box,
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    backgroundColor: { control: "color" },
  },
};
export const Default = {
  args: {
    primary: true,
    label: "Box",
  },
};
// const Template = (args) => <Box {...args} />;

// export const Default = Template.bind({});

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary = {
//   args: {
//     primary: true,
//     label: "box",
//   },
// };

// export const Secondary = {
//   args: {
//     label: "Button",
//   },
// };

// export const Large = {
//   args: {
//     size: "large",
//     label: "Button",
//   },
// };

// export const Small = {
//   args: {
//     size: "small",
//     label: "Button",
//   },
// };
