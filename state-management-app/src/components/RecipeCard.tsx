
import { Link } from "react-router-dom";
import type { Recipe } from "../types/Recipe";

type RecipeCardProps = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <p>View Recipe</p>
    </Link>
  );
}

export default RecipeCard;