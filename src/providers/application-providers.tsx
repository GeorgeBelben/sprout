import { PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Provider as ModalProvider } from "@ebay/nice-modal-react";
import { ErrorView } from "~/components";
import { AuthProvider } from "./auth-provider";
import { ProfileProvider } from "./profile-provider";
import { Toaster } from "sonner";

export function ApplicationProviders({ children }: PropsWithChildren): ReactElement {
	return (
		<ErrorBoundary fallbackRender={(props) => <ErrorView {...props} />}>
			<QueryClientProvider client={new QueryClient()}>
				<Tooltip.Provider delayDuration={0}>
					<ModalProvider>
						<AuthProvider>
							<ProfileProvider>
								{children}
								<Toaster
									theme="dark"
									className="toaster group"
									toastOptions={{
										classNames: {
											toast: "group toast group-[.toaster]:bg-gray-2 group-[.toaster]:text-gray-12 group-[.toaster]:border group-[.toaster]:border-gray-4 group-[.toaster]:shadow-lg",
											description: "group-[.toast]:text-muted-foreground",
											icon: "group-data-[type=error]:text-red-10 group-data-[type=success]:text-green-10",
											title: "group-[.toast]:font-bold",
										},
									}}
								/>
							</ProfileProvider>
						</AuthProvider>
					</ModalProvider>
				</Tooltip.Provider>
			</QueryClientProvider>
		</ErrorBoundary>
	);
}
