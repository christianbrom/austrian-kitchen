"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getRecipeBySlug } from "@/data/recipes";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ServingCalculator from "@/components/ServingCalculator";
import IngredientList from "@/components/IngredientList";
import ShoppingList from "@/components/ShoppingList";
import RecipeSteps from "@/components/RecipeSteps";

export default function RecipePage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = params.locale as string;
  const recipe = getRecipeBySlug(slug);

  const t = useTranslations("recipe");
  const homeT = useTranslations("home");
  const recipeT = useTranslations(`recipes.${slug}`);

  const [servings, setServings] = useState(recipe?.defaultServings ?? 4);

  if (!recipe) {
    return (
      <div className="recipe-page">
        <p>Recipe not found.</p>
      </div>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  const stepCount = recipe.stepCount;

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href={`/${locale}`} className="header-logo">
            <Image src="/austrian-flag.svg" alt="Austrian Flag" width={36} height={36} className="header-flag" />
            Austrian <span>Kitchen</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="recipe-page">
        <Link href={`/${locale}`} className="back-link">
          {t("backToHome")}
        </Link>

        <div className="recipe-hero">
          <div className="recipe-hero-image">
            <Image
              src={recipe.image}
              alt={recipeT("title")}
              width={800}
              height={600}
              priority
            />
          </div>
          <div className="recipe-hero-info">
            <h1 className="recipe-hero-title">{recipeT("title")}</h1>
            <p className="recipe-hero-desc">{recipeT("description")}</p>
            <div className="recipe-meta">
              <div className="meta-item">
                <div className="meta-item-label">{t("prepTime")}</div>
                <div className="meta-item-value">
                  {recipe.prepTime} {t("minutes")}
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-item-label">{t("cookTime")}</div>
                <div className="meta-item-value">
                  {recipe.cookTime} {t("minutes")}
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-item-label">{t("totalTime")}</div>
                <div className="meta-item-value">
                  {totalTime} {t("minutes")}
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-item-label">{t("difficulty")}</div>
                <div className="meta-item-value">
                  {homeT(`difficulty.${recipe.difficulty}`)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">{t("ingredients")}</h2>
          <ServingCalculator
            servings={servings}
            onServingsChange={setServings}
          />
        </div>

        <div className="recipe-content-grid">
          <IngredientList
            ingredients={recipe.ingredients}
            servings={servings}
            defaultServings={recipe.defaultServings}
            recipeSlug={recipe.slug}
          />
          <ShoppingList
            ingredients={recipe.ingredients}
            servings={servings}
            defaultServings={recipe.defaultServings}
            recipeSlug={recipe.slug}
          />
        </div>

        <RecipeSteps recipeSlug={recipe.slug} stepCount={stepCount} />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Austrian Kitchen. Made with ❤️ in Austria.
      </footer>
    </>
  );
}
