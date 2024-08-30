import { ReactElement } from "react";
import { Logo } from "./components/logo/logo";

export function App(): ReactElement {
	return (
		<div className="bg-gray-1 text-gray-12 h-[100dvh] flex items-center justify-center">
			<Logo color="foreground-muted" size="lg" />
		</div>
	);
}
