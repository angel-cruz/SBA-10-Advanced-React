
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Recipe Discovery</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ({favorites.length})</Link>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="search"
          placeholder="Search recipes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search recipes"
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navbar;
