
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


export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type CategoryResponse = {
  categories: Category[];
};