import * as React from "react";
import * as Slider from "@radix-ui/react-slider";

type RangeSliderProps = {
  value: number[];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
  onSeekStart: () => void;
  onSeekEnd: () => void;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  max,
  min,
  step,
  onValueChange,
  onSeekStart,
  onSeekEnd,
}) => {
  return (
    <Slider.Root
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      className="relative flex items-center select-none touch-none w-full radix-orientation-horizontal:h-5 radix-orientation-vertical:flex-col radix-orientation-vertical:w-5 radix-orientation-vertical:h-24"
    >
      <Slider.Track className="bg-slate-800 relative flex-grow rounded-full radix-orientation-horizontal:h-[3px] radix-orientation-vertical:w-[3px]">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        onPointerDown={onSeekStart}
        onTouchStart={onSeekStart}
        onPointerUp={onSeekEnd}
        onTouchEnd={onSeekEnd}
        className="block w-5 h-5 bg-white shadow rounded-xl relative"
      />
    </Slider.Root>
  );
};

RangeSlider.displayName = "RangeSlider";
