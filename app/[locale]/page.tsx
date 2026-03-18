"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeCard from "@/components/RecipeCard";
import { getRecipesByCategory, getTotalRecipeCount, type Category } from "@/data/recipes";

export default function HomePage() {
  const t = useTranslations("home");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filteredRecipes = getRecipesByCategory(activeCategory);
  const totalRecipes = getTotalRecipeCount();

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <Image src="/austrian-flag.svg" alt="Austrian Flag" width={36} height={36} className="header-flag" />
            Austrian <span>Kitchen</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>{t("hero")}</h1>
          <p><span className="recipe-count">{totalRecipes}</span> {t("subtitle")}</p>
        </section>

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <section className="recipes-container">
          {filteredRecipes.length > 0 ? (
            <div className="recipes-grid">
              {filteredRecipes.map((recipe, index) => (
                <RecipeCard key={recipe.slug} recipe={recipe} index={index} />
              ))}
            </div>
          ) : (
            <div className="no-results">{t("noResults")}</div>
          )}
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Austrian Kitchen. Made with ❤️ in Austria.
      </footer>
    </>
  );
}
