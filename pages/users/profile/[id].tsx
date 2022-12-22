import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import { HiHeart } from "react-icons/hi2";
import { Spinner } from "../../../components/UI";
import { deleteRecipe } from "../../../lib/supabase";
import { useRecipeContext } from "../../../lib/recipe.context";
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
							className='flex flex-col px-3 py-2 shadow-md shadow-gray-200 dark:shadow-black'
						>
							<div>{recipe.name}</div>
							<div className='mt-2 flex gap-4'>
								<Link
									href={`/recipes/update/${recipe.id}`}
									className='text-sky-500 dark:text-sky-700'
								>
									Edit
								</Link>
								<button
									className='text-red-600'
									onClick={() => onDeleteRecipe(recipe.id)}
								>
									Delete
								</button>
								<div className='flex items-center gap-2 ml-auto'>
									{recipe.likes ? recipe.likes.length : 0}{" "}
									<span className='text-red-600'>
										<HiHeart />
									</span>
								</div>
							</div>
						</div>
					))}
			</div>
			<div className='mt-6 font-bold'>Recipes You Liked:</div>
			<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
				{recipes
					.filter(
						(recipe) =>
							recipe.likes && recipe.likes.includes(session.user.email || "")
					)
					.map((recipe) => (
						<div
							key={recipe.id}
							className='flex flex-col px-3 py-2 shadow-md shadow-gray-200 dark:shadow-black'
						>
							<div>{recipe.name}</div>
							<div className='mt-4 flex items-center'>
								<Link
									href={`/recipes/${recipe.id}`}
									className='text-sky-500 dark:text-sky-700'
								>
									Read
								</Link>
								<div className='flex items-center gap-2 ml-auto'>
									{recipe.likes ? recipe.likes.length : 0}{" "}
									<span className='text-red-600'>
										<HiHeart />
									</span>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ProfilePage;
