
import { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import RecipeList from "../components/RecipeList";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { Recipe } from "../types/Recipe";

function FavoritesPage() {
  const { favorites } = useFavorites();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadFavorites() {
      setLoading(true);
      setError("");

      try {
        // Fetch every favorite recipe by its ID
        const results = await Promise.all(
          favorites.map(async (id) => {
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
              { signal: controller.signal }
            );

            if (!response.ok) {
              throw new Error("Could not load favorites");
            }

            const data = await response.json();
            return data.meals?.[0] as Recipe | undefined;
          })
        );

        if (!controller.signal.aborted) {
          setRecipes(
            results.filter((recipe): recipe is Recipe => Boolean(recipe))
          );
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Something went wrong"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadFavorites();

    return () => controller.abort();
  }, [favorites]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>My Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p>You have no favorites yet. Browse recipes and add some!</p>
      ) : recipes.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        <p>No saved recipes could be found.</p>
      )}
    </div>
  );
}

export default FavoritesPage;
