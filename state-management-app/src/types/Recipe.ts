
export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string | null;
  strArea: string | null;
};

export type RecipeResponse = {
  meals: Recipe[] | null;
};
