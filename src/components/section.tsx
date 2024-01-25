import { cn } from '@/utils/cn';
import NextLink from 'next/link';
import { ComponentProps, HTMLAttributes, PropsWithChildren } from 'react';

function Root({ children }: PropsWithChildren<{}>) {
	return <section className="flex flex-col gap-4">{children}</section>;
}

function Title({ children, className }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
	return (
		<p className={cn('text-theme-50 flex-1 text-base font-bold italic', className)}>{children}</p>
	);
}

function Icon({ children }: PropsWithChildren<{}>) {
	return <span className="text-theme-50">{children}</span>;
}

function Link({
	className,
	children,
	...props
}: PropsWithChildren<ComponentProps<typeof NextLink>>) {
	return (
		<NextLink
			className={cn(
				'font-lightitalic text-theme-300 hover:text-theme-100 focus-visible:text-theme-100 rounded-sm text-xs',
				className
			)}
			{...props}
		>
			{children}
		</NextLink>
	);
}

function Header({ children }: PropsWithChildren<{}>) {
	return <div className="flex items-center gap-4">{children}</div>;
}

function Body({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
	return <div {...props}>{children}</div>;
}

export const Section = {
	Root,
	Title,
	Icon,
	Link,
	Header,
	Body
};
