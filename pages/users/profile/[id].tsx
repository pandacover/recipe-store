import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "../../../components/UI";
import { useRecipeContext } from "../../../lib/recipe.context";
import { useSessionContext } from "../../../lib/session.context";
import { deleteRecipe } from "../../../lib/supabase";

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
				{recipes.map((recipe) => {
					if (recipe.author === session.user.email)
						return (
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
								</div>
							</div>
						);
				})}
			</div>
		</div>
	);
};

export default ProfilePage;
