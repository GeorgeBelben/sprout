import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, ReactElement } from "react";
import { ErrorView, Splash } from "~/components";
import { api } from "~/lib/api";
import { Profile } from "~/types";

export const ProfileContext = createContext<Profile | null>(null);

export function ProfileProvider({ children }: PropsWithChildren): ReactElement {
	const profileQuery = useQuery({
		queryKey: ["profile"],
		queryFn: async () => api.profiles.ensure(),
	});

	if (profileQuery.isLoading) {
		return <Splash />;
	}

	if (!profileQuery.isSuccess) {
		return (
			<ErrorView
				error={profileQuery.error ?? new Error("Couldn't fetch profile")}
				resetErrorBoundary={() => {}}
			/>
		);
	}

	return <ProfileContext.Provider value={profileQuery.data}>{children}</ProfileContext.Provider>;
}
