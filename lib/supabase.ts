import { supaConfig } from "./config";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";

const supabase = createClient(supaConfig.url, supaConfig.key);

export const signUp = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error) throw error;
	return data;
};

export const signIn = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw error;
	return data;
};

export const createRecipe = async (
	recipe: Omit<Recipe, "id" | "created_at" | "likes">
) => {
	const { data, error } = await supabase.from("recipes").insert({ ...recipe });
	if (error) throw error;
	return data;
};

export const getRecipes = async () => {
	const { data, error } = await supabase.from("recipes").select("*");
	if (error) throw error;
	return data;
};

export const getOneRecipe = async (id: string) => {
	const { data, error } = await supabase
		.from("recipes")
		.select("*")
		.eq("id", id);
	if (error) throw error;
	return data;
};

export const updateRecipe = async (recipe: Partial<Recipe>) => {
	const { error } = await supabase
		.from("recipes")
		.update(recipe)
		.eq("id", recipe.id);
	if (error) throw error;
};

export const deleteRecipe = async (id: string) => {
	const { error } = await supabase.from("recipes").delete().eq("id", id);
	if (error) throw error;
};

// utilities

export const likeRecipe = async (recipe: Partial<Recipe>, email: string) => {
	if (recipe.likes) {
		if (recipe.likes.includes(email))
			recipe.likes = recipe.likes.filter((item) => item !== email);
		else recipe.likes.push(email);
	} else {
		recipe.likes = [email];
	}

	try {
		await updateRecipe(recipe);
	} catch (error) {
		throw error;
	}
};

export default supabase;
