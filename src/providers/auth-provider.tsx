import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Splash } from "~/components";
import { auth } from "~/lib/firebase";
import { AuthRouter } from "~/routes/auth";

export const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }: PropsWithChildren): ReactElement {
	const [initialised, setInitialised] = useState(false);
	const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log("User", user);
			setInitialised(true);
			auth.updateCurrentUser(user);
			setFirebaseUser(user);
		});

		return () => unsubscribe();
	}, []);

	if (!initialised) {
		return <Splash />;
	}

	if (!firebaseUser) {
		return <AuthRouter />;
	}

	return <AuthContext.Provider value={firebaseUser}>{children}</AuthContext.Provider>;
}
