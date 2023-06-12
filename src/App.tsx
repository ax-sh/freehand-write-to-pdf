import "./App.scss";
import { usePdf } from "@mikecousins/react-pdf";
import { useEffect, useRef, useState } from "react";

const file = "custom.pdf";

function RangeSlider({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <input
      type="range"
      min="2"
      max="10"
      value={value}
      onInput={({ target }) => setValue(+target.value)}
    />
  );
}
function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thickness, setThickness] = useState<number>(2);
  const [page] = useState<number>(1);
  const [color] = useState<string>("black");
  // const { pdfDocument, pdfPage } =
  usePdf({
    canvasRef,
    file,
    page,
  });
  useEffect(() => {
    let flag = false,
      prevX = 0,
      prevY = 0,
      currX = 0,
      currY = 0;
    const $canvas = canvasRef.current;
    const ctx = $canvas.getContext("2d");
    const getMouesPosition = ({ offsetX, offsetY }) => {
      const x = ((offsetX * $canvas.width) / $canvas.clientWidth) | 0;
      const y = ((offsetY * $canvas.height) / $canvas.clientHeight) | 0;
      return { x, y };
    };

    const handler = function (e) {
      prevX = currX;
      prevY = currY;
      const { x, y } = getMouesPosition(e);

      currX = x;
      currY = y;

      switch (e.type) {
        case "mousedown":
          flag = true;
          break;
        case "mouseup":
        case "mouseout":
          flag = false;
          break;
        case "mousemove":
          if (flag) {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = color;
            ctx.lineWidth = thickness;
            ctx.stroke();
            ctx.closePath();
          }
          break;
        default:
          console.log(e);
      }
    };

    $canvas.addEventListener("mousemove", handler);
    $canvas.addEventListener("mousedown", handler);
    $canvas.addEventListener("mouseup", handler);
    $canvas.addEventListener("mouseout", handler);
    return () => {
      $canvas.removeEventListener("mousemove", handler);
      $canvas.removeEventListener("mousedown", handler);
      $canvas.removeEventListener("mouseup", handler);
      $canvas.removeEventListener("mouseout", handler);
    };
  }, [thickness, color]);
  return (
    <div>
      <div>
        <span>menu</span>
        <RangeSlider value={thickness} setValue={setThickness} />
      </div>
      <canvas className={"w-full h-full"} ref={canvasRef} />
    </div>
  );
}

export default App;
