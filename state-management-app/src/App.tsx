
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import RecipeList from "./components/RecipeList";
import { useFavorites } from "./context/FavoritesContext";
import type { RecipeResponse } from "./types/Recipe";
import "./App.css";

function App() {

  // Store the text entered by the user
  const [search, setSearch] = useState("");

  // Store the submitted search term
  const [searchTerm, setSearchTerm] = useState("");

  // Access favorite recipes
  const { favorites } = useFavorites();

  // Create the API URL
  const apiUrl =
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;

  // Fetch recipes using our custom hook
  const { data, loading, error } =
    useFetch<RecipeResponse>(apiUrl);

  // Get recipes from the API response
  const recipes = data?.meals || [];

  // Handle search form submission
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchTerm(search.trim());
  }

  return (
    <div className="container">

      <h1>Recipe Discovery App</h1>

      <p>Search for your favorite meals!</p>

      {/* Search form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      {/* Favorite recipe count */}
      <h3>Favorite Recipes: {favorites.length}</h3>

      {/* Loading state */}
      {loading && <p>Loading recipes...</p>}

      {/* Error state */}
      {error && <p className="error">{error}</p>}

      {/* Display recipes */}
      {!loading && !error && (
        <>
          {recipes.length > 0 ? (
            <RecipeList recipes={recipes} />
          ) : (
            <p>No recipes found.</p>
          )}
        </>
      )}

    </div>
  );
}

export default App;
