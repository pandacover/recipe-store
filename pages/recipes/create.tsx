import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { createRecipe } from "../../lib/supabase";
import type { FormEvent, ChangeEvent } from "react";
import { Spinner } from "../../components/UI";
import { useSessionContext } from "../../lib/session.context";

const CreatePage: NextPage = () => {
	const { session } = useSessionContext();
	const [recipe, setRecipe] = useState({
		name: "",
		content: "",
		tags: [] as string[],
	});

	const [loading, setLoading] = useState(false);

	const onSubmitRecipe = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!session) return;
		setLoading(true);
		createRecipe({
			...recipe,
			author: session.user?.email?.split("@")[0] || "",
		})
			.then((data) => console.log(data))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	};

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

	return (
		<>
			<Head>
				<title>Recipe Store | Create Recipe</title>
				<meta
					name='description'
					content={`Create the recipe for Recipe Store.`}
				/>
				<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>
			<div className='flex h-11 mb-4 items-center justify-center font-semibold text-2xl'>
				🍚 Note your recipe down 🍳
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
						{loading ? <Spinner /> : "Submit Recipe"}
					</button>
				</div>
			</form>
		</>
	);
};

export default CreatePage;
