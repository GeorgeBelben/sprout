import { z } from "zod";
import { BaseDocument } from "~/types";

export enum TimerEventType {
	Start = "start",
	Stop = "stop",
	Pause = "pause",
	Resume = "resume",
}

export enum TimerStatus {
	Active = "active",
	Paused = "paused",
	Stopped = "stopped",
}

export type TimerEvent = {
	type: TimerEventType;
	timestamp: number;
};

export const activeTimerSchema = z.object({
	project: z.string(),
	status: z.nativeEnum(TimerStatus),
	events: z.array(
		z.object({
			type: z.nativeEnum(TimerEventType),
			timestamp: z.number(),
		})
	),
});

export type ActiveTimerDto = z.infer<typeof activeTimerSchema>;

export type ActiveTimer = BaseDocument & ActiveTimerDto;
