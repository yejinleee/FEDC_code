import useAsyncFn from "../hooks/useAsyncFn";

export default {
  title: "Hook/useAsyncFn",
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
  const [state, callback] = useAsyncFn(async () => {
    return await asyncReturnValue();
    // return await asyncReturnError();
  }, []);

  return (
    <div>
      <div>useAsyncFn 테스트</div>
      <div>{JSON.stringify(state)}</div>
      <button onClick={callback} disabled={state.isLoading}>
        {" "}
        비동기 호출
      </button>
    </div>
  );
};
