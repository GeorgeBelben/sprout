import { ReactElement } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { SignInRoute } from "./sign-in";
import { SignUpRoute } from "./sign-up";

export function AuthRouter(): ReactElement {
	const routes = useRoutes([
		{
			path: "/",
			element: <Navigate to="/sign-in" />,
		},
		{
			path: "/sign-in",
			element: <SignInRoute />,
		},
		{
			path: "/sign-up",
			element: <SignUpRoute />,
		},
	]);

	return <>{routes}</>;
}
