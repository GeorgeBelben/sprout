import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/cn";
import { Spinner } from "./spinner";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-violet-9 text-gray-12 shadow hover:bg-violet-10",
				destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				secondary: "bg-gray-4 hover:bg-gray-6 text-gray-11 hover:text-gray-12 shadow-sm ",
				ghost: "text-gray-11 hover:bg-gray-3 hover:text-gray-12",
				link: "text-violet-10 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-8 w-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
}

export function Button({
	className,
	variant,
	size,
	loading,
	children,
	disabled,
	...props
}: ButtonProps): React.ReactElement {
	return (
		<button disabled={disabled ?? loading} className={cn(buttonVariants({ variant, size, className }))} {...props}>
			{loading ? <Spinner size="sm" color="white" /> : children}
		</button>
	);
}
