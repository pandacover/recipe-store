import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "../../../components/UI";
import type { FormEvent, ChangeEvent } from "react";
import { useSessionContext } from "../../../lib/session.context";
import { updateRecipe, getOneRecipe } from "../../../lib/supabase";

const UpdatePage: NextPage = () => {
	const Router = useRouter();
	const { session } = useSessionContext();
	const [recipe, setRecipe] = useState({
		id: "",
		name: "",
		content: "",
		tags: [] as string[],
	});

	const [loading, setLoading] = useState(false);

	const onSubmitRecipe = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!session) return;
		setLoading(true);
		updateRecipe({
			...recipe,
			author: session.user?.email || "",
		})
			.then((data) => console.log(data))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		const id = Router.asPath.split("/")[3];
		if (id === "[id]") return;
		getOneRecipe(id)
			.then((data: Recipe[]) => {
				const { created_at, ...rest } = data[0];
				setRecipe({ ...rest });
			})
			.catch((error) => console.error(error));
	}, [Router]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (e.target.name !== "tags")
			setRecipe({ ...recipe, [e.target.name]: e.target.value });
		else
			setRecipe({
				...recipe,
				tags: e.target.value.split(" ").filter((tag) => tag !== ""),
			});
	};

	if (!recipe.id) return <Spinner />;

	return (
		<>
			<Head>
				<title>Recipe Store | Update Recipe</title>
				<meta
					name='description'
					content={`Create the recipe for Recipe Store.`}
				/>
				<meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>
			<div className='flex h-11 mb-4 items-center justify-center font-semibold text-2xl'>
				🍚 Update Your Recipe 🍳
			</div>
			<form
				className='w-full min-h-screen px-6 grid create-grid-form gap-2'
				onSubmit={onSubmitRecipe}
			>
				<div className='w-full h-full recipe-name-area md:py-0 py-2'>
					<label htmlFor='name' className='sr-only'>
						Recipe Name
					</label>
					<input
						type='text'
						name='name'
						id='recipe-name'
						title='Recipe Name'
						className='w-full h-full form-input'
						placeholder='recipe name'
						onChange={handleChange}
						value={recipe.name}
						disabled={loading}
					/>
				</div>
				<div className='w-full h-full recipe-tags-area md:py-0 py-2'>
					<label htmlFor='tags' className='sr-only'>
						Recipe Tags
					</label>
					<input
						type='text'
						name='tags'
						id='recipe-tags'
						title='recipe tags'
						className='w-full h-full form-input'
						placeholder='tags seperated by space'
						value={recipe.tags.join(" ")}
						onChange={handleChange}
						disabled={loading}
					/>
				</div>
				<div className='w-full h-full recipe-content-area'>
					<label htmlFor='content' className='sr-only'>
						Recipe Content
					</label>
					<textarea
						name='content'
						id='recipe-content'
						title='recipe steps'
						className='w-full h-full form-input resize-none'
						placeholder='Recipe Here...'
						onChange={handleChange}
						value={recipe.content}
						disabled={loading}
					/>
				</div>
				<div className='h-11 recipe-submit-area mt-3'>
					<button
						type='submit'
						className='form-button'
						disabled={loading}
						title='Submit Recipe'
					>
						{loading ? <Spinner /> : "Update Recipe"}
					</button>
				</div>
			</form>
		</>
	);
};

export default UpdatePage;
