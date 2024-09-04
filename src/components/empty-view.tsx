import { CircleHelp, LucideIcon } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "./button";

export type EmptyViewProps = {
	title?: string;
	icon?: LucideIcon;
	button?: {
		label: string;
		onClick: () => void;
	};
};

export function EmptyView({ title, icon, button }: EmptyViewProps): ReactElement {
	const IconComponent = icon ?? CircleHelp;

	return (
		<div className="absolute inset-0 flex items-center justify-center flex-col p-8">
			<IconComponent size={64} className="text-violet-10 mb-4" />
			<p className="text-2xl font-bold text-gray-12 mb-2">{title ?? "No data found"}</p>
			{button && (
				<Button onClick={button.onClick} className="mt-4">
					{button.label}
				</Button>
			)}
		</div>
	);
}
