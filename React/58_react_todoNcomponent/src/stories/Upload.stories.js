import Upload from "../components/Upload";

export default {
  title: "Component/Upload",
  component: Upload,
};

export const Default = () => {
  return (
    <>
      <Upload>
        <button>click me</button>
      </Upload>
    </>
  );
};
export const AccessFile = () => {
  return (
    <Upload>
      {(file) => <button>{file ? file.name : "click me"}</button>}
    </Upload>
  );
};
export const Droppable = () => {
  return (
    <Upload droppable>
      {(file, dragging) => (
        <div
          style={{
            width: 200,
            height: 300,
            border: "4px dashed",
            borderColor: dragging ? "black" : "red",
          }}
        >
          {file ? file.name : "Click or drag file to this area to upload"}
        </div>
      )}
    </Upload>
  );
};
