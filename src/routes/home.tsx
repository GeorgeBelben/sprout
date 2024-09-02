import { ReactElement } from "react";
import { Logo } from "~/components";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/firebase";

export function Home(): ReactElement {
	return (
		<div className="flex-1 flex items-center justify-center flex-col space-y-8">
			<Logo color="foreground-muted" size="lg" />
			<h1 className="text-3xl font-bold ttext-violet-10">Welcome to your new app!</h1>
			<button onClick={() => signOut(auth)}>Sign out</button>
		</div>
	);
}
