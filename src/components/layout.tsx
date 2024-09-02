import { PropsWithChildren, ReactElement } from "react";
import { Header } from "./header";

export function Layout({ children }: PropsWithChildren): ReactElement {
	return (
		<>
			<div className="divide-y divide-gray-3 h-[100dvh] overflow-clip flex flex-col">
				<Header />
				<main className="flex-1 flex flex-col">{children}</main>
			</div>
		</>
	);
}
