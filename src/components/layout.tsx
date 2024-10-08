import { PropsWithChildren, ReactElement } from "react";
import { Sidebar } from "./sidebar";
import { LoaderProgress } from "./loader-progress";

export function Layout({ children }: PropsWithChildren): ReactElement {
	return (
		<>
			<div className="divide-y divide-gray-3 h-[100dvh] overflow-clip flex flex-col">
				<div className="flex-1 flex divide-x divide-gray-4">
					<Sidebar />
					<main className="flex-1 flex flex-col relative">{children}</main>
				</div>
			</div>
			<LoaderProgress />
		</>
	);
}
