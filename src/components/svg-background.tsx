function Background() {
	return (
		<div className="fixed w-full h-full -z-50 pointer-events-none">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				aria-hidden="true"
				className="absolute w-full h-screen bg-black"
			>
				<defs>
					<pattern
						id="dot-pattern"
						width="11"
						height="11"
						patternUnits="userSpaceOnUse"
					>
						<circle cx="7" cy="7" r="1" fill="white" />
					</pattern>

					<linearGradient id="MyGradient">
						<stop offset="50%" stop-color="#F60" />
						<stop offset="50% 100%" stop-color="#FF6" />
					</linearGradient>

					<filter id="white-noise">
						<feTurbulence
							baseFrequency="0.2"
							numOctaves="6"
							stitchTiles="stitch"
							type="fractalNoise"
						/>
						<feColorMatrix type="saturate" values="0" />
					</filter>

					<filter id="perlin-noise">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.004"
							numOctaves={1}
							seed={2048}
							result="noise"
						/>
						<feGaussianBlur stdDeviation={32} />
					</filter>
				</defs>

				<g>
					{/* Dots Pattern */}
					<rect
						className="fill-[url(#dot-pattern)] opacity-5"
						width="100%"
						height="100%"
					/>

					{/* Rotation / filters */}
					<g className="origin-center scale-150 mix-blend-color-dodge brightness-200">
						{/* Perlin Noise */}
						<rect
							className="[filter:url(#perlin-noise)] origin-center animate-background"
							width="100%"
							height="100%"
						/>
					</g>

					{/* Threshold */}
					<rect className="fill-black/80 mix-blend-overlay w-screen h-screen" />

					{/* Final Noise Layer */}
					<rect
						className="[filter:url(#white-noise)] mix-blend-color-dodge"
						width="100%"
						height="100%"
					/>
				</g>
			</svg>
		</div>
	);
}