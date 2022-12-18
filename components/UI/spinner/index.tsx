export default function Spinner() {
	return (
		<div className='absolute w-full h-full left-0 top-0 flex items-center justify-center z-30 bg-gray-50 dark:bg-black1'>
			<div className='w-6 h-6 border-4 border-dotted border-sky-500 border-b-transparent rounded-full animate-spin' />
		</div>
	);
}
