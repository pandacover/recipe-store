import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { MdOutlineClose } from "react-icons/md";
import { getRecipes } from "../../lib/supabase";
import { useSessionContext } from "../../lib/session.context";
import Image from "next/image";

const RecipesPage: NextPage<{ recipes: Recipe[] }> = ({ recipes }) => {
	const { session } = useSessionContext();
	const [searchParams, setSearchParams] = useState("");
	const dateOptions: { [key: string]: string } = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	const checkParams = (name: string, tags: string[]) => {
		return (
			searchParams.length <= 0 ||
			name.toLowerCase().includes(searchParams.toLowerCase()) ||
			tags.some((tag) => tag.toLowerCase().includes(searchParams.toLowerCase()))
		);
	};

	return (
		<div className='absolute left-0 top-0 w-full h-full'>
			<div className='relative w-full h-full'>
				<Head>
					<title>Recipe Store | Recipes</title>
					<meta
						name='description'
						content='All the recipes for Recipe Store.'
					/>
					<meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
				</Head>

				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full px-4 gap-4'>
					{recipes &&
						recipes.map(({ name, id, created_at, author }) => (
							<Link
								href={`/recipes/${id}`}
								key={id}
								className='relative aspect-square block shadow-lg shadow-gray-300 dark:shadow-black'
							>
								<div className='absolute left-0 top-0 w-full h-full z-10'>
									<Image
										src='/assets/recipe-fallback.svg'
										alt='Recipe Image'
										className='px-2'
										fill={true}
									/>
								</div>
								<div className='relative z-20 p-2 bg-gray-100/70 dark:bg-black2/50 backdrop-blur w-full h-full flex flex-col justify-end gap-2'>
									<div
										className='mb-auto text-3xl font-bold block text-ellipsis whitespace-nowrap overflow-hidden'
										title={name}
									>
										{name}
									</div>
									<div className='capitalize font-medium' title={author}>
										Chef {author}
									</div>
									<div className='text-sm' title={created_at}>
										{new Date(created_at).toLocaleDateString(
											"en-US",
											dateOptions
										)}
									</div>
								</div>
							</Link>
						))}
				</div>
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
