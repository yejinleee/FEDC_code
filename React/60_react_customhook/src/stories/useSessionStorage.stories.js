import useSessionStorage from "../hooks/useSessionStorage";

export default {
  title: "Hook/useSessionStorage",
};
export const Default = () => {
  const [status, setStatus] = useSessionStorage("status", "404 not found");
  return (
    <div>
      <button onClick={() => setStatus("202 ok")}>resend</button>
      {status}
    </div>
  );
};
