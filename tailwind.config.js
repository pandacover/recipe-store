/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				Quicksand: "'Quicksand', sans-serif",
			},
		},
	},
	plugins: [],
};
