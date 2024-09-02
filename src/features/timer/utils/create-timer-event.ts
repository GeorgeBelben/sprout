import { TimerEvent, TimerEventType } from "../types";

export function createTimerEvent(type: TimerEventType): TimerEvent {
	return {
		type,
		timestamp: Date.now(),
	};
}
