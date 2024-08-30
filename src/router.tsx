import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "~/routes/home";

export function Router(): ReactElement {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
	]);

	return <RouterProvider router={router} />;
}
