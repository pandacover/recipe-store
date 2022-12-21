import { useMemo } from "react";
import { ActiveLink } from "../../";
import { useRouter } from "next/router";
import { HiMoon, HiSun } from "react-icons/hi2";
import { useSessionContext } from "../../../../lib/session.context";

type desktopMenuProps = {
	onToggleSearch: () => void;
	onToggleTheme: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function DesktopMenu({
	onToggleSearch,
	onToggleTheme,
}: desktopMenuProps) {
	const Router = useRouter();
	const authRoutes = useMemo(() => ["/users/signin", "/users/signup"], []);
	const { session } = useSessionContext();

	return (
		<div className='hidden md:flex flex-1 h-full items-center justify-end select-none gap-4 text-[2.5vmin]'>
			{session && (
				<ActiveLink href={`/users/profile/${session.user.id}`}>
					Profile
				</ActiveLink>
			)}
			{!authRoutes.includes(Router.asPath) && Router.asPath !== "/" && (
				<div>
					<button onClick={onToggleSearch}>Search</button>
				</div>
			)}
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
	);
}
