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
		timeZone: 'Australia/Queensland',
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	});
};
