
import {
  createContext,
  useContext,
  type ReactNode
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

// Define what our context provides
type FavoritesContextType = {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

// Create the context
const FavoritesContext =
  createContext<FavoritesContextType | undefined>(undefined);

// Provider component
export function FavoritesProvider({
  children
}: {
  children: ReactNode;
}) {

  // Save favorites using our custom hook
  const [favorites, setFavorites] =
    useLocalStorage<string[]>("favoriteRecipes", []);

  // Add a recipe to favorites
  function addFavorite(id: string) {
    setFavorites((previous) => {
      if (previous.includes(id)) {
        return previous;
      }

      return [...previous, id];
    });
  }

  // Remove a recipe from favorites
  function removeFavorite(id: string) {
    setFavorites((previous) =>
      previous.filter((favoriteId) => favoriteId !== id)
    );
  }

  // Check whether a recipe is a favorite
  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook for accessing the context
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}
