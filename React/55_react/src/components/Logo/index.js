import logo from "./logo.svg";
import propTypes from "prop-types";

function Logo(props) {
  return (
    <img
      src={logo}
      className="App-logo"
      alt="logo"
      style={{ width: props.size, height: props.size }}
    />
  );
}
Logo.defaultProps = {
  size: 200,
};
Logo.propTypes = {
  size: propTypes.number,
};
export default Logo;
