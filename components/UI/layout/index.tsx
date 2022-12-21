import Navbar from "./navbar";
import Router from "next/router";
import Spinner from "../spinner";
import { RiHeartFill } from "react-icons/ri";
import { Session } from "@supabase/supabase-js";
import { RecipeContext } from "../../../lib/recipe.context";
import supabase, { getRecipes } from "../../../lib/supabase";
import { SessionContext } from "../../../lib/session.context";
import { ReactNode, useState, useEffect, useMemo } from "react";

type componentProps = {
	children: ReactNode;
};

export default function Layout({ children }: componentProps) {
	return (
		<SessionProvider>
			<RecipeProvider>
				<div className='max-w-[1368px] min-h-screen mx-auto relative flex flex-col pb-16 dark:bg-black1 dark:text-gray-200'>
					<header className='basis-[4rem] px-4 flex items-center'>
						<Navbar />
					</header>
					<main className='w-full relative flex-auto'>{children}</main>
					<footer className='absolute bottom-4 left-0 w-full px-2 flex items-center justify-center h-4'>
						Made with
						<span className='mx-2 text-red-600'>
							<RiHeartFill />
						</span>
						by<span className='font-semibold text-sky-600 ml-2'>Luv</span>
					</footer>
				</div>
			</RecipeProvider>
		</SessionProvider>
	);
}

const SessionProvider = ({ children }: componentProps) => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(false);

	const authRouters = useMemo(() => ["/users/signin", "/users/signup"], []);

	useEffect(() => {
		if (authRouters.includes(Router.asPath) || session || Router.asPath === "/")
			return;
		setLoading(true);
		supabase.auth
			.getSession()
			.then(({ data: { session }, error }) => {
				if (error) throw error;
				if (!session) Router.push("/users/signin");
				setSession(session);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, [setSession, authRouters, session]);

	if (loading) return <Spinner />;

	return (
		<SessionContext.Provider value={{ session, setSession }}>
			{children}
		</SessionContext.Provider>
	);
};

const RecipeProvider = ({ children }: componentProps) => {
	const [recipes, setRecipes] = useState<Recipe[] | null>(null);

	useEffect(() => {
		getRecipes()
			.then((data) => setRecipes(data))
			.catch((err) => console.error(err));
	}, []);

	if (!recipes) <Spinner />;

	return (
		<RecipeContext.Provider value={{ recipes, setRecipes }}>
			{children}
		</RecipeContext.Provider>
	);
};
