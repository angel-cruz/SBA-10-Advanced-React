
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { CategoryResponse } from "../types/Recipe";

function Home() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const { data, loading, error } = useFetch<CategoryResponse>(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Explore Recipe Categories</h1>
      <p>Choose a category to discover delicious meals.</p>

      <div className="recipe-grid">
        {data?.categories.map((category) => (
          <Link
            to={`/category/${encodeURIComponent(category.strCategory)}`}
            key={category.idCategory}
            className="recipe-card"
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
            />
            <h3>{category.strCategory}</h3>
            <p>Explore Category</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
