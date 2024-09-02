import { doc, setDoc } from "firebase/firestore";
import { db } from "~/lib/firebase";
import { TimerEventType, TimerStatus } from "../types";

export async function createActiveTimer(userId: string): Promise<void> {
	const docRef = doc(db, "activeTimers", userId);

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
