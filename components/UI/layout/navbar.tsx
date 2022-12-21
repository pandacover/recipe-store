import ActiveLink from "../active-link";
import SearchMenu from "../search-menu";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSessionContext } from "../../../lib/session.context";
import DesktopMenu from "./utility-menu/desk-menu";
import MobileMenu from "./utility-menu/mob-menu";

export default function Navbar() {
	const Router = useRouter();
	const { session } = useSessionContext();
	const [darkTheme, setDarkTheme] = useState(false);
	const [toggleSearch, setToggleSearch] = useState(false);

	const onToggleTheme = (
		e:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		const themeButton = document.querySelector<HTMLElement>(".theme-button");
		if (!themeButton) return;

		themeButton.style.animation = "none";
		setTimeout(() => (themeButton.style.animation = ""), 10);

		setDarkTheme(!darkTheme);
		document.body.classList.toggle("dark");
		localStorage.theme = darkTheme ? "light" : "dark";
	};

	const onToggleSearch = () => {
		setToggleSearch(!toggleSearch);
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
			<nav className='flex-1 h-full flex items-center gap-6 text-[2.5vmin]'>
				<ActiveLink href='/'>Home</ActiveLink>
				<ActiveLink href='/recipes'>Recipes</ActiveLink>
				<ActiveLink href='/recipes/create'>Add Recipe</ActiveLink>
			</nav>
			<DesktopMenu
				onToggleSearch={onToggleSearch}
				onToggleTheme={onToggleTheme}
			/>
			<MobileMenu
				onToggleSearch={onToggleSearch}
				onToggleTheme={onToggleTheme}
				darkTheme={darkTheme}
			/>
			{toggleSearch && <SearchMenu setToggleMenu={setToggleSearch} />}
		</>
	);
}
