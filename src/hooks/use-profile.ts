import { useContext } from "react";
import { ProfileContext } from "~/providers/profile-provider";
import { Profile } from "~/types";

export function useProfile(): Profile | null {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error("useProfile must be used within an ProfileProvider");
	}
	return context;
}
