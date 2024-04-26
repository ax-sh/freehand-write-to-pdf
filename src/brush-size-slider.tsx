import { ChangeEvent } from 'react';

export function BrushSizeSlider({
  value,
  setValue
}: {
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className={'flex gap-2 items-center w-full'}>
      <span>Brush size</span>
      <input
        type='range'
        min='2'
        max='10'
        value={value}
        onInput={({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.valueAsNumber)}
      />
    </label>
  );
}
