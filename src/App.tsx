import { usePdf } from '@mikecousins/react-pdf';
import { ElementRef, useEffect, useRef, useState } from 'react';

import { BrushColorPicker } from './brush-color-picker.tsx';
import { BrushSizeSlider } from './brush-size-slider.tsx';

const file = 'custom.pdf';

function App() {
  const stateRef = useRef({
    pressed: false,
    prevX: 0,
    prevY: 0,
    currX: 0,
    currY: 0
  });
  const canvasRef = useRef<ElementRef<'canvas'>>(null);
  const [thickness, setThickness] = useState<number>(2);
  const [color, setColor] = useState<string>('black');
  const [page] = useState<number>(1);
  // const { pdfDocument, pdfPage } =
  usePdf({
    canvasRef,
    file,
    page
  });
  useEffect(() => {
    const $canvas = canvasRef.current;
    if (!$canvas) return;
    const ctx = $canvas.getContext('2d');
    if (!ctx) return;

    const getMouesPosition = ({ offsetX, offsetY }: { offsetX: number; offsetY: number }) => {
      const x = ((offsetX * $canvas.width) / $canvas.clientWidth) | 0;
      const y = ((offsetY * $canvas.height) / $canvas.clientHeight) | 0;
      return { x, y };
    };

    const handler = function (e: MouseEvent) {
      const state = stateRef.current;
      state.prevX = state.currX;
      state.prevY = state.currY;
      const { x, y } = getMouesPosition(e);

      state.currX = x;
      state.currY = y;

      switch (e.type) {
        case 'mousedown':
          state.pressed = true;
          break;
        case 'mouseup':
        case 'mouseout':
          state.pressed = false;
          break;
        case 'mousemove':
          if (state.pressed) {
            ctx.beginPath();
            ctx.moveTo(state.prevX, state.prevY);
            ctx.lineTo(state.currX, state.currY);
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

    $canvas.addEventListener('mousemove', handler);
    $canvas.addEventListener('mousedown', handler);
    $canvas.addEventListener('mouseup', handler);
    $canvas.addEventListener('mouseout', handler);
    return () => {
      $canvas.removeEventListener('mousemove', handler);
      $canvas.removeEventListener('mousedown', handler);
      $canvas.removeEventListener('mouseup', handler);
      $canvas.removeEventListener('mouseout', handler);
    };
  }, [thickness, color]);
  return (
    <main className={'container mx-auto relative'}>
      <div>
        <span>menu</span>

        <BrushColorPicker color={color} setColor={setColor} />
        <BrushSizeSlider value={thickness} setValue={setThickness} />
      </div>
      <canvas className={'w-full h-full'} ref={canvasRef} />
    </main>
  );
}

export default App;
