import { useEffect, useState } from "react";
import { likeRecipe } from "../../../lib/supabase";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useSessionContext } from "../../../lib/session.context";

export default function Heart({ recipe }: { recipe: Recipe }) {
	const [isLiked, setIsLiked] = useState(false);
	const [isBeingLiked, setIsBeingLiked] = useState(false);
	const { session } = useSessionContext();

	useEffect(() => {
		if (
			session &&
			session?.user &&
			recipe.likes &&
			recipe.likes.includes(session.user?.email || "")
		)
			setIsLiked(true);
		else setIsLiked(false);
	}, [session, recipe]);

	const onLiked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setIsLiked(!isLiked);
		likeRecipe(recipe, session?.user.email || "");
		if (!isLiked) {
			setIsBeingLiked(true);
			setTimeout(() => setIsBeingLiked(false), 1000);
		}
	};

	return (
		<div className='text-lg text-red-600'>
			{!isLiked ? (
				<button className='' onClick={onLiked}>
					<HiOutlineHeart />
				</button>
			) : isBeingLiked ? (
				<button className='animate-ping' onClick={onLiked}>
					<HiHeart />
				</button>
			) : (
				<button className='' onClick={onLiked}>
					<HiHeart />
				</button>
			)}
		</div>
	);
}
