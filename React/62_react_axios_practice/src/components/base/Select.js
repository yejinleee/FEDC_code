import styled from "@emotion/styled";

const Container = styled.div`
  display: ${({ block }) => (block ? "block" : "inline-block")};
`;
const StyledSelect = styled.select`
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
const Select = ({
  data,
  label,
  placeholder,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  containerProps,
  ...props
}) => {
  // string, object 모두 가능케 처리하기

  const formattedData = data.map((item) =>
    typeof item === "string"
      ? {
          label: item,
          vallue: item,
        }
      : item
  );
  const options = formattedData.map((item) => (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  ));

  if (placeholder) {
    options.unshift(
      <option key="placeholder" value="" hidden>
        {placeholder}
      </option>
    );
  }
  return (
    <Container block={block} {...containerProps}>
      <Label>{label}</Label>
      <StyledSelect
        {...props}
        invalid={invalid}
        required={required}
        disabled={disabled}
      >
        {options}
      </StyledSelect>
    </Container>
  );
};

export default Select;
