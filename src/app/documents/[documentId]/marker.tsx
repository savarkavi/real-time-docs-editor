import { ChevronDown } from "lucide-react";

interface MarkerProps {
  position: number;
  isLeft: boolean;
  onMouseDown: () => void;
  isDragging: boolean;
}

const Marker = ({ position, isLeft, onMouseDown, isDragging }: MarkerProps) => {
  return (
    <div
      className="absolute z-[10] cursor-ew-resize"
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
        translate: isLeft ? "-50%" : "50%",
      }}
      onMouseDown={onMouseDown}
    >
      <ChevronDown className="size-8 text-amber-200" />
      <div
        className={`absolute left-1/2 top-5 h-screen w-[1px] -translate-x-1/2 border border-dotted border-amber-100 ${isDragging ? "block" : "hidden"}`}
      />
    </div>
  );
};

export default Marker;
