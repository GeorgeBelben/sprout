import { ReactElement } from "react";
import { Logo } from "./components/logo";

export function App(): ReactElement {
	return (
		<div className="bg-gray-1 h-[100dvh] flex items-center justify-center">
			<Logo color="foreground-muted" size="lg" />
		</div>
	);
}
