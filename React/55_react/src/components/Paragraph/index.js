import PropTypes from "prop-types";

function Paragraph({ children, size }) {
  return <p style={{ fontSize: size }}>{children}</p>;
}

Paragraph.prototype = {
  children: PropTypes.node.isRequired, // node타입임! isRequired 는 필수 지정
  size: PropTypes.number,
};

export default Paragraph;
