export function BrushColorPicker({
  color,
  setColor
}: {
  color: string;
  setColor: (e: string) => void;
}) {
  return (
    <label className={'flex justify-center items-center w-full'}>
      <span>Brush color</span>
      <input type='color' value={color} onChange={(e) => setColor(e.target.value)} />
    </label>
  );
}
