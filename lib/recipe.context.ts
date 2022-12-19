import { createContext, Dispatch, SetStateAction, useContext } from "react";

type RecipeType = {
	recipes: Recipe[] | null;
	setRecipes: Dispatch<SetStateAction<Recipe[] | null>>;
};

export const RecipeContext = createContext<RecipeType | null>(null);

export const useRecipeContext = () => {
	const context = useContext(RecipeContext);
	if (!context) throw new Error("Wrap useRecipeContext with Recipe Context");

	return context;
};
