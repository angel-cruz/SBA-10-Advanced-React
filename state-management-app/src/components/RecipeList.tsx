
import type { Recipe } from "../types/Recipe";
import { useFavorites } from "../context/FavoritesContext";

// Define component props
type RecipeListProps = {
  recipes: Recipe[];
};

function RecipeList({ recipes }: RecipeListProps) {

  // Access favorites from Context
  const {
    addFavorite,
    removeFavorite,
    isFavorite
  } = useFavorites();

  return (
    <div className="recipe-list">

      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.idMeal}>

          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />

          <h3>{recipe.strMeal}</h3>

          <p>Category: {recipe.strCategory || "Unknown"}</p>

          <p>Origin: {recipe.strArea || "Unknown"}</p>

          {isFavorite(recipe.idMeal) ? (
            <button
              onClick={() => removeFavorite(recipe.idMeal)}
            >
              Remove Favorite
            </button>
          ) : (
            <button
              onClick={() => addFavorite(recipe.idMeal)}
            >
              Add to Favorites
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default RecipeList;
