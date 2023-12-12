import { Fragment, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default {
  title: "Hook/useDebounce",
};

const words = ["apple", "banana", "carrot", "cream", "cat"];

export const Default = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  useDebounce(
    () => {
      console.log(value.trim());
      if (value === "") setResult([]);
      else {
        setResult(
          words.filter((word) =>
            word.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    },
    1000,
    [value]
  );

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        {result.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </>
  );
};
