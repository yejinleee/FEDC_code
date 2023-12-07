import styled from "@emotion/styled";
import { useRef, useState } from "react";

const UploadContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;
const Upload = ({
  children,
  droppable,
  name,
  accept,
  value,
  onChange,
  ...props
}) => {
  const [file, setFile] = useState(value); // input에서 선택한 파일을 컴포넌트에서 상태로서 뭔지 알기 위해서!
  const [dragging, setDragging] = useState(false);

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
  console.log(dragging);
  const handleDragEnter = (e) => {
    if (!droppable) return;
    e.preventDefault(); // 기본 브라우저 이벤트 막기 //필수!
    e.stopPropagation(); // 부모나 자식 컴포넌트로 이벤트 전파 막기 //필수!
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragLeave = (e) => {
    if (!droppable) return;
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };
  const handleDragOver = (e) => {
    // 이 이벤트가 전파되는걸 막아야되서!
    e.preventDefault();
    e.stopPropagation();
  };
  const handleFileDrop = (e) => {
    if (!droppable) return;
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const changedFile = files[0];
    setFile(changedFile);
    onChange && onChange(changedFile);
    setDragging(false);
  };

  return (
    <UploadContainer
      onClick={handleChooseFile}
      {...props}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Input display 숨겨져있으니까 상위div에 이벤트하나 있어야함 */}
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      {typeof children === "function" ? children(file, dragging) : children}
      {/* JSX반환하는 함수인 경우에 대해 처리 */}
    </UploadContainer>
  );
};

export default Upload;
