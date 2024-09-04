import { z } from "zod";
import { WithDocumentId } from "~/types";

export const projectSchema = z.object({
	displayName: z.string(),
	totalTasks: z.number(),
});

export type ProjectDto = z.infer<typeof projectSchema>;

export type Project = WithDocumentId<ProjectDto>;
