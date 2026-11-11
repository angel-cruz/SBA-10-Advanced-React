
import type { Recipe } from "../types/Recipe";
import RecipeCard from "./RecipeCard";

type RecipeListProps = {
  recipes: Recipe[];
};

function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
