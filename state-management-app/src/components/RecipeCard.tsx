
import { Link } from "react-router-dom";
import type { Recipe } from "../types/Recipe";

type RecipeCardProps = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <p>{recipe.strCategory}</p>
      <Link to={`/recipe/${recipe.idMeal}`}>View Recipe</Link>
    </div>
  );
}

export default RecipeCard;