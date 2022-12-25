import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import type { NextPage } from "next";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { Spinner, Heart } from "../../components/UI";
import { getRecipes } from "../../lib/supabase";
import { useRecipeContext } from "../../lib/recipe.context";
import { useSessionContext } from "../../lib/session.context";

const RecipesPage: NextPage = () => {
	const dateOptions: { [key: string]: string } = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	const { recipes, setRecipes } = useRecipeContext();
	const { session } = useSessionContext();

	useEffect(() => {
		getRecipes()
			.then((data) => setRecipes(data))
			.catch((err) => console.log(err));
	}, [setRecipes]);

	if (!recipes || !session) return <Spinner />;

	return (
		<div className='relative w-full h-fit-content'>
			<Head>
				<title>Recipe Store | Recipes</title>
				<meta name='description' content='All the recipes for Recipe Store.' />
				<meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>

			<div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 gap-6 h-fit'>
				{recipes &&
					recipes.map((recipe) => (
						<div
							key={recipe.id}
							className='w-full aspect-square p-2 bg-white dark:bg-black2 relative border dark:border-black5 rounded-3xl'
						>
							<figure className='relative w-full h-[60%] bg-sky-600 dark:bg-sky-700 rounded-3xl'>
								<Image
									src='/assets/recipe-fallback.svg'
									alt='two people cooking'
									fill={true}
								/>
							</figure>
							<div className='absolute px-2 h-14 w-[calc(100%-2rem)] left-4 top-[calc(60%-0.5rem)] -translate-y-[50%]  flex items-center rounded-3xl bg-white dark:bg-black2'>
								<Link
									href={`/recipes/${recipe.id}`}
									className='flex-[3] text-[2.5vmin] py-2 flex items-center justify-center rounded-3xl bg-sky-600 dark:bg-sky-700 hover:bg-sky-700 dark:hover:bg-sky-600 text-white'
								>
									Read More
								</Link>
								<div className='flex-1 flex justify-center text-[3.5vmin] rounded-full text-red-600'>
									<Heart
										recipe={recipe}
										className='text-[3.5vmin] inline-flex p-2 justify-center items-center rounded-full'
									/>
								</div>
							</div>
							<div className='w-full h-[calc(40%-1.25rem)] mt-7 flex flex-col justify-end gap-1 sm:gap-0 sm:justify-between py-2'>
								<div className='text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap'>
									{recipe.name}
								</div>
								<div className='font-medium capitalize'>
									Chef {recipe.author.split("@")[0]}
								</div>
								<div className='text-xs flex items-center justify-between'>
									<div>
										{new Date(recipe.created_at).toLocaleDateString(
											"us-en",
											dateOptions
										)}
									</div>
									<div className='font-bold'>
										{recipe.likes ? recipe.likes.length : 0} likes
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default RecipesPage;
