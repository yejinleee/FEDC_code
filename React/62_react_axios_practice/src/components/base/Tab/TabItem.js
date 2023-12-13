import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Text from "../Text";

const TabItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-center: center;
  width: 140px;
  height: 60px;
  background-color: ${({ active }) => (active ? "#ddf" : "#eee")};
  cursor: pointer;
`;

const TabItem = ({ title, index, active, ...props }) => {
  return (
    <TabItemWrapper active={active} {...props}>
      <Text strong={active}>{title}</Text>
    </TabItemWrapper>
  );
};

TabItem.propTypes = {
  __TYPE: PropTypes.oneOf(["Tab.Item"]),
};
TabItem.defaultProps = {
  __TYPE: "Tab.Item",
};

export default TabItem;
