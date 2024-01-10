import NextLink from 'next/link';
import { ComponentProps, HTMLAttributes, PropsWithChildren } from 'react';

function Root({ children }: PropsWithChildren<{}>) {
	return <section className="flex flex-col gap-4">{children}</section>;
}

function Title({ children }: PropsWithChildren<{}>) {
	return <p className="flex-1 text-base font-bold italic text-neutral-50">{children}</p>;
}

function Icon({ children }: PropsWithChildren<{}>) {
	return <span>{children}</span>;
}

function Link({ children, ...props }: PropsWithChildren<ComponentProps<typeof NextLink>>) {
	return (
		<NextLink className="text-xs font-light italic" {...props}>
			{children}
		</NextLink>
	);
}

function Header({ children }: PropsWithChildren<{}>) {
	return <div className="flex items-center gap-2">{children}</div>;
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
