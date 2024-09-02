import { ReactElement } from "react";
import { Button } from "~/components";
import { getProjects } from "../api/get-projects";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "~/utils";

export function ProjectsList(): ReactElement {
	const projectsQuery = useQuery({
		queryKey: ["projects"],
		queryFn: () => getProjects(),
	});

	return (
		<div className="p-8">
			<div className="md:flex md:items-center md:justify-between">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Projects
					</h2>
				</div>
				<div className="mt-4 flex md:ml-4 md:mt-0">
					<Button>Create Project</Button>
				</div>
			</div>
			{projectsQuery.isLoading && <p>Loading...</p>}
			{projectsQuery.isError && <p>{getErrorMessage(projectsQuery.error)}</p>}
			{projectsQuery.isSuccess && (
				<ul>
					{projectsQuery.data.map((project) => (
						<li key={project.id}>{project.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
