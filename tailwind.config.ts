import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			keyframes: {
				'background-pulse': {
					from: { opacity: '0.75' },
					to: { opacity: '0.8' }
				},
				'background-spin': {
					to: { transform: 'rotate(360deg)' }
				},
				'ping': {
					'75%, 100%': {
						transform: 'scale(var(--ping-scale, 2))',
						opacity: '0'
					}
				}
			},
			animation: {
				background:
					'background-pulse 6s ease-in-out infinite alternate, background-spin 120s linear infinite',
				ping: 'ping var(--ping-duration, 1s) cubic-bezier(0, 0, 0.2, 1) infinite'
			}
		}
	},
	plugins: []
};
export default config;
