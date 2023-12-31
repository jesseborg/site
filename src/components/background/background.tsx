'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { IUniform, Mesh, ShaderMaterial, Vector2 } from 'three';

import fragmentShader from '@/shaders/background.glsl';

const DEFAULT_UNIFORMS = {
	iTime: { value: 0.0 },
	iResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
	dotsSize: { value: 2.0 },
	dotsSpacing: { value: 11.0 },
	perlinScale: { value: 2.0 },
	perlinSpeed: { value: 8.0 },
	opacity: { value: 0.0 }
} satisfies Record<string, IUniform>;

type DefaultUniforms = typeof DEFAULT_UNIFORMS;
type ShaderMaterialWithUniforms = ShaderMaterial & { uniforms: DefaultUniforms };
type MeshRef = Mesh<any, ShaderMaterialWithUniforms>;

function AnimatedGrid() {
	const meshRef = useRef<MeshRef>(null);

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
				uniforms={DEFAULT_UNIFORMS}
				fragmentShader={fragmentShader}
				onBeforeCompile={() => setShaderLoaded(true)}
			/>
		</mesh>
	);
}

export function Background() {
	return (
		<div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
			<Canvas>
				<AnimatedGrid />
			</Canvas>
		</div>
	);
}
