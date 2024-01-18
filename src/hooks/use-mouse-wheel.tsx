import { DependencyList, RefObject, useEffect } from 'react';

type Options = {
	onBeforeChange?: () => void;
	onChange?: (event: WheelEvent) => void;
};

export function useMouseWheel<T extends HTMLElement>(
	ref: RefObject<T>,
	options?: Options,
	deps?: DependencyList
) {
	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		async function listener(event: WheelEvent) {
			options?.onBeforeChange?.();
			options?.onChange?.(event);
		}

		element.addEventListener('wheel', listener);

		return () => {
			element.removeEventListener('wheel', listener);
		};
	}, [ref, deps, options]);
}
