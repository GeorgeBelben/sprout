import { User } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "~/providers/auth-provider";

export function useUser(): User | null {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
