"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface RangeInputProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
  disabled?: boolean;
}

const RangeInput = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = "",
  disabled = false,
}: RangeInputProps) => {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  // Use refs to track current values during drag for immediate updates
  const currentValuesRef = useRef<[number, number]>(value);
  const [minValue, maxValue] = value;
  
  // Update ref when value prop changes
  useEffect(() => {
    currentValuesRef.current = value;
  }, [value]);

  const clamp = useCallback(
    (val: number) => Math.min(Math.max(val, min), max),
    [min, max]
  );

  const getPercentage = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return min;
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      return clamp(steppedValue);
    },
    [min, max, step, clamp]
  );

  const handleStart = useCallback(
    (type: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(type);
    },
    [disabled]
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const newValue = getValueFromPosition(clientX);
      const [currentMin, currentMax] = currentValuesRef.current;

      if (isDragging === "min") {
        const newMin = Math.min(newValue, currentMax - step);
        const updatedValue: [number, number] = [clamp(newMin), currentMax];
        currentValuesRef.current = updatedValue;
        onChange(updatedValue);
      } else {
        const newMax = Math.max(newValue, currentMin + step);
        const updatedValue: [number, number] = [currentMin, clamp(newMax)];
        currentValuesRef.current = updatedValue;
        onChange(updatedValue);
      }
    },
    [isDragging, getValueFromPosition, step, onChange, clamp]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled || isDragging) return;
      const clientX =
        "touches" in e && e.touches.length > 0
          ? e.touches[0].clientX
          : (e as React.MouseEvent).clientX;
      const clickValue = getValueFromPosition(clientX);
      const minDistance = Math.abs(clickValue - minValue);
      const maxDistance = Math.abs(clickValue - maxValue);

      if (minDistance < maxDistance) {
        const newMin = Math.min(clickValue, maxValue - step);
        onChange([clamp(newMin), maxValue]);
      } else {
        const newMax = Math.max(clickValue, minValue + step);
        onChange([minValue, clamp(newMax)]);
      }
    },
    [disabled, isDragging, getValueFromPosition, minValue, maxValue, step, onChange, clamp]
  );

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);
  const trackWidth = maxPercentage - minPercentage;

  return (
    <div className={`relative ${className}`}>
      {/* Track */}
      <div
        ref={sliderRef}
        onClick={handleTrackClick}
        onTouchStart={handleTrackClick}
        className={`relative h-2 rounded-full bg-[#e0e4eb] cursor-pointer touch-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {/* Filled segment */}
        <div
          className={`absolute h-2 rounded-full bg-[#f26522] ${
            isDragging ? "" : "transition-all duration-150"
          }`}
          style={{
            left: `${minPercentage}%`,
            width: `${trackWidth}%`,
          }}
        />

        {/* Min handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing touch-none ${
            isDragging === "min" ? "scale-110" : "transition-transform"
          } ${disabled ? "cursor-not-allowed" : ""}`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={handleStart("min")}
          onTouchStart={handleStart("min")}
        >
          <div className="relative w-5 h-5">
            {/* Shadow */}
            <div className="absolute inset-0 rounded-full bg-black/10 blur-sm" />
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#f26522] bg-[#f26522]" />
            {/* Inner circle */}
            <div className="absolute inset-[3px] rounded-full bg-[#fcf0e8]" />
          </div>
        </div>

        {/* Max handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing touch-none ${
            isDragging === "max" ? "scale-110" : "transition-transform"
          } ${disabled ? "cursor-not-allowed" : ""}`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={handleStart("max")}
          onTouchStart={handleStart("max")}
        >
          <div className="relative w-5 h-5">
            {/* Shadow */}
            <div className="absolute inset-0 rounded-full bg-black/10 blur-sm" />
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#f26522] bg-[#f26522]" />
            {/* Inner circle */}
            <div className="absolute inset-[3px] rounded-full bg-[#fcf0e8]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;

