'use client';

import { usePrettyTime } from '@/hooks/use-pretty-time';

export function CurrentTime() {
	const prettyTime = usePrettyTime();
	return <p suppressHydrationWarning>{prettyTime}</p>;
}
