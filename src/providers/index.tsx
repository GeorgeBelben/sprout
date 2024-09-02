import { PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth-provider";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ErrorView } from "~/components";
import * as Tooltip from "@radix-ui/react-tooltip";

export function ApplicationProviders({ children }: PropsWithChildren): ReactElement {
	return (
		<ErrorBoundary fallbackRender={(props) => <ErrorView {...props} />}>
			<QueryClientProvider client={new QueryClient()}>
				<Tooltip.Provider delayDuration={0}>
					<BrowserRouter>
						<AuthProvider>{children}</AuthProvider>
					</BrowserRouter>
				</Tooltip.Provider>
			</QueryClientProvider>
		</ErrorBoundary>
	);
}
