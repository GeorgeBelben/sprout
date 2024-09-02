import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Logo } from "~/components";
import { AuthRouter } from "~/features/auth";
import { auth } from "~/lib/firebase";

export const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }: PropsWithChildren): ReactElement {
	const [initialised, setInitialised] = useState(false);
	const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setInitialised(true);
			setFirebaseUser(user);
		});

		return () => unsubscribe();
	}, []);

	if (!initialised) {
		return (
			<div className="bg-gray-1 text-gray-12 h-[100dvh] flex items-center justify-center">
				<Logo color="foreground-muted" size="lg" />
			</div>
		);
	}

	if (!firebaseUser) {
		return <AuthRouter />;
	}

	return <AuthContext.Provider value={firebaseUser}>{children}</AuthContext.Provider>;
}
