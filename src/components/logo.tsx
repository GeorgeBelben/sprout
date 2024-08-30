import { cva, cx, VariantProps } from "class-variance-authority";
import { ReactElement } from "react";
import { PropsWithClassName } from "../types";

const logoVariants = cva([], {
	variants: {
		color: {
			brand: ["text-grass-9"],
			foreground: ["text-gray-12"],
			"foreground-muted": ["text-gray-6"],
			background: ["text-gray-1"],
		},
		size: {
			xs: ["h-4"],
			sm: ["h-6"],
			md: ["h-8"],
			lg: ["h-12"],
			xl: ["h-16"],
		},
	},
	defaultVariants: {
		color: "brand",
		size: "md",
	},
});

type LogoProps = PropsWithClassName<VariantProps<typeof logoVariants>>;

export function Logo({ size, color, className }: LogoProps): ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 401.9"
			fill="currentColor"
			className={cx(logoVariants({ size, color }), className)}
		>
			<path d="M255.5 84.4c9.2-10 17.7-20.5 27.5-29.6C320.1 19.9 364.5 2 415.4.4c19.9-.6 39.9-.3 59.9-.1 19.4.2 35.7 15 36 34.1.5 24.7 1.7 49.6-1 74.1-9.3 85.8-55.6 143.7-136.5 173.6-23.6 8.7-48.4 11-73.5 10.3-2.1 0-4.2 0-6.3.1-.3 0-.7.3-1.6.7v70.9c0 21.7-15.8 37.9-36.5 37.9s-36.4-16.2-36.5-37.8v-72.6c-12.5 0-24.5.9-36.3-.1C96 283.8 23.5 220.3 5.2 134.9c-3.3-15.8-4-32.4-4.8-48.6C-.4 70.2.2 54 .2 37.8.4 16.1 16 .2 37.6.3c23.6 0 47.2-.8 70.7 1.1 59.5 4.8 107.3 32.1 143.8 79.1.9 1.2 1.8 2.4 2.8 3.6.2.3.6.3.6.3Z" />
		</svg>
	);
}
