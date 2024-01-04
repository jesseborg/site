import Image from 'next/image';
import Link from 'next/link';

export default function ProjectPage() {
	return (
		<div className="mx-auto w-fit">
			<div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr_640px_1fr]">
				<nav className="left-0 top-12 mb-0 mr-6 h-fit pt-2 sm:sticky">
					<Link className="flex text-sm italic" href="/">
						<span className="icon-right-hook-arrow mr-2 inline-block rotate-180 pt-px" />
						Home
					</Link>
				</nav>
				<article className="flex max-w-[640px] flex-col gap-4 ">
					<Image
						className="w-full rounded-xl shadow-2xl shadow-black"
						src="/images/projects/timeseed-header.png"
						alt="Project Header"
						width={640}
						height={170}
					/>
					<div className="flex flex-col gap-0.5">
						<h2 className="text-lg font-medium">Project Title</h2>
						<time className="text-xs text-neutral-400">5th August, 2023</time>
					</div>
					<div className="text-sm font-light leading-5 tracking-[-0.28px] text-neutral-100">
						<p>
							Lorem ipsum dolor sit amet consectetur. Semper id lacus leo mauris sit et dui
							elementum at. Quisque metus ut eu donec lectus.
						</p>
						<br />
						<p>
							Nibh cras et aliquet facilisis. Nisi egestas condimentum mattis vitae lectus et. Sed
							ipsum pharetra fermentum posuere molestie ac. In convallis morbi vitae habitant purus
							egestas condimentum nulla. At ultricies vel non vel mi ac nullam.
						</p>
						<br />
						<p>
							At volutpat eget aliquam vulputate. Cras ac elementum lectus quis eu. Suspendisse
							pulvinar integer libero amet ut. Nullam mattis enim suspendisse scelerisque auctor.
							Quisque tempor at rutrum ultrices tortor varius velit semper. Feugiat odio porttitor
							maecenas elit faucibus suscipit scelerisque pretium. Faucibus tellus vestibulum proin.
						</p>
					</div>
				</article>
			</div>
		</div>
	);
}
