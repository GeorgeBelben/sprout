import { ReactElement } from "react";
import { createBrowserRouter, Navigate, Outlet, Params, RouterProvider, useRouteError } from "react-router-dom";
import { ErrorView, Layout } from "~/components";
import { api } from "./lib/api";
import { ApplicationProviders } from "./providers/application-providers";
import { ClientsSingleRoute, ClientsListRoute, ClientsProjectRoute } from "./routes/clients";
import { Home } from "./routes/home";
import { brand } from "./utils";
import { DocumentId } from "./types";

function Root(): ReactElement {
	return (
		<ApplicationProviders>
			<Layout>
				<Outlet />
			</Layout>
		</ApplicationProviders>
	);
}

export function Router(): ReactElement {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			children: [
				{
					path: "",
					element: <Home />,
				},
				{
					path: "clients",
					element: <ClientsListRoute />,
					errorElement: <RouteErrorView />,
					loader: async () => {
						const clients = await api.clients.list();
						return { clients };
					},
				},
				{
					path: "clients/:clientId",
					element: <ClientsSingleRoute />,
					errorElement: <RouteErrorView />,
					loader: async ({ params }: { params: Params<"clientId"> }) => {
						const client = await api.clients.get(brand<DocumentId>(params.clientId));
						return { client };
					},
				},
				{
					path: "clients/:clientId/projects/:projectId",
					element: <ClientsProjectRoute />,
					errorElement: <RouteErrorView />,
					loader: async ({ params }: { params: Params<"clientId"> }) => {
						console.log("params", params);
						const client = await api.clients.get(brand<DocumentId>(params.clientId));
						return { client };
					},
				},
			],
		},
		{
			path: "*",
			element: <Navigate to="/" />,
		},
	]);

	return <RouterProvider router={router} />;
}

function RouteErrorView(): ReactElement {
	const error = useRouteError();

	return <ErrorView error={error} />;
}
