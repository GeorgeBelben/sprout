import { doc, setDoc } from "firebase/firestore";
import { TimerEvent, TimerEventType, TimerStatus } from "../types";
import { getActiveTimer } from "./get-active-timer";
import { Constants } from "~/constants";
import { db } from "~/lib/firebase";

export async function addActiveTimerEvent(userId: string, event: TimerEvent): Promise<void> {
	const timer = await getActiveTimer(userId);

	if (!timer) {
		throw new Error("No active timer found");
	}

	if (event.type === TimerEventType.Pause && timer.status === TimerStatus.Paused) {
		throw new Error("Timer is already paused");
	}

	if (
		(event.type === TimerEventType.Resume || event.type === TimerEventType.Start) &&
		timer.status === TimerStatus.Active
	) {
		throw new Error("Timer is already active");
	}

	if (event.type === TimerEventType.Stop && timer.status === TimerStatus.Stopped) {
		throw new Error("Timer is already stopped");
	}

	const docRef = doc(db, Constants.collections.activeTimers, userId);

	const getNewTimerStatus = () => {
		switch (event.type) {
			case "start":
				return TimerStatus.Active;
			case "pause":
				return TimerStatus.Paused;
			case "resume":
				return TimerStatus.Active;
			case "stop":
				return TimerStatus.Stopped;
		}
	};

	await setDoc(docRef, {
		...timer,
		status: getNewTimerStatus(),
		events: [...timer.events, event],
	});
}
