
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecipeList from "../components/RecipeList";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { RecipeResponse } from "../types/Recipe";

function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const url =
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

  const { data, loading, error } = useFetch<RecipeResponse>(url);

  if (!query.trim()) {
    return <p>Enter a recipe name to search.</p>;
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Search Results for "{query}"</h1>

      {data?.meals?.length ? (
        <RecipeList recipes={data.meals} />
      ) : (
        <p>No recipes found. Try another search.</p>
      )}
    </div>
  );
}

export default SearchPage;
