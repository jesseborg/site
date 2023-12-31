'use client';

import { useEffect, useState } from 'react';

export const usePrettyTime = () => {
	const [today, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return today.toLocaleTimeString('en', {
		hour: 'numeric',
		hour12: true,
		minute: 'numeric',
		second: 'numeric'
	});
};
