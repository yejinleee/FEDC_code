const Checkbox = ({ label = "Label", checked, onChange }) => {
  return (
    <label>
      {label}
      <input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </label>
  );
};
export default Checkbox;
