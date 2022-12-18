import { useState, useEffect } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useSessionContext } from "../../../lib/session.context";
import ActiveLink from "../active-link";

export default function Navbar() {
	const { session } = useSessionContext();
	const [darkTheme, setDarkTheme] = useState(false);

	const onToggleTheme = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const themeButton = document.querySelector<HTMLElement>(".theme-button");
		if (!themeButton) return;

		themeButton.style.animation = "none";
		setTimeout(() => (themeButton.style.animation = ""), 10);

		setDarkTheme(!darkTheme);
		document.body.classList.toggle("dark");
		localStorage.theme = darkTheme ? "light" : "dark";
	};

	useEffect(() => {
		const theme = localStorage.theme as string | undefined;
		if (theme && theme === "dark") {
			setDarkTheme(true);
			document.body.classList.add("dark");
		}
	}, []);
	return (
		<>
			<nav className='flex-[2] h-full flex items-center gap-6 text-[2.5vmin]'>
				<ActiveLink href='/'>Home</ActiveLink>
				<ActiveLink href='/recipes'>Recipes</ActiveLink>
				<ActiveLink href='/recipes/create'>Add Recipes</ActiveLink>
			</nav>
			<div className='flex-1 h-full flex items-center justify-end select-none'>
				<div className='w-20 h-8 relative bg-transparent'>
					<button
						className='w-full h-full text-lg flex relative z-10 dark:text-white transition-colors duration-700'
						onClick={onToggleTheme}
					>
						<div className='flex-1 h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-l-2xl transition-colors duration-500'>
							<HiMoon />
						</div>
						<div className='text-xl flex-1 h-full w-full flex items-center justify-center bg-gray-300 dark:bg-transparent rounded-r-2xl transition-colors duration-500'>
							<HiSun />
						</div>
					</button>
					<div className='w-10 h-8 rounded-l-2xl z-20 absolute top-0 left-0 bg-yellow-300 dark:bg-purple-700 theme-button' />
				</div>
			</div>
		</>
	);
}
