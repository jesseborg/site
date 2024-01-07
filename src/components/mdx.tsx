import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';

export function MDXComponent(props: MDXRemoteProps) {
	return <MDXRemote {...props} />;
}
