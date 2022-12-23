import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
	return (
		<div className='w-full h-full flex items-center px-6'>
			<div className='flex-1 h-full flex flex-col justify-center'>
				<div className='text-[3.5vmin] font-bold'>Recipe Store</div>
				<div className='text-[2.8vmin]'>
					Join our community, share your recipes and learn some from others! :D
				</div>
				<div className='mt-6 flex flex-wrap md:fap-4 gap-2 text-[3vmin]'>
					<Link
						href='/users/signup'
						className='primary-btn bg-sky-500 dark:bg-sky-700'
					>
						Get Started
					</Link>
					<Link
						href='/recipes'
						className='primary-btn border border-sky-500 dark:border-sky-700'
					>
						Explore
					</Link>
				</div>
			</div>
			<div className='flex-1 relative w-full h-full flex items-center justify-center'>
				<Image
					src='/assets/recipe-fallback.svg'
					alt=''
					width={400}
					height={400}
				/>
			</div>
		</div>
	);
};

export default HomePage;
