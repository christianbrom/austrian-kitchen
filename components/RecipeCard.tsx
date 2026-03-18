import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function RecipeCard({ recipe, index = 99 }: RecipeCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const recipeT = useTranslations(`recipes.${recipe.slug}`);
  const homeT = useTranslations("home");

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link href={`/${locale}/recipe/${recipe.slug}`} className="recipe-card">
      <div className="recipe-card-image">
        <Image
          src={recipe.image}
          alt={recipeT("title")}
          width={640}
          height={440}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 4}
          loading={index < 4 ? "eager" : "lazy"}
        />
        <div className="recipe-card-badges">
          <span className="badge badge-time">
            {totalTime} {homeT("cookTime")}
          </span>
          <span className="badge badge-difficulty">
            {homeT(`difficulty.${recipe.difficulty}`)}
          </span>
        </div>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipeT("title")}</h3>
        <p className="recipe-card-desc">{recipeT("description")}</p>
      </div>
    </Link>
  );
}
