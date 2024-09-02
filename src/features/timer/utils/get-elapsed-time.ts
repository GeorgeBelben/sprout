import { TimerEvent, TimerEventType, TimerStatus } from "../types";

export function getElapsedTimeFromTimerEvents(events: TimerEvent[], status: TimerStatus): number {
	let totalElapsedTime = 0;
	let lastStartTime: number | null = null;

	events.forEach((event) => {
		if (event.type === TimerEventType.Start || event.type === TimerEventType.Resume) {
			lastStartTime = event.timestamp; // Convert Firestore Timestamp to milliseconds
		} else if (event.type === TimerEventType.Pause || event.type === TimerEventType.Stop) {
			if (lastStartTime) {
				totalElapsedTime += event.timestamp - lastStartTime;
				lastStartTime = null;
			}
		}
	});

	if (status === TimerStatus.Active && lastStartTime) {
		// If timer is still active, add the time from the last start/resume to now
		totalElapsedTime += Date.now() - lastStartTime;
	}

	return Math.floor(totalElapsedTime / 1000); // Convert milliseconds to seconds
}
