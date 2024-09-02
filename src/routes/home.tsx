import { ReactElement } from "react";

export function Home(): ReactElement {
	return (
		<div className="flex-1 flex flex-col space-y-8">
			<div className="h-96 relative">
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-9 to-violet-1 opacity-30"></div>
				<h1>Hello!</h1>
			</div>
		</div>
	);
}
