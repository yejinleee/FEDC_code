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
