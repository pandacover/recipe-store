import { ActiveLink } from "../../";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineClose as MdClose } from "react-icons/md";
import { HiChevronDown as HiDown, HiMoon, HiSun } from "react-icons/hi2";
import { HiBars3BottomRight as HiBars } from "react-icons/hi2";
import { useSessionContext } from "../../../../lib/session.context";

type mobileMenuProps = {
	onToggleSearch: () => void;
	onToggleTheme: (
		e:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.ChangeEvent<HTMLSelectElement>
	) => void;
	darkTheme: boolean;
};

export default function MobileMenu({
	onToggleSearch,
	onToggleTheme,
	darkTheme,
}: mobileMenuProps) {
	const Router = useRouter();
	const { session } = useSessionContext();
	const [isMenuOpen, setMenuOpen] = useState(false);
	const authRoutes = useMemo(() => ["/users/signin", "/users/signup"], []);
	return (
		<div className='flex md:hidden flex-1 h-full relative justify-end items-center text-[2.5vmin]'>
			<button
				className='block text-[3vmin] data-[isopen="true"]:hidden'
				onClick={() => setMenuOpen(true)}
				data-isopen={isMenuOpen}
			>
				<HiBars />
			</button>
			<div
				data-show={isMenuOpen}
				className='data-[show="true"]:block p-4 hidden absolute right-0 top-[4rem] w-[80vmin] bg-gray-50 dark:bg-black4 shadow-lg dark:shadow-black z-30'
			>
				<div className='flex relative w-full h-full flex-col gap-4'>
					{session && (
						<ActiveLink
							href={`/users/profile/${session.user.id}`}
							className='w-fit py-1'
						>
							Profile
						</ActiveLink>
					)}
					{!authRoutes.includes(Router.asPath) && Router.asPath !== "/" && (
						<div>
							<button onClick={onToggleSearch} className='w-fit py-1 text-left'>
								Search
							</button>
						</div>
					)}
					<div className='w-full flex justify-between items-center pt-6'>
						<div className='font-light'>Switch Theme</div>
						<div className='w-28 h-11 relative flex items-center justify-between px-2 border-2 rounded-md'>
							<span className='text-lg'>
								{darkTheme ? <HiMoon /> : <HiSun />}
							</span>
							<select
								className='appearance-none absolute left-0 top-0 w-full h-full bg-transparent text-center font-medium'
								onChange={onToggleTheme}
								value={darkTheme ? "dark" : "true"}
							>
								<option value='light' className='dark:text-black'>
									Light
								</option>
								<option value='dark' className='dark:text-black'>
									Dark
								</option>
							</select>
							<span className='text-sm'>
								<HiDown />
							</span>
						</div>
					</div>
					<button
						className='absolute right-0 top-0 text-lg'
						onClick={() => setMenuOpen(false)}
					>
						<MdClose />
					</button>
				</div>
			</div>
		</div>
	);
}
