import { PropsWithChildren, ReactElement } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "~/utils/cn";

type TooltipProps = PropsWithChildren<{
	content: ReactElement | string;
}>;

export function Tooltip({ children, content }: TooltipProps): ReactElement {
	return (
		<TooltipPrimitive.Root>
			<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Content
				side="top"
				sideOffset={5}
				collisionPadding={8}
				className={cn(
					"data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
					"bg-gray-12 text-gray-1 text-xs font-semibold select-none rounded-[4px] px-3 py-1.5 leading-none shadow will-change-[transform,opacity]"
				)}
			>
				{content}
				<TooltipPrimitive.Arrow className="fill-gray-12" />
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Root>
	);
}
