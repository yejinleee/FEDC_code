import PropTypes from "prop-types";
const Header = ({
  children,
  level = 1,
  strong,
  color,
  underline,
  ...props
}) => {
  let Tag = `h${level}`; // 동적으로 태그 생성 가능
  if (level < 1 || level > 6) {
    Tag = "h1";
  }

  console.log(props); // {backgroundColor: '#c53232'}
  const fontStyle = {
    fontWeight: strong ? "bold" : "normal",
    textDecoration: underline ? "underline" : undefined,
    color,
  };
  return (
    <Tag
      style={{
        ...props, // 강사님은 props.style ...왜?
        ...fontStyle,
      }}
      // {...props}
    >
      {children}
    </Tag>
  );
};
Header.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number,
  strong: PropTypes.bool,
  color: PropTypes.bool,
  underline: PropTypes.string,
};
export default Header;
