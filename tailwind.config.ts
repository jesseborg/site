import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				"background-pulse": {
					from: { opacity: "0.75" },
					to: { opacity: "0.8" },
				},
				"background-spin": {
					to: { transform: "rotate(360deg)" },
				},
			},
			animation: {
				background:
					"background-pulse 6s ease-in-out infinite alternate, background-spin 120s linear infinite",
			},
		},
	},
	plugins: [],
};
export default config;
