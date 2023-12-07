import Box from "./Box";

const Paragraph = ({ line = 3, ...props }) => {
  return (
    <div {...props}>
      {Array.from(Array(line), (_, index) => {
        return (
          <Box
            width={index !== line - 1 ? "100%" : "50%"}
            height={16}
            key={index}
          />
        );
      })}
    </div>
  );
};
export default Paragraph;
