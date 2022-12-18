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
					<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
				</Head>

				<div className='flex flex-col h-full px-4'>
					{recipes &&
						recipes.map(({ name, id, created_at, author }) => (
							<div
								key={id}
								className='grid grid-cols-4 gap-2 py-4 border-b border-b-300 dark:border-black6 last-of-type:border-transparent dark:last-of-type:border-transparent'
							>
								<div className='col-span-2 text-ellipsis whitespace-nowrap overflow-hidden font-medium text-sky-500 dark:text-sky-700'>
									<Link
										href={`/recipes/${id}`}
										className='hover:underline'
										title={name}
									>
										{name}
									</Link>
								</div>
								<div
									className='col-span-1 overflow-hidden text-ellipsis whitespace-nowrap'
									title={author}
								>
									{author}
								</div>
								<div
									className='col-spab-1 overflow-hidden text-ellipsis whitespace-nowrap'
									title={created_at}
								>
									{new Date(created_at).toLocaleDateString(
										"en-US",
										dateOptions
									)}
								</div>
							</div>
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
