import { useCallback, useEffect, useRef, useState } from "react";
import { PenPlugin } from "./plugins/pen";

const calculateCoord = (e, canvas) => {
  const rect = canvas.getBoundingClientRect();

  return {
    x: e.pageX - rect.left - window.scrollX,
    y: e.pageY - rect.top - window.scrollY,
  };
};

const Paint = ({
  command = "pen",
  color = "#000000",
  lineWidth = 2,
  width = 600,
  height = 400,
  plugins = [new PenPlugin()],
  style,
  className,
}) => {
  const [currentColor, setCurrentColor] = useState(color);
  const [currentCommand, setCurrentCommand] = useState(command);
  const [currentLineWidth, setCurrentLineWidth] = useState(lineWidth);
  const [currentPlugins, setCurrentPlugins] = useState({});
  const [drawing, setDrawing] = useState(0);

  const canvasRef = useRef();

  const scale = typeof window === "undefined" ? 1 : window.devicePixelRatio; // 높은 해상도를 고려해서 retina 지원위해 *2 등 스케일 조정

  const canvasDefaultStyle = {
    userSelect: "none", // 그림 그리는 중의 드래그 등 막음
    WebkitUserSelect: "none",
  };

  const canvasSizeStyle = {
    width,
    height,
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.width = width * scale;
    canvasRef.current.height = height * scale;

    canvasRef.current.getContext("2d").scale(scale, scale);

    plugins.forEach((plugin) => {
      plugin.canvas = canvasRef.current; ///////////////
    });

    setCurrentPlugins(
      Object.assign(
        {},
        ...plugins.map((plugin) => ({
          [plugin.name]: plugin,
        }))
      )
    );
  }, [canvasRef.current, scale]);

  // 그리기 이벤트 구현
  const handleDrawStart = useCallback(
    (e) => {
      e.preventDefault();

      const { x, y } = calculateCoord(e, canvasRef.current);

      //그리는 작업은 프러그인에서!
      currentPlugins[currentCommand].draw({
        x,
        y,
        width, //pen plugin에선 필요없지만 추후에 필요할 수 있으니
        height,
        scale,
        color: currentColor,
        lineWidth: currentLineWidth,
        state: "draw-started",
      });

      setDrawing(true);
    },
    //prettier-ignore
    [canvasRef,currentCommand,currentColor,currentLineWidth,currentPlugins,height,width,scale]
  );
  const handleDrawing = useCallback(
    (e) => {
      e.preventDefault();
      if (!drawing) return;
      const { x, y } = calculateCoord(e, canvasRef.current);

      currentPlugins[currentCommand].draw({
        x,
        y,
        width,
        height,
        scale,
        color: currentColor,
        lineWidth: currentLineWidth,
        state: "drawing",
      });
    },
    //prettier-ignore
    [canvasRef,currentCommand,currentColor,currentLineWidth,currentPlugins,height,width,scale, drawing]
  );
  const handleDrawFinish = useCallback(
    (e) => {
      e.preventDefault();
      if (!drawing) return;
      const { x, y } = calculateCoord(e, canvasRef.current);

      currentPlugins[currentCommand].draw({
        x,
        y,
        width,
        height,
        scale,
        color: currentColor,
        lineWidth: currentLineWidth,
        state: "draw-finished",
      });

      setDrawing(false);
    },
    //prettier-ignore
    [canvasRef,currentCommand,currentColor,currentLineWidth,currentPlugins,height,width,scale, drawing]
  );

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleDrawStart}
      onMouseMove={handleDrawing}
      onMouseUp={handleDrawFinish}
      style={{ ...canvasDefaultStyle, ...canvasSizeStyle, ...style }}
      className={className}
    />
  );
};

export default Paint;
