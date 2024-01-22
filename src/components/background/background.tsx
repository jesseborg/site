'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { IUniform, Mesh, ShaderMaterial, Vector2 } from 'three';

function AnimatedGrid() {
	const defaultUniforms = useMemo(
		() =>
			({
				iTime: { value: 0.0 },
				dotsSize: { value: 2.0 },
				dotsSpacing: { value: 11.0 },
				perlinScale: { value: 2.0 },
				perlinSpeed: { value: 8.0 },
				opacity: { value: 0.0 }
			}) satisfies Record<string, IUniform>,
		[]
	);

	const meshRef = useRef<Mesh<any, ShaderMaterial & { uniforms: typeof defaultUniforms }>>(null);

	const [shaderLoaded, setShaderLoaded] = useState(false);

	// Update the frame time
	useFrame(({ clock }) => {
		if (!meshRef.current || !meshRef.current.material) {
			return;
		}

		meshRef.current.material.uniforms.iTime.value = clock.getElapsedTime();
	});

	// Fade in mesh after shader is loaded
	useFrame((_, delta) => {
		if (!meshRef.current || !meshRef.current.material || !shaderLoaded) {
			return;
		}

		const opacity = meshRef.current.material.uniforms.opacity.value;

		if (opacity < 1) {
			meshRef.current.material.uniforms.opacity.value = Math.min(opacity + delta / 2, 1);
		}
	});

	const maxSize = Math.max(document.body.scrollWidth, document.body.scrollHeight);

	return (
		<mesh ref={meshRef} scale={[window.innerWidth, window.innerHeight, 1]}>
			<planeGeometry />
			<shaderMaterial
				uniforms={{
					...defaultUniforms,
					iResolution: { value: new Vector2(maxSize, maxSize) }
				}}
				fragmentShader={backgroundMaterial.fragmentShader}
				onBeforeCompile={() => setShaderLoaded(true)}
			/>
		</mesh>
	);
}

export function Background() {
	return (
		<div className="background pointer-events-none absolute -z-10 h-[max(100svh,100%)] w-full opacity-40">
			<Canvas>
				<AnimatedGrid />
			</Canvas>
		</div>
	);
}

const backgroundMaterial = new ShaderMaterial({
	fragmentShader: `
		precision highp float;

		uniform float iTime;
		uniform vec2 iResolution;

		uniform float dotsSize;
		uniform float dotsSpacing;
		uniform float perlinScale;
		uniform float perlinSpeed;
		uniform float opacity;

		const vec4 WHITE = vec4(255.0, 255.0, 255.0, 1.0);
		const vec4 BLACK = vec4(0.0, 0.0, 0.0, 1.0);

		float whiteNoise(vec4 pos, float evolve) {
			// Loop the evolution (over a very long period of time).
			float e = fract((evolve * 0.1));
			
			// Coordinates
			float cx  = pos.x * e;
			float cy  = pos.y * e;
			
			// Generate a "random" black or white value
			return fract(23.0 * fract(2.0 / fract(fract(cx * 2.4 / cy * 23.0 + pow(abs(cy / 22.4), 3.3)) * fract(cx * evolve / pow(abs(cy), 0.050)))));
		}

		vec2 getGradient(vec2 intPos, float t) {
			// Uncomment for calculated rand
			float rand = fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);
			
			// Texture-based rand (a bit faster on my GPU)
			// float rand = texture(iChannel0, intPos / 64.0).r;
			
			// Rotate gradient: random starting rotation, random rotation rate
			float angle = 6.283185 * rand + 4.0 * t * rand;
			return vec2(cos(angle), sin(angle));
		}

		float perlinNoise(vec3 pos) {
			vec2 i = floor(pos.xy);
			vec2 f = pos.xy - i;
			vec2 blend = f * f * (3.0 - 2.0 * f);
			
			float noiseVal = mix(
				mix(
					dot(getGradient(i + vec2(0, 0), pos.z), f - vec2(0, 0)),
					dot(getGradient(i + vec2(1, 0), pos.z), f - vec2(1, 0)),
					blend.x
				),
				mix(
					dot(getGradient(i + vec2(0, 1), pos.z), f - vec2(0, 1)),
					dot(getGradient(i + vec2(1, 1), pos.z), f - vec2(1, 1)),
					blend.x
				),
				blend.y
			);
			return 0.5 + 5.0 * (noiseVal / 0.7); // normalize to about [-1..1]
		}

		float blendOverlay(float base, float blend) {
			return base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend));
		}

		vec3 blendOverlay(vec3 base, vec3 blend) {
			return vec3(
				blendOverlay(base.r, blend.r),
				blendOverlay(base.g, blend.g),
				blendOverlay(base.b, blend.b)
			);
		}

		vec3 blendDarken(vec3 base, vec3 blend) {
			return vec3(
				min(blend.r, base.r),
				min(blend.g, base.g),
				min(blend.b, base.b)
			);
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / iResolution.xy;
			
			// Dots
			vec2 point = (floor(gl_FragCoord.xy / dotsSpacing) + 0.5) * dotsSpacing;
			float radius = length(gl_FragCoord.xy - point) / dotsSize;
			vec4 dots = vec4(vec3((1.0 - pow(radius, dotsSpacing))), 1.0);
			
			// Perlin Noise
			float pNoise = perlinNoise(vec3(uv * perlinScale, iTime / perlinSpeed));
			vec3 perlinDots = blendDarken(vec3(dots), vec3(pNoise));

			// White Noise on Perlin Dots
			vec3 wNoise = vec3(whiteNoise(gl_FragCoord, 1.0));
			// vec3 noiseOverlay = mix(perlinDots, wNoise, -1.0 + pNoise);
			vec3 noiseOverlay = mix(perlinDots, wNoise, 0.5);

			// White Noise Overlay
			vec3 wNoise2 = vec3(whiteNoise(gl_FragCoord, 1.0));
			vec3 finalOverlay = blendOverlay(wNoise2 * 0.80, noiseOverlay);

			// gl_FragColor = dots;
			gl_FragColor = vec4(finalOverlay * opacity, 1.0);
		}
	`
});
