import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import type { NextPage } from "next";
import { HiHeart } from "react-icons/hi2";
import { Spinner } from "../../components/UI";
import { getRecipes } from "../../lib/supabase";
import { useRecipeContext } from "../../lib/recipe.context";

const RecipesPage: NextPage = () => {
	const dateOptions: { [key: string]: string } = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	const { recipes, setRecipes } = useRecipeContext();

	useEffect(() => {
		getRecipes()
			.then((data) => setRecipes(data))
			.catch((err) => console.log(err));
	}, [setRecipes]);

	if (!recipes) return <Spinner />;

	return (
		<div className='relative w-full h-fit-content'>
			<Head>
				<title>Recipe Store | Recipes</title>
				<meta name='description' content='All the recipes for Recipe Store.' />
				<meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 gap-6 h-fit'>
				{recipes &&
					recipes.map(({ name, id, created_at, author, likes, content }) => (
						<Link href={`/recipes/${id}`} key={id} className='card-container'>
							<div className='font-bold'>{name}</div>
							<div className='text-wrap-3'>{content}</div>
							<div className='text-sm font-semibold capitalize'>
								- Chef {author.split("@")[0]}
							</div>
							<div className='mt-auto flex justify-between'>
								<div className='text-sm'>
									{new Date(created_at).toLocaleDateString(
										"us-en",
										dateOptions
									)}
								</div>
								<div className='flex items-center gap-1'>
									{likes ? likes.length : 0}
									<span className='text-red-600'>
										<HiHeart />
									</span>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default RecipesPage;
