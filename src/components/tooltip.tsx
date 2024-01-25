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
					className="border-theme-50/20 bg-theme-800 pointer-events-none z-50 rounded-md border-[0.5px] p-2 transition-all delay-0 data-[state=delayed-open]:animate-slideUpAndFade sm:delay-100"
				>
					<p className="text-theme-200 cursor-default select-none text-xs leading-[10px] ">
						{tooltip}
					</p>
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	);
}
