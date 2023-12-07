import styled from "@emotion/styled";
import { useRef, useState } from "react";

const Input = styled.input`
  display: none;
`;
const Upload = ({ children, name, accept, value, onChange, ...props }) => {
  const [file, setFile] = useState(value); // input에서 선택한 파일을 컴포넌트에서 상태로서 뭔지 알기 위해서!
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const changedFile = files[0];
    setFile(changedFile);
    onChange && onChange(changedFile); // 부모컴포넌트에서도 반영이 되도록하는거
  };
  const handleChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div onClick={handleChooseFile} {...props}>
      {/* Input display 숨겨져있으니까 상위div에 이벤트하나 있어야함 */}
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      {typeof children === "function" ? children(file) : children}
      {/* JSX반환하는 함수인 경우에 대해 처리 */}
    </div>
  );
};

export default Upload;
