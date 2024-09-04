import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, getCurrentUser } from "~/lib/firebase";
import { ActiveTimer, TimerEvent, TimerEventType, TimerStatus } from "../../types";
import { Constants } from "~/constants";

export async function addActiveTimer(): Promise<void> {
	const user = getCurrentUser();

	const docRef = doc(db, Constants.collections.activeTimers, user.uid);

	await setDoc(docRef, {
		project: "My Project",
		createdAt: Date.now(),
		updatedAt: Date.now(),
		status: TimerStatus.Active,
		events: [
			{
				type: TimerEventType.Start,
				timestamp: Date.now(),
			},
		],
	});
}

export async function getActiveTimer(): Promise<ActiveTimer | null> {
	const user = getCurrentUser();

	const docRef = doc(db, "activeTimers", user.uid);

	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log("No such document!");
		return null;
	}

	console.log("Document data:", docSnap.data());
	return docSnap.data() as ActiveTimer;
}

export async function addActiveTimerEvent(event: TimerEvent): Promise<void> {
	const user = getCurrentUser();

	const timer = await getActiveTimer();

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

	const docRef = doc(db, Constants.collections.activeTimers, user.uid);

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
