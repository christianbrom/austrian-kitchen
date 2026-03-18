"use client";

import { useTranslations } from "next-intl";
import { ALL_CATEGORIES, type Category } from "@/data/recipes";

interface CategoryFilterProps {
  activeCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const t = useTranslations("categories");

  return (
    <div className="filters-container">
      <div className="filters">
        <button
          className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => onCategoryChange("all")}
        >
          {t("all")}
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {t(cat)}
          </button>
        ))}
      </div>
    </div>
  );
}
