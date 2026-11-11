
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { RecipeResponse } from "../types/Recipe";

function RecipeDetail() {
  const { recipeId } = useParams();

  const url =
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(recipeId || "")}`;

  const { data, loading, error } = useFetch<RecipeResponse>(url);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const recipe = data?.meals?.[0];

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  // TheMealDB stores ingredients in 20 separate fields
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measurement = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measurement || ""} ${ingredient}`.trim());
    }
  }

  const saved = isFavorite(recipe.idMeal);

  function handleFavorite() {
    if (!recipe) return;

    if (saved) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe.idMeal);
    }
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="detail-image"
      />

      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Origin:</strong> {recipe.strArea}</p>

      <button onClick={handleFavorite}>
        {saved ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p className="instructions">{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Cooking Video
        </a>
      )}
    </div>
  );
}

export default RecipeDetail;
