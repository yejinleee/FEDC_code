import styled from "@emotion/styled";

const Container = styled.div`
  display: ${({ block }) => (block ? "block" : "inline-block")};
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "grey")};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
`;

const Input = ({
  label,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readOnly = false,
  containerProps,
  ...props
}) => {
  return (
    <Container {...containerProps}>
      <Label>{label}</Label>
      <StyledInput
        {...props}
        block={block}
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default Input;
