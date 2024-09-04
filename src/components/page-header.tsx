import { ReactElement } from "react";

type PageHeaderProps = {
	title: string;
	onRenderTitleIcon?: () => ReactElement;
	onRenderActions?: () => ReactElement;
};

export function PageHeader({ title, onRenderTitleIcon, onRenderActions }: PageHeaderProps): ReactElement {
	return (
		<div className="md:flex md:items-center md:justify-between mb-8">
			<div className="min-w-0 flex-1 flex items-center sapce-x-4">
				{onRenderTitleIcon && <span className="mr-4">{onRenderTitleIcon()}</span>}
				<h2 className="text-4xl font-bold leading-7 text-gray-900 sm:text-4xl sm:tracking-tight">{title}</h2>
			</div>
			{onRenderActions && <div className="mt-4 flex md:ml-4 md:mt-0">{onRenderActions()}</div>}
		</div>
	);
}
