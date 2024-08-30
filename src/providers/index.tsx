import { PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth-provider";
import { ErrorBoundary } from "react-error-boundary";

export function ApplicationProviders({ children }: PropsWithChildren): ReactElement {
	return (
		<ErrorBoundary fallback={<p>Something went wrong</p>}>
			<QueryClientProvider client={new QueryClient()}>
				<AuthProvider>{children}</AuthProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	);
}
