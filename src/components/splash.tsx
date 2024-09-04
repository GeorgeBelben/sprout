import { ReactElement } from "react";
import { Logo } from "./logo";

export function Splash(): ReactElement {
	return (
		<div className="bg-gray-1 text-gray-12 h-[100dvh] flex flex-col items-center justify-center">
			<Logo color="brand" size="lg" className="mb-8 animate-pulse" />
		</div>
	);
}
