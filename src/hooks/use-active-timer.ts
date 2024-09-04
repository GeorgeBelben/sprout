import { useEffect, useRef, useState } from "react";
import { ActiveTimer, TimerEvent, TimerEventType, TimerStatus } from "~/types";
import { api } from "~/lib/api";
import { padStart } from "~/utils";
import { getCurrentUser } from "~/lib/firebase";

export function useActiveTimer() {
	const user = getCurrentUser();

	const [loading, setLoading] = useState(true);
	const [exists, setExists] = useState(false);
	const [timerDoc, setTimerDoc] = useState<ActiveTimer | null>(null);
	const [elapsedTime, setElapsedTime] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const handleStart = async () => {
		if (exists) {
			return;
		}

		await api.timer.add();

		const doc = await api.timer.get();

		if (!doc) {
			throw new Error("No active timer found");
		}

		handleImport(doc);
	};

	const handlePause = async () => {
		if (!user) throw new Error("User is not authenticated");

		if (!timerDoc) throw new Error("No active timer found");

		const pauseEvent = createTimerEvent(TimerEventType.Pause);

		await api.timer.addEvent(pauseEvent);

		const updatedDoc = {
			...timerDoc,
			status: TimerStatus.Paused,
			events: [...timerDoc.events, pauseEvent],
		};

		setTimerDoc(updatedDoc);
		handleImport(updatedDoc);
	};

	const handleResume = async () => {
		if (!user) throw new Error("User is not authenticated");

		if (!timerDoc) throw new Error("No active timer found");

		const resumeEvent = createTimerEvent(TimerEventType.Resume);

		await api.timer.addEvent(resumeEvent);

		const updatedDoc = {
			...timerDoc,
			status: TimerStatus.Active,
			events: [...timerDoc.events, resumeEvent],
		};

		setTimerDoc(updatedDoc);
		handleImport(updatedDoc);
	};

	const startTimerInterval = (timer: ActiveTimer) => {
		setElapsedTime(getElapsedTimeFromTimerEvents(timer.events, timer.status));
		intervalRef.current = setInterval(() => {
			setElapsedTime(getElapsedTimeFromTimerEvents(timer.events, timer.status));
		}, 1000);
	};

	const handleImport = async (timer: ActiveTimer) => {
		clearInterval(intervalRef.current!);
		setExists(true);
		setTimerDoc(timer);
		startTimerInterval(timer);
	};

	useEffect(() => {
		const handleFetchActiveTimer = async () => {
			if (!user) {
				setLoading(false);
				throw new Error("User is not authenticated");
			}

			const timer = await api.timer.get();

			if (!timer) {
				setLoading(false);
				throw new Error("No active timer found");
			}

			handleImport(timer);
			setLoading(false);
		};

		handleFetchActiveTimer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return {
		start: handleStart,
		pause: handlePause,
		resume: handleResume,
		status: timerDoc?.status,
		elapsedTime,
		formattedElapsedTime: formatElapsedTime(elapsedTime),
		loading,
		exists,
	};
}

function getElapsedTimeFromTimerEvents(events: TimerEvent[], status: TimerStatus): number {
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

export function createTimerEvent(type: TimerEventType): TimerEvent {
	return {
		type,
		timestamp: Date.now(),
	};
}

export function formatElapsedTime(elapsedTime: number): [string, string, string] {
	const seconds = Math.floor(elapsedTime) % 60;
	const minutes = Math.floor(elapsedTime / 60) % 60;
	const hours = Math.floor(elapsedTime / 60 / 60);

	return [
		padStart(hours.toString(), 2, "0"),
		padStart(minutes.toString(), 2, "0"),
		padStart(seconds.toString(), 2, "0"),
	];
}
