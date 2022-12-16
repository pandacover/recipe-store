import { supaConfig } from "./config";
import { createClient } from "@supabase/supabase-js";

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
	recipe: Omit<Recipe, "id" | "created_at">
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

export default supabase;
