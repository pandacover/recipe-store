/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				Quicksand: "'Quicksand', sans-serif",
			},
			colors: {
				black1: "#101010",
				black2: "#121212",
				black3: "#141414",
				black4: "#161616",
				black5: "#181818",
				black6: "#202020",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
