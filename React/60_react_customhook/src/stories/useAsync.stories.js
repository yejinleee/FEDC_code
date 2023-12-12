import useAsync from "../hooks/useAsync";

export default {
  title: "Hook/useAsync",
};
const asyncReturnValue = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success!");
    }, 1000);
  });
};
const asyncReturnError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("ERROR!");
    }, 1000);
  });
};
export const Default = () => {
  const state = useAsync(async () => {
    return await asyncReturnValue();
    // return await asyncReturnError();
  }, []);

  return (
    <div>
      <div>useAsync 테스트</div>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};
