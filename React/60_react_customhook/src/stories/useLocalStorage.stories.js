import useLocalStorage from "../hooks/useLocalStorage";

export default {
  title: "Hook/useLocalStorage",
};
export const Default = () => {
  const [status, setStatus] = useLocalStorage("status", "404 not found");
  return (
    <div>
      <button onClick={() => setStatus("202 ok")}>resend</button>
      {status}
    </div>
  );
};
