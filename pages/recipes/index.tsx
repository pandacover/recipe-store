import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { MdOutlineClose } from "react-icons/md";
import { getRecipes } from "../../lib/supabase";
import { useSessionContext } from "../../lib/session.context";

const RecipesPage: NextPage<{ recipes: Recipe[] }> = ({ recipes }) => {
	const { session } = useSessionContext();
	const [searchParams, setSearchParams] = useState("");

	const checkParams = (name: string, tags: string[]) => {
		return (
			searchParams.length <= 0 ||
			name.toLowerCase().includes(searchParams.toLowerCase()) ||
			tags.some((tag) => tag.toLowerCase().includes(searchParams.toLowerCase()))
		);
	};

	return (
		<div className='w-10/12 md:w-9/12 h-full mx-auto relative py-3'>
			<Head>
				<title>Recipe Store | Recipes</title>
				<meta name='description' content='All the recipes for Recipe Store.' />
				<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>
			<header className='text-lg font-bold'>
				Hey{" "}
				<span className='text-sky-500 capitalize'>
					{session?.user.email?.split("@")[0]}
				</span>{" "}
				👋
			</header>
			<div className='text-2xl font-bold text-center my-6'>
				Here are some quick recipes
			</div>
			<div className='mb-6 flex justify-center gap-2'>
				<div className='w-8/12 md:6/12 relative'>
					<input
						type='text'
						className='w-full px-2 py-3 bg-gray-200 focus-within:bg-gray-300 outline-none'
						placeholder='search recipe...'
						value={searchParams}
						onChange={(e) => setSearchParams(e.target.value)}
					/>
					{searchParams.length > 0 && (
						<button
							tabIndex={-1}
							className='absolute right-4 top-4'
							onClick={() => setSearchParams("")}
						>
							<MdOutlineClose />
						</button>
					)}
				</div>
				<Link
					title='Add a new recipe'
					href='/recipes/create'
					className='block p-3 text-xs md:text-base bg-sky-500 hover:bg-sky-600 text-white'
				>
					Add Recipe
				</Link>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{recipes &&
					recipes.map(({ id, name, tags, content }) =>
						checkParams(name, tags) ? (
							<div key={id} className='flex flex-col gap-3 max-w-full'>
								<div className='text-xl font-semibold'>{name}</div>
								<div className='text-wrap-3'>{content}</div>
								<div className='text-sm text-white flex flex-wrap gap-2'>
									{tags.map((tag, idx: number) => (
										<button
											className='py-1 px-2 rounded-md bg-black inline-block'
											key={`${name}-${tag}-${idx}`}
											onClick={() => setSearchParams(tag)}
											title={`search for ${tag}`}
										>
											{tag}
										</button>
									))}
								</div>
								<div className='h-11'>
									<Link
										href={`/recipes/${id}`}
										className='form-button'
										title='Read about this recipe'
									>
										View Recipe
									</Link>
								</div>
							</div>
						) : (
							""
						)
					)}
			</div>
		</div>
	);
};

export const getServerSideProps = async () => {
	const recipes = await getRecipes();
	return {
		props: {
			recipes,
		},
	};
};

export default RecipesPage;
