'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { IUniform, Mesh, ShaderMaterial, Vector2 } from 'three';

import fragmentShader from '@/shaders/background.glsl';

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

	return (
		<mesh ref={meshRef} scale={[window.innerWidth, window.innerHeight, 1]}>
			<planeGeometry />
			<shaderMaterial
				uniforms={{
					...defaultUniforms,
					iResolution: { value: new Vector2(document.body.scrollWidth, document.body.scrollHeight) }
				}}
				fragmentShader={fragmentShader}
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
