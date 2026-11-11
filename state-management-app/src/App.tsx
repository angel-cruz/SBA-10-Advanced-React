
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";

import "./App.css";

function App() {
  return (
    <>
      {/* Shared navigation appears on every page */}
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/category/:categoryName"
            element={<CategoryPage />}
          />

          <Route
            path="/recipe/:recipeId"
            element={<RecipeDetail />}
          />

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/search" element={<SearchPage />} />

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
