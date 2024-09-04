import { VariantProps, cva } from "class-variance-authority";

const spinnerVariants = cva("animate-spin", {
	variants: {
		size: {
			xs: "size-4",
			sm: "size-6",
			md: "size-8",
			lg: "size-12",
			xl: "size-16",
		},
		color: {
			brand: "text-violet-9",
			foreground: "text-gray-12",
			background: "text-gray-1",
			white: "text-white",
		},
	},
	defaultVariants: {
		size: "md",
		color: "brand",
	},
});

export function Spinner({ size, color }: VariantProps<typeof spinnerVariants>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={spinnerVariants({ size, color })}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	);
}
