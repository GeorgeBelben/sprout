import { PropsWithChildren, ReactElement } from "react";

export function Page({ children }: PropsWithChildren): ReactElement {
	return <div className="p-16 flex-1 flex flex-col">{children}</div>;
}
