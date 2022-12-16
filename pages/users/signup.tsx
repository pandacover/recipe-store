import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import type { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import { signUp } from "../../lib/supabase";
import { Spinner } from "../../components/UI";
import { useSessionContext } from "../../lib/session.context";

const SignUpPage: NextPage = () => {
	const { session } = useSessionContext();
	const [[email, password], setCreds] = useState(["", ""]);
	const [loading, setLoading] = useState(false);

	const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		signUp(email, password)
			.then(() => Router.push("/recipes"))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (session) Router.push("/recipes");
	}, [session]);

	return (
		<form className='auth-form' onSubmit={onSignUp}>
			<Head>
				<title>Recipe Store | Sign Up</title>
				<meta
					name='description'
					content='Create a new user for Recipe Store.'
				/>
				<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
			</Head>
			<div className='form-group'>
				<div className='text-3xl font-semibold'>Get started</div>
				<div className='text-sm'>Create a new account</div>
			</div>
			<div className='form-group group'>
				<label htmlFor='usermail' className='form-label'>
					Email
				</label>
				<input
					required
					type='email'
					id='usermail'
					name='usermail'
					disabled={loading}
					className='form-input'
					placeholder='john@doe.com'
					onChange={(e) => setCreds([e.target.value, password])}
				/>
				<div className='form-note'>Email is required *</div>
			</div>
			<div className='form-group group'>
				<label htmlFor='password' className='form-label'>
					Password
				</label>
				<input
					required
					id='password'
					type='password'
					name='password'
					disabled={loading}
					className='form-input'
					placeholder='Password'
					onChange={(e) => setCreds([email, e.target.value])}
				/>
				<div className='form-note'>Password is required *</div>
			</div>
			<div className='h-11 mb-4'>
				<button type='submit' className='form-button' disabled={loading}>
					{loading ? <Spinner /> : "Sign Up"}
				</button>
			</div>
			<div className='form-footer'>
				Have an account?{" "}
				<Link href='/users/signin' className='text-sky-600'>
					Sign In here
				</Link>
			</div>
		</form>
	);
};

export default SignUpPage;
