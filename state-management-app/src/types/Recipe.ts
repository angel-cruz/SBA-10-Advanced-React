
export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string | null;
  strArea?: string | null;
  strInstructions?: string | null;
  strYoutube?: string | null;
  [key: string]: string | null | undefined;
};

export type RecipeResponse = {
  meals: Recipe[] | null;
};


export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type CategoryResponse = {
  categories: Category[];
};