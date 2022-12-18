import Head from "next/head";
import { getOneRecipe } from "../../lib/supabase";
import type { GetServerSidePropsContext, NextPage } from "next";

const RecipePage: NextPage<{ recipe: Recipe }> = ({ recipe }) => {
	return (
		<div className='w-full px-4 pt-4'>
			<Head>
				<title>{`Recipe Store | ${recipe.name}`}</title>
				<meta name='description' content={recipe.content} />
				<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>
			<div className='text-2xl font-bold text-sky-600 mb-2'>{recipe.name}</div>
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
		</div>
	);
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { req, res } = ctx;
	const id = req.url?.split("/")[2] as string;
	const data = await getOneRecipe(id);
	return {
		props: {
			recipe: data[0],
		},
	};
};

export default RecipePage;
