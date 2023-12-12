// commnad+F 같은 단축키

import { useCallback, useEffect, useMemo } from "react";

const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8,
};

const ShiftKeys = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  // 중략
};

const Aliases = {
  win: "meta",
  window: "meta",
  cmd: "meta",
  command: "meta",
  esc: "escape",
  opt: "alt",
  option: "alt",
};
const getKeyCombo = (e) => {
  const key = e.key !== "" ? e.key.toLowerCase() : "space";

  let modifiers = 0; // ctrl  , alt ,meta, shift 같은 키
  if (e.altKey) modifiers += ModifierBitMasks.alt; // 비트마스크 기법? 처럼 처리하기 위해
  if (e.ctrlKey) modifiers += ModifierBitMasks.ctrl;
  if (e.metaKey) modifiers += ModifierBitMasks.meta;
  if (e.shiftKey) modifiers += ModifierBitMasks.shift;

  return { modifiers, key };
};
const comboMathces = (a, b) => {
  return a.modifiers === b.modifiers && a.key === b.key;
};
const useHotKey = (hotkeys) => {
  //
  const localKeys = useMemo(() => hotkeys.filter((k) => !k.global), [hotkeys]);
  const globalKeys = useMemo(() => hotkeys.filter((k) => k.global), [hotkeys]);

  const invokeCallback = useCallback(
    (global, combo, callbackName, e) => {
      for (const hotkey of global ? globalKeys : localKeys) {
        // 단축 키 처리 // callbackName : onKeyDown , onKeyUp
        if (comboMathces(parseKeyCombo(hotkey.combo), combo)) {
          hotkey[callbackName](e);
        }
      }
    },
    [localKeys, globalKeys]
  );

  const parseKeyCombo = (combo) => {
    // 알기 쉽게 파싱
    const pieces = combo.replace(/\s/g, "").toLowerCase().split("+"); // 공백제거.소문자.+를기준으로스플릿
    let modifiers = 0;
    let key;
    for (let piece of pieces) {
      if (ModifierBitMasks[piece]) {
        modifiers += ModifierBitMasks[piece];
      } else if (ShiftKeys[piece]) {
        modifiers += ModifierBitMasks.shift;
        key = ShiftKeys[piece];
      } else if (Aliases[piece]) {
        key = Aliases[piece];
      } else {
        key = piece;
      }
    }
    return { modifiers, key };
  };

  const handleGlobalKeyDown = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyDown", e);
    },
    [invokeCallback]
  );
  const handleGlobalKeyUp = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyUp", e);
    },
    [invokeCallback]
  );
  const handleLocalKeyDown = useCallback(
    (e) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        "onKeyDown",
        e.nativeEvent
      );
    },
    [invokeCallback]
  );
  const handleLocalKeyUp = useCallback(
    (e) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        "onKeyUp",
        e.nativeEvent
      );
    },
    [invokeCallback]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("keyup", handleGlobalKeyUp);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
      document.removeEventListener("keyup", handleGlobalKeyUp);
    };
  }, [handleGlobalKeyDown, handleGlobalKeyUp]);

  return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp };
};

// 이렇게 쓰일 것임
// const hotkeys = [
//   {
//     global: true, // 글로벌이벤트인지.
//     combo: "ctrl+k", //단축키 조합
//     onKeyDown: (e) => {
//       alert("ctrl+k !");
//     },
//   },
// ];
// useHotKey(hotkeys);

export default useHotKey;
