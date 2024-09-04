import { z } from "zod";
import { activeTimerSchema, WithDocumentId } from "~/types";

export const profileSchema = z.object({
	activeTimer: activeTimerSchema.nullable(),
	onboardingComplete: z.boolean(),
});

export type ProfileDto = z.infer<typeof profileSchema>;

export type Profile = WithDocumentId<ProfileDto>;
