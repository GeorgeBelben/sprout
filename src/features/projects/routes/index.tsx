import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { ProjectsList } from "./list";
import { ProjectDashboard } from "./dashboard";

export function ProjectsRoutes(): ReactElement {
	return (
		<Routes>
			<Route path="" element={<ProjectsList />} />
			<Route path=":projectId" element={<ProjectDashboard />} />
		</Routes>
	);
}
