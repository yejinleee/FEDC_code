export default function validationCheck(state) {
  const KEYS = ["text", "isCompleted", "idx"];

  if (
    state.every((todo) => {
      if (
        KEYS.every((key) => {
          if (key in todo) {
            return true;
          }
        })
      ) {
        return true;
      }
    })
  ) {
    return true;
  }
}
