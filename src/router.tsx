import { ReactElement } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "~/routes/home";
import { Layout } from "./components/layout";
import { ProjectsRoutes } from "./features/projects";

export function Router(): ReactElement {
	const routes = useRoutes([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/projects/*",
			element: <ProjectsRoutes />,
		},
		{
			path: "*",
			element: <Navigate to="/" />,
		},
	]);

	return <Layout>{routes}</Layout>;
}
