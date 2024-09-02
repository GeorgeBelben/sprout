import { ReactElement } from "react";
import { cn } from "~/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps): ReactElement {
	const { className, ...rest } = props;
	return (
		<input
			{...rest}
			className={cn("bg-gray-3 text-gray-12 h-8 px-3 rounded min-w-64 focus:outline-none", className)}
		/>
	);
}
