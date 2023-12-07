import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;
const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`;
const Handle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border: 2px solid #44b;
  border-radius: 50%;
  background-color: white;
  cursor: grab;
`;
const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background-color: #44b;
`;
const Slider = ({
  min = 0,
  max = 100,
  step = 0.1,
  defaultValue,
  onChange,
  ...props
}) => {
  const sliderRef = useRef(null);

  const [value, setValue] = useState(defaultValue ? defaultValue : min);
  const [dragging, setDragging] = useState(false);
  const handleMouseDown = useCallback(() => {
    // 상태가 변해도 내부가 변하지 않을 함수이니까 useCallback
    setDragging(true);
  }, []);
  const handleMouseUp = useCallback((e) => {
    setDragging(false);
  }, []);
  useEffect(() => {
    // useEffect 안에서 만드는 이유는 :
    const handleMouseMove = (e) => {
      if (!dragging) return;

      const handleOffset = e.pageX - sliderRef.current.offsetLeft;
      const sliderWidth = sliderRef.current.offsetWidth;

      const track = handleOffset / sliderWidth;
      let newValue;
      if (track < 0) {
        newValue = min;
      } else if (track > 1) {
        newValue = max;
      } else {
        // 트랙 안쪽
        newValue = Math.round((min + (max - min) * track) / step) * step;
        newValue = Math.min(max, Math.max(min, newValue)); // 반올림, min보다 작아지는 등 이슈에 대응하여 안정적으로 구현하기 위해 한번 더 계산
      }
      setValue(newValue);
      onChange && onChange(newValue);
    };

    document.addEventListener("mousemove", handleMouseMove); // 핸들 움직이는걸 딱 레일에만 두면, 레일에서 벗어나자마자 동작을 안함. ux를 고려하여 전역으로 잡는다.
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [value, min, max, dragging, sliderRef, handleMouseUp, onChange, step]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <SliderContainer ref={sliderRef} {...props}>
      <Rail />
      <Track style={{ width: `${percentage}%` }} />
      <Handle
        onMouseDown={handleMouseDown}
        style={{ left: `${percentage}%` }}
      />
    </SliderContainer>
  );
};

export default Slider;
