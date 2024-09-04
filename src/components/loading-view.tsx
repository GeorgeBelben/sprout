import { ReactElement } from "react";
import { Spinner } from "./spinner";

export function LoadingView(): ReactElement {
	return (
		<div className="absolute inset-0 flex items-center justify-center flex-col p-8">
			<Spinner size="lg" />
		</div>
	);
}
