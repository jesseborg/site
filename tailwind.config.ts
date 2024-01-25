import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{ts,tsx,mdx}', './public/**/*.svg'],
	theme: {
		extend: {
			colors: {
				theme: {
					50: 'rgb(var(--theme-50) / <alpha-value>)',
					100: 'rgb(var(--theme-100) / <alpha-value>)',
					200: 'rgb(var(--theme-200) / <alpha-value>)',
					300: 'rgb(var(--theme-300) / <alpha-value>)',
					400: 'rgb(var(--theme-400) / <alpha-value>)',
					500: 'rgb(var(--theme-500) / <alpha-value>)',
					600: 'rgb(var(--theme-600) / <alpha-value>)',
					700: 'rgb(var(--theme-700) / <alpha-value>)',
					800: 'rgb(var(--theme-800) / <alpha-value>)',
					900: 'rgb(var(--theme-900) / <alpha-value>)',
					950: 'rgb(var(--theme-950) / <alpha-value>)'
				},
				widget: {
					50: 'rgb(var(--widget-50) / <alpha-value>)',
					100: 'rgb(var(--widget-100) / <alpha-value>)',
					200: 'rgb(var(--widget-200) / <alpha-value>)',
					300: 'rgb(var(--widget-300) / <alpha-value>)',
					400: 'rgb(var(--widget-400) / <alpha-value>)',
					500: 'rgb(var(--widget-500) / <alpha-value>)',
					600: 'rgb(var(--widget-600) / <alpha-value>)',
					700: 'rgb(var(--widget-700) / <alpha-value>)',
					800: 'rgb(var(--widget-800) / <alpha-value>)',
					900: 'rgb(var(--widget-900) / <alpha-value>)'
				}
			},
			borderColor: {
				theme: {
					50: 'rgb(var(--theme-50) / <alpha-value>)',
					100: 'rgb(var(--theme-100) / <alpha-value>)',
					200: 'rgb(var(--theme-200) / <alpha-value>)',
					300: 'rgb(var(--theme-300) / <alpha-value>)',
					400: 'rgb(var(--theme-400) / <alpha-value>)',
					500: 'rgb(var(--theme-500) / <alpha-value>)',
					600: 'rgb(var(--theme-600) / <alpha-value>)',
					700: 'rgb(var(--theme-700) / <alpha-value>)',
					800: 'rgb(var(--theme-800) / <alpha-value>)',
					900: 'rgb(var(--theme-900) / <alpha-value>)',
					950: 'rgb(var(--theme-950) / <alpha-value>)'
				}
			},
			fontFamily: {
				'sans': ['var(--font-inter)'],
				'sans-display': ['var(--font-inter-display)'],
				'satoshi': ['var(--font-satoshi)']
			},
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
				},
				'slideUpAndFade': {
					from: { opacity: '0', transform: 'translateY(2px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {},
				'slide-out': {}
			},
			animation: {
				'background':
					'background-pulse 6s ease-in-out infinite alternate, background-spin 120s linear infinite',
				'ping': 'ping var(--ping-duration, 1s) cubic-bezier(0, 0, 0.2, 1) infinite',
				'slideUpAndFade': 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-in': 'slide-in',
				'slide-out': 'slide-out'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
export default config;
