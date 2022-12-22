import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/UI";
import { getOneRecipe } from "../../lib/supabase";
import Heart from "../../components/UI/heart";

const RecipePage: NextPage = () => {
	const Router = useRouter();
	const [recipe, setRecipe] = useState<Recipe | null>(null);

	useEffect(() => {
		const id = Router.asPath.split("/")[2];
		if (id === "[id]") return;
		getOneRecipe(id)
			.then((data) => setRecipe(data[0]))
			.catch((err) => console.error(err));
	}, [Router]);

	if (!recipe) return <Spinner />;
	return (
		<div className='w-full px-4 pt-4'>
			<Head>
				<title>{`Recipe Store | ${recipe.name}`}</title>
				<meta name='description' content={recipe.content} />
				<meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>
			<div className='flex gap-6 mb-2 min-h-[3rem] items-center'>
				<div className='text-2xl font-bold text-sky-600'>{recipe.name}</div>
				<div className='pt-2'>
					<Heart recipe={recipe} />
				</div>
			</div>
			<div className='flex gap-2 mb-6'>
				{recipe.tags.map((tag, idx) => (
					<span key={`${recipe.id}-tag-${idx}`} className='tags'>
						{tag}
					</span>
				))}
			</div>
			<div className='min-w-full'>
				<pre className='w-full whitespace-pre-wrap font-Quicksand font-medium'>
					{recipe.content}
				</pre>
			</div>
			<div className='mt-6 text-right capitalize'>
				- Chef {recipe.author.split("@")[0]}
			</div>
		</div>
	);
};

export default RecipePage;
