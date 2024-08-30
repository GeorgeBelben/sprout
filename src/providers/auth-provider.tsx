import { onAuthStateChanged, User } from "firebase/auth";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { AuthRoute } from "~/features/auth";
import { auth } from "~/lib/firebase";

export function AuthProvider({ children }: PropsWithChildren): ReactElement {
	const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setFirebaseUser(user);
		});

		return () => unsubscribe();
	}, []);

	if (!firebaseUser) {
		return <AuthRoute />;
	}

	return <>{children}</>;
}
