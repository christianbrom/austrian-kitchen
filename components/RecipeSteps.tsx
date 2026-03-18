import { useTranslations } from "next-intl";

interface RecipeStepsProps {
  recipeSlug: string;
  stepCount: number;
}

export default function RecipeSteps({ recipeSlug, stepCount }: RecipeStepsProps) {
  const t = useTranslations("recipe");
  const stepsT = useTranslations(`recipes.${recipeSlug}.steps`);

  return (
    <div className="recipe-steps">
      <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
        {t("steps")}
      </h2>
      <div className="steps-list">
        {Array.from({ length: stepCount }, (_, i) => (
          <div key={i} className="step-card">
            <div className="step-number">{i + 1}</div>
            <p className="step-text">{stepsT(String(i))}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
