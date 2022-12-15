export default function Spinner() {
	return (
		<div className='absolute w-full h-full left-0 top-0 flex items-center justify-center z-30 bg-gray-200'>
			<div className='w-6 h-6 border-4 border-dotted border-sky-600 border-b-gray-200 rounded-full animate-spin' />
		</div>
	);
}
