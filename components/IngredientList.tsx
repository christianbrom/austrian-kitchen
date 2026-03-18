"use client";

import { useTranslations } from "next-intl";
import type { Ingredient } from "@/data/recipes";

interface IngredientListProps {
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

export default function IngredientList({
  ingredients,
  servings,
  defaultServings,
  recipeSlug,
}: IngredientListProps) {
  const t = useTranslations("recipe");
  const ingredientT = useTranslations(`recipes.${recipeSlug}.ingredients`);
  const ratio = servings / defaultServings;

  return (
    <div className="ingredients-panel">
      <h3 className="section-title" style={{ marginBottom: "1rem" }}>
        {t("ingredients")}
      </h3>
      <ul className="ingredient-list">
        {ingredients.map((ing) => (
          <li key={ing.key} className="ingredient-item">
            <span className="ingredient-name">{ingredientT(ing.key)}</span>
            <span className="ingredient-amount">
              {formatAmount(ing.amount * ratio)} {ing.unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
