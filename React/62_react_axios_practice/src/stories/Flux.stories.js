import Flux from "../components/Flux";

const { Row, Col } = Flux;

export default {
  title: "Component/Flux",
  component: Flux,
  args: {
    label: "Label",
    placeholder: "PLACEHOLDER",
    invalid: false,
    block: false,
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
  },
};

const Box = () => {
  return (
    <div
      style={{
        backgroundColor: "#44b",
        width: "100%",
        height: 39,
        color: "white",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      Box
    </div>
  );
};
export const Default = (args) => {
  return (
    <Row gutter={[10, 5]}>
      <Col span={4}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col>
        <Box />
      </Col>
      <Col offset={3}>
        <Box />
      </Col>
      <Col offset={5} span={2}>
        <Box />
      </Col>
    </Row>
  );
};
