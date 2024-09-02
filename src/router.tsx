import { ReactElement } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "~/routes/home";
import { Layout } from "./components/layout";

export function Router(): ReactElement {
	const routes = useRoutes([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "*",
			element: <Navigate to="/" />,
		},
	]);

	return <Layout>{routes}</Layout>;
}
