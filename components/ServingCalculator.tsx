"use client";

import { useTranslations } from "next-intl";

interface ServingCalculatorProps {
  servings: number;
  onServingsChange: (servings: number) => void;
}

export default function ServingCalculator({
  servings,
  onServingsChange,
}: ServingCalculatorProps) {
  const t = useTranslations("recipe");

  return (
    <div className="serving-calculator">
      <span className="serving-label">{t("servings")}:</span>
      <div className="serving-controls">
        <button
          className="serving-btn"
          onClick={() => onServingsChange(Math.max(1, servings - 1))}
          disabled={servings <= 1}
          aria-label="Decrease servings"
        >
          −
        </button>
        <span className="serving-count">{servings}</span>
        <button
          className="serving-btn"
          onClick={() => onServingsChange(Math.min(20, servings + 1))}
          disabled={servings >= 20}
          aria-label="Increase servings"
        >
          +
        </button>
      </div>
    </div>
  );
}
