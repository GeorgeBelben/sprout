import { ReactElement } from "react";
import { Logo } from "./components/logo";

export function App(): ReactElement {
	return (
		<div className="bg-neutral-900 h-[100dvh] flex items-center justify-center">
			<Logo color="white" size="lg" className="opacity-20" />
		</div>
	);
}
