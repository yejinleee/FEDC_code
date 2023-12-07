import styled from "@emotion/styled";

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;
const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`;

const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background-color: #44b;
`;
const Progress = ({ value, onChange, ...props }) => {
  return (
    <ProgressContainer {...props}>
      <Rail />
      <Track style={{ width: `${value}%` }} />
    </ProgressContainer>
  );
};

export default Progress;
