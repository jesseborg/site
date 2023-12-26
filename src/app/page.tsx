'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Mesh, Vector2 } from 'three';

import fragmentShader from '../shaders/background.glsl';

export default function Home() {
	return (
		<main className="flex h-[100svh] items-center justify-center">
			<Background />
			<h1 className="relative text-4xl font-bold text-white ">Hello World!</h1>
		</main>
	);
}

function AnimatedGrid() {
	const meshRef = useRef<Mesh>(null);

	const uniforms = useMemo(
		() => ({
			iTime: { value: 0.0 },
			iResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
			dotsRadius: { value: 2.0 },
			dotsSpacing: { value: 11.0 },
			perlinScale: { value: 1.0 },
			perlinSpeed: { value: 32.0 }
		}),
		[]
	);

	useFrame((state) => {
		if (!meshRef.current || !meshRef.current.material) {
			return;
		}

		const { clock } = state;
		// @ts-ignore
		meshRef.current.material.uniforms.iTime.value = clock.getElapsedTime();
	});

	return (
		<mesh ref={meshRef} scale={[window.innerWidth, window.innerHeight, 1]}>
			<planeGeometry />
			<shaderMaterial uniforms={uniforms} fragmentShader={fragmentShader} />
		</mesh>
	);
}

function Background() {
	return (
		<div className="pointer-events-none absolute inset-0 -z-10">
			<Canvas>
				<AnimatedGrid />
			</Canvas>
		</div>
	);
}
