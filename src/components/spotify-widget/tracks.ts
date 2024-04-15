import { CSSProperties } from 'react';

/* Loosely follows the Spotify API */

export type Track = {
	theme: CSSProperties;
	id: string;
	uri: string;
	name: string;
	coverArt: {
		url: string;
	};
	duration: {
		totalMilliseconds: number;
	};
	previews: {
		audioPreview: {
			url: string;
		};
	};
	artists: {
		items: Array<{
			uri: string;
			profile: {
				name: string;
			};
		}>;
	};
};

export const tracks: Array<Track> = [
	{
		theme: {
			'--widget-50': '247 248 237',
			'--widget-100': '236 240 215',
			'--widget-200': '219 226 180',
			'--widget-300': '194 207 135',
			'--widget-400': '169 186 97',
			'--widget-500': '140 159 67',
			'--widget-600': '104 120 48',
			'--widget-700': '84 97 42',
			'--widget-800': '68 78 38',
			'--widget-900': '59 67 36'
		} as CSSProperties,
		id: '4NsPgRYUdHu2Q5JRNgXYU5',
		uri: 'spotify:track:4NsPgRYUdHu2Q5JRNgXYU5',
		name: 'Sweden',
		coverArt: {
			url: '/images/tracks/c418-sweden-thumbnail.png'
		},
		duration: {
			totalMilliseconds: 30000
		},
		previews: {
			audioPreview: {
				url: 'https://p.scdn.co/mp3-preview/d9913e7d4c6d570eb5a99183bf5bea6455184da1'
			}
		},
		artists: {
			items: [
				{
					uri: 'spotify:artist:4uFZsG1vXrPcvnZ4iSQyrx',
					profile: {
						name: 'C418'
					}
				}
			]
		}
	},
	{
		theme: {
			'--widget-50': '249 246 246',
			'--widget-100': '245 238 240',
			'--widget-200': '237 221 225',
			'--widget-300': '223 194 201',
			'--widget-400': '202 156 165',
			'--widget-500': '183 125 135',
			'--widget-600': '160 96 104',
			'--widget-700': '136 78 83',
			'--widget-800': '114 66 70',
			'--widget-900': '96 59 62'
		} as CSSProperties,
		id: '0U0ldCRmgCqhVvD6ksG63j',
		uri: 'spotify:track:0U0ldCRmgCqhVvD6ksG63j',
		name: 'Nightcall',
		coverArt: {
			url: '/images/tracks/kavinsky-nightcall-thumbnail.png'
		},
		duration: {
			totalMilliseconds: 30000
		},
		previews: {
			audioPreview: {
				url: 'https://p.scdn.co/mp3-preview/9c5fe8ebc12d8399a87c982efa6867157d69366a'
			}
		},
		artists: {
			items: [
				{
					uri: 'spotify:artist:0UF7XLthtbSF2Eur7559oV',
					profile: {
						name: 'Kavinsky'
					}
				}
			]
		}
	},
	{
		theme: {
			'--widget-50': '244 245 249',
			'--widget-100': '235 237 244',
			'--widget-200': '219 222 234',
			'--widget-300': '197 201 220',
			'--widget-400': '173 175 204',
			'--widget-500': '144 144 184',
			'--widget-600': '132 129 170',
			'--widget-700': '113 110 148',
			'--widget-800': '93 90 121',
			'--widget-900': '78 77 98'
		} as CSSProperties,
		id: '18cCBvygH6yEFDY0cYN3wT',
		uri: 'spotify:track:18cCBvygH6yEFDY0cYN3wT',
		name: 'Divinity',
		coverArt: {
			url: '/images/tracks/porter-robinson-divinity-thumbnail.png'
		},
		duration: {
			totalMilliseconds: 30000
		},
		previews: {
			audioPreview: {
				url: 'https://p.scdn.co/mp3-preview/e0b5489fbf665eae0ecdcf56dda2d37a3015142b?cid=d8a5ed958d274c2e8ee717e6a4b0971d'
			}
		},
		artists: {
			items: [
				{
					uri: 'spotify:artist:3dz0NnIZhtKKeXZxLOxCam',
					profile: {
						name: 'Porter Robinson'
					}
				},
				{
					uri: 'spotify:artist:3lj7jldByrrpUgW5Je8o1p',
					profile: {
						name: 'Amy Millan'
					}
				}
			]
		}
	}
];
