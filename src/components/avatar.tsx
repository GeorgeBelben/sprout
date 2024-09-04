import { ReactElement } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, VariantProps } from "class-variance-authority";
import { getInitials } from "~/utils";
import { cn } from "~/utils/cn";

const avatarVariants = cva(
	[
		"relative bg-gray-3 inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle",
	],
	{
		variants: {
			size: {
				sm: "h-8 w-8 text-[10px]",
				md: "h-10 w-10 text-xs",
				lg: "h-12 w-12 text-sm",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
);

type AvatarProps = {
	displayName: string;
	avatarUrl?: string;
} & VariantProps<typeof avatarVariants>;

export function Avatar({ displayName, avatarUrl, ...rest }: AvatarProps): ReactElement {
	return (
		<div className="relative group">
			<AvatarPrimitive.Root className={avatarVariants(rest)}>
				<AvatarPrimitive.Image
					className="h-full w-full rounded-[inherit] object-cover bg-gray-2"
					src={avatarUrl}
					alt={displayName}
				/>
				<AvatarPrimitive.Fallback
					delayMs={avatarUrl ? 600 : 0}
					className={cn(
						"h-full w-full rounded-[inherit] bg-violet-8 text-violet-12 font-bold flex items-center justify-center"
					)}
				>
					{getInitials(displayName)}
				</AvatarPrimitive.Fallback>
			</AvatarPrimitive.Root>
		</div>
	);
}
