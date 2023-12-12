import { useState } from "react";
import useHotKey from "../hooks/useHotKey";

export default {
  title: "Hook/useHotKey",
};

export const Default = () => {
  const [value, setValue] = useState("");

  const hotkeys = [
    {
      global: true,
      combo: "meta + k",
      onKeyDown: (e) => {
        alert("meta + k");
      },
    },
    // {
    //   global: true,
    //   combo: "esc",
    //   onKeyDown: (e) => {
    //     alert("esc");
    //   },
    // },
    {
      global: false,
      combo: "esc",
      onKeyDown: (e) => {
        // alert("esc~~~~");
        setValue("");
      },
    },
  ];

  const { handleKeyDown } = useHotKey(hotkeys);

  return (
    <div>
      useHotKey 테스트
      <div>
        {/* 로컬 키입력 처리 */}
        <input
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
