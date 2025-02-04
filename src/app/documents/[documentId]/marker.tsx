import { ChevronDown } from "lucide-react";

interface MarkerProps {
  position: number;
  isLeft: boolean;
  onMouseDown: () => void;
}

const Marker = ({ position, isLeft, onMouseDown }: MarkerProps) => {
  return (
    <div
      className="absolute cursor-ew-resize"
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
        translate: isLeft ? "-50%" : "50%",
      }}
      onMouseDown={onMouseDown}
    >
      <ChevronDown className="size-8 text-amber-200" />
    </div>
  );
};

export default Marker;
