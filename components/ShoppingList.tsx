"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Ingredient } from "@/data/recipes";

interface ShoppingListProps {
  ingredients: Ingredient[];
  servings: number;
  defaultServings: number;
  recipeSlug: string;
}

function formatAmount(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  if (rounded === Math.floor(rounded)) return rounded.toString();
  return rounded.toFixed(1).replace(/\.0$/, "");
}

export default function ShoppingList({
  ingredients,
  servings,
  defaultServings,
  recipeSlug,
}: ShoppingListProps) {
  const t = useTranslations("recipe");
  const ingredientT = useTranslations(`recipes.${recipeSlug}.ingredients`);
  const ratio = servings / defaultServings;
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggleItem(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="shopping-panel">
      <h3 className="section-title" style={{ marginBottom: "1rem" }}>
        {t("shoppingList")}
      </h3>
      <ul className="ingredient-list">
        {ingredients.map((ing) => (
          <li
            key={ing.key}
            className={`shopping-item ${checked[ing.key] ? "checked" : ""}`}
            onClick={() => toggleItem(ing.key)}
          >
            <input
              type="checkbox"
              className="shopping-checkbox"
              checked={!!checked[ing.key]}
              readOnly
            />
            <span className="shopping-text">{ingredientT(ing.key)}</span>
            <span className="shopping-amount">
              {formatAmount(ing.amount * ratio)} {ing.unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
