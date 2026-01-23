"use client";

import { useState } from "react";
import RangeInput from "./RangeInput";

/**
 * Example usage of RangeInput component
 * This demonstrates how to use the RangeInput component with different configurations
 */
const RangeInputExample = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([69000, 8869000]);
  const [percentageRange, setPercentageRange] = useState<[number, number]>([10, 50]);
  const [simpleRange, setSimpleRange] = useState<[number, number]>([20, 80]);

  const formatPrice = (value: number) => value.toLocaleString("vi-VN");

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-text-strong)]">
        Range Input Component Examples
      </h1>

      {/* Price Range Example */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          Khoảng giá
        </h2>
        <RangeInput
          min={0}
          max={10000000}
          step={1000}
          value={priceRange}
          onChange={setPriceRange}
        />
        <div className="flex gap-4 text-sm text-gray-3">
          <span>Từ: {formatPrice(priceRange[0])} đ</span>
          <span>Đến: {formatPrice(priceRange[1])} đ</span>
        </div>
      </div>

      {/* Percentage Range Example */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          % Giảm giá
        </h2>
        <RangeInput
          min={0}
          max={100}
          step={1}
          value={percentageRange}
          onChange={setPercentageRange}
        />
        <div className="flex gap-4 text-sm text-gray-3">
          <span>Từ: {percentageRange[0]}%</span>
          <span>Đến: {percentageRange[1]}%</span>
        </div>
      </div>

      {/* Simple Range Example */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          Simple Range (0-100)
        </h2>
        <RangeInput
          min={0}
          max={100}
          step={1}
          value={simpleRange}
          onChange={setSimpleRange}
        />
        <div className="flex gap-4 text-sm text-gray-3">
          <span>Min: {simpleRange[0]}</span>
          <span>Max: {simpleRange[1]}</span>
        </div>
      </div>

      {/* Disabled Example */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          Disabled State
        </h2>
        <RangeInput
          min={0}
          max={100}
          step={1}
          value={[30, 70]}
          onChange={() => {}}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default RangeInputExample;

