import Link from "next/link";
import { useState, useEffect } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useSessionContext } from "../../../lib/session.context";

export default function Navbar() {
	const { session } = useSessionContext();
	const [darkTheme, setDarkTheme] = useState(false);

	const onToggleTheme = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
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
			<div className='flex-1 flex items-center gap-2 font-semibold'>
				<Link href='/recipes'>
					{(session && session.user.email?.split("@")[0]) || "Recipe Store"}
				</Link>
			</div>
			<nav className='flex-[2] flex items-center justify-end select-none'>
				<div className='w-20 h-8 relative bg-transparent'>
					<button
						className='w-full h-full text-lg flex relative z-20 dark:text-white transition-colors duration-700'
						onClick={onToggleTheme}
					>
						<div className='flex-1 h-full flex items-center justify-center bg-transparent dark:bg-gray-700 rounded-l-2xl transition-all duration-500'>
							<HiSun />
						</div>
						<div className='flex-1 h-full w-full flex items-center justify-center bg-gray-300 dark:bg-transparent rounded-r-2xl transition-all duration-500'>
							<HiMoon />
						</div>
					</button>
					<div className='w-10 h-8 rounded-l-2xl z-10 bg-yellow-300 absolute top-0 left-0 dark:bg-purple-600 dark:rounded-l-none dark:rounded-r-2xl dark:translate-x-[100%] transition-[translate] translate-colors duration-500' />
				</div>
			</nav>
		</>
	);
}
