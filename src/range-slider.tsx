import { ChangeEvent } from 'react';

export function RangeSlider({
  value,
  setValue
}: {
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <input
      type='range'
      min='2'
      max='10'
      value={value}
      onInput={({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.valueAsNumber)}
    />
  );
}
