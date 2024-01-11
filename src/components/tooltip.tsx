'use client';

'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

type TooltipProps = {
	children: ReactNode;
	tooltip: string;
};

export function Tooltip({ tooltip, children }: TooltipProps) {
	return (
		<TooltipPrimitive.Root>
			<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Portal>
				<TooltipPrimitive.Content
					sideOffset={4}
					collisionPadding={10}
					className="data-[state=delayed-open]:animate-slideUpAndFade pointer-events-none z-50 rounded-md border-[0.5px] border-white/20 bg-zinc-800 p-2 transition-all delay-0 sm:delay-100"
				>
					<p className="cursor-default select-none text-xs leading-[10px] text-neutral-200 ">
						{tooltip}
					</p>
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	);
}
