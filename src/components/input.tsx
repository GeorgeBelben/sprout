import { ReactElement } from "react";
import { cn } from "~/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

export function Input(props: InputProps): ReactElement {
	const { className, label, ...rest } = props;
	return (
		<div className="space-y-1 w-full">
			{props.label && (
				<label htmlFor={props.id} className="block text-gray-12 text-sm font-medium">
					{label}
				</label>
			)}

			<input
				{...rest}
				className={cn(
					"bg-gray-3 text-gray-12 h-9 px-3 rounded min-w-64 w-full border border-gray-5 focus:outline-none",
					className
				)}
			/>
		</div>
	);
}
