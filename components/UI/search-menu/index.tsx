import { useSearchContext } from "../../../lib/search.context";
import { BiSearch } from "react-icons/bi";
import { useRecipeContext } from "../../../lib/recipe.context";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
	useCallback,
} from "react";

export default function SearchMenu({
	setToggleMenu,
}: {
	[key: string]: Dispatch<SetStateAction<boolean>>;
}) {
	const { recipes } = useRecipeContext();
	const [searchParams, setSearchParams] = useState("");
	const [filtered, setFiltered] = useState<Recipe[] | null>(null);

	const closeSearchMenu = useCallback(
		(event: KeyboardEvent) => {
			event.key === "Escape" && setToggleMenu(false);
		},
		[setToggleMenu]
	);

	useEffect(() => {
		if (searchParams.length <= 0) {
			setFiltered(null);
		} else {
			setFiltered(
				recipes?.filter((recipe) =>
					recipe.name.toLowerCase().includes(searchParams.toLowerCase().trim())
				) || null
			);
		}
	}, [searchParams, recipes]);

	useEffect(() => {
		window.addEventListener("keydown", closeSearchMenu);
		return () => window.removeEventListener("keydown", closeSearchMenu);
	}, [closeSearchMenu]);

	return (
		<div className='no-scroll-bar w-full h-screen overflow-hidden absolute flex justify-center left-0 top-0 bg-gray-300/30 backdrop-blur-sm z-40'>
			<div className='overflow-y-scroll pb-2 flex flex-col gap-2 mt-12 h-72 max-h-[18rem] w-11/12 lg:w-7/12 relative rounded-md bg-white dark:bg-black2'>
				<div className='w-full basis-11 text-sm font-medium rounded-t-md'>
					<input
						type='text'
						id='search-params'
						name='search-params'
						placeholder='Search recipes'
						className='w-full h-full outline-none border-b shadow-sm px-12 rounded-t-md bg-transparent dark:text-gray-300 dark:border-black6'
						onChange={(e) => setSearchParams(e.target.value)}
					/>
					<div className='absolute w-fit h-fit top-3 left-4 text-xl'>
						<BiSearch />
					</div>
					<button
						className='absolute w-fit h-fit right-4 top-3 text-xl'
						onClick={() => setToggleMenu(false)}
					>
						<MdOutlineClose />
					</button>
				</div>
				<div className='w-full flex-auto px-12 flex flex-col gap-4'>
					{filtered && filtered.length > 0 ? (
						filtered.map(({ id, name }, idx) => (
							<Link
								href={`/recipes/${id}`}
								key={id}
								className='flex justify-between items-center w-full px-2 py-3 rounded-md bg-sky-500 dark:bg-sky-700 dark:text-gray-300 text-white text-sm'
							>
								<div className='flex'>
									<div className='pr-3 font-bold'>{idx + 1}</div>
									<div className='font-semibold'>{name}</div>
								</div>
								<div className='text-lg'>
									<RxCaretRight />
								</div>
							</Link>
						))
					) : (
						<div className='w-full h-full flex items-center justify-center'>
							No Recipe Found
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
