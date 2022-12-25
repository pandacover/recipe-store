import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import { HiHeart } from "react-icons/hi2";
import { Heart, Spinner } from "../../../components/UI";
import { deleteRecipe } from "../../../lib/supabase";
import { RecipeContext, useRecipeContext } from "../../../lib/recipe.context";
import { useSessionContext } from "../../../lib/session.context";

const ProfilePage: NextPage = () => {
	const { recipes } = useRecipeContext();
	const { session } = useSessionContext();
	const [loading, setLoading] = useState(false);

	const onDeleteRecipe = (id: string) => {
		setLoading(true);
		deleteRecipe(id)
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	};

	if (!session || !recipes || loading) return <Spinner />;

	return (
		<div className='w-full px-4 h-full relative text-sm'>
			<div className='flex gap-2 items-center'>
				<div className='font-bold'>Email:</div>
				<div className=''>{session.user.email}</div>
			</div>
			<div className='mt-6 font-bold'>Your Recipes:</div>
			<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
				{recipes
					.filter((recipe) => recipe.author === session.user.email)
					.map((recipe) => (
						<div
							key={recipe.id}
							className='w-full h-24 bg-gray-100 dark:bg-black3 border dark:border-black4 relative rounded-md p-3'
						>
							<div className='text-[3vmin] font-bold text-ellipsis whitespace-nowrap overflow-hidden'>
								{recipe.name}
							</div>
							<div className='mt-4 flex gap-2 items-center'>
								<Link
									className='w-20 h-8 flex items-center justify-center bg-sky-600 text-white rounded-3xl'
									href={`/recipes/update/${recipe.id}`}
								>
									Edit
								</Link>
								<button
									className='w-20 h-8 flex items-center justify-center bg-red-600 text-white rounded-3xl'
									onClick={() => onDeleteRecipe(recipe.id)}
								>
									Delete
								</button>
								<div className='flex items-center ml-auto text-[3vmin] font-semibold gap-1'>
									{recipe.likes ? recipe.likes.length : 0}
									<Heart recipe={recipe} className='text-[3.5vmin]' />
								</div>
							</div>
						</div>
					))}
			</div>
			<div className='mt-12 font-bold'>Recipes You Liked:</div>
			<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
				{recipes
					.filter(
						(recipe) =>
							recipe.likes && recipe.likes.includes(session.user.email || "")
					)
					.map((recipe) => (
						<div
							key={recipe.id}
							className='w-full h-24 bg-gray-100 dark:bg-black3 border dark:border-black4 relative rounded-md p-3'
						>
							<div className='text-[3vmin] font-bold text-ellipsis whitespace-nowrap overflow-hidden'>
								{recipe.name}
							</div>
							<div className='mt-4 flex gap-2 items-center'>
								<Link
									className='w-20 h-8 flex items-center justify-center bg-sky-600 text-white rounded-3xl'
									href={`/recipes/${recipe.id}`}
								>
									Read
								</Link>
								<div className='flex items-center ml-auto text-[3vmin] font-semibold gap-1'>
									{recipe.likes ? recipe.likes.length : 0}
									<Heart recipe={recipe} className='text-[3.5vmin]' />
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ProfilePage;
