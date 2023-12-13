import { useState } from "react";
import Modal from "../components/Modal";

export default {
  title: "Component/Modal",
  component: Modal,
};

export const Default = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(true)}>SHOW Modal</button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        HI!
        <button onClick={() => setVisible(false)}>close </button>
      </Modal>
    </div>
  );
};
