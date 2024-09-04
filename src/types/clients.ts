import { z } from "zod";
import { WithDocumentId } from "~/types";

export const clientSchema = z.object({
	displayName: z.string().min(1),
	totalProjects: z.number(),
	avatarUrl: z.string(),
	avatarFilePath: z.string(),
});

export type ClientDto = z.infer<typeof clientSchema>;

export type Client = WithDocumentId<ClientDto>;
