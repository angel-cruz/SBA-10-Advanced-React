
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecipeList from "../components/RecipeList";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { RecipeResponse } from "../types/Recipe";

function CategoryPage() {
  const { categoryName } = useParams();

  const url =
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName || "")}`;

  const { data, loading, error } = useFetch<RecipeResponse>(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>{categoryName} Recipes</h1>

      {data?.meals?.length ? (
        <RecipeList recipes={data.meals} />
      ) : (
        <p>No recipes found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
