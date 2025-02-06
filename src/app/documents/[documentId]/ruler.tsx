"use client";

import React, { useRef, useState } from "react";
import Marker from "./marker";

const markers = Array.from({ length: 91 }, (_, i) => i);

const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMarkerMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMarkerMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef) {
      const rulerContainer = rulerRef.current?.querySelector("#ruler");

      if (rulerContainer) {
        const containerRect = rulerContainer.getBoundingClientRect();

        const relativeMarkerX = e.clientX - containerRect.left;
        const markerPosition = Math.max(0, Math.min(relativeMarkerX, 1000));

        if (isDraggingLeft) {
          const maxLeftPosition = 1000 - rightMargin - 200;
          const newLeftPosition = Math.min(markerPosition, maxLeftPosition);

          setLeftMargin(newLeftPosition);
        }

        if (isDraggingRight) {
          const maxRightPosition = 1000 - (leftMargin + 200);
          const newRightPosition = Math.max(1000 - markerPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition,
          );

          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  return (
    <div
      ref={rulerRef}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="mt-2 w-full select-none border-b border-stone-800"
    >
      <div
        id="ruler"
        className="relative mx-auto flex w-full max-w-[1000px] items-end justify-between gap-2"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          onMouseDown={handleLeftMarkerMouseDown}
          isDragging={isDraggingLeft}
        />
        {markers.map((marker) => (
          <div key={marker}>
            {marker % 10 === 0 && (
              <div className="flex w-[1px] flex-col items-center gap-1">
                <span className="text-[12px] text-amber-200">
                  {marker / 10 + 1}
                </span>
                <div className="h-2 w-[1px] bg-amber-200" />
              </div>
            )}
            {marker % 5 === 0 && marker % 10 !== 10 && (
              <div className="h-1.5 w-[1px] bg-amber-200" />
            )}
            {marker % 5 !== 0 && <div className="h-1 w-[1px] bg-amber-200" />}
          </div>
        ))}
        <Marker
          position={rightMargin}
          isLeft={false}
          onMouseDown={handleRightMarkerMouseDown}
          isDragging={isDraggingRight}
        />
      </div>
    </div>
  );
};

export default Ruler;
