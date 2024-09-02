import { BaseDocument } from "~/types/firebase";

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

export type ActiveTimer = BaseDocument & {
	project: string;
	status: TimerStatus;
	events: TimerEvent[];
};
