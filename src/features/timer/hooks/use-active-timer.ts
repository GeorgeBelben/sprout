import { useUser } from "~/hooks/use-user";
import { addActiveTimerEvent, createActiveTimer, getActiveTimer } from "../api";
import { useEffect, useRef, useState } from "react";
import { ActiveTimer, TimerEventType, TimerStatus } from "../types";
import { getElapsedTimeFromTimerEvents } from "../utils/get-elapsed-time";
import { formatElapsedTime } from "../utils";
import { createTimerEvent } from "../utils/create-timer-event";

export function useActiveTimer() {
	const user = useUser();

	const [loading, setLoading] = useState(true);
	const [exists, setExists] = useState(false);
	const [timerDoc, setTimerDoc] = useState<ActiveTimer | null>(null);
	const [elapsedTime, setElapsedTime] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const handleStart = async () => {
		if (!user) {
			throw new Error("User is not authenticated");
		}

		if (exists) {
			return;
		}

		await createActiveTimer(user.uid);

		const doc = await getActiveTimer(user.uid);

		if (!doc) {
			throw new Error("No active timer found");
		}

		handleImport(doc);
	};

	const handlePause = async () => {
		if (!user) throw new Error("User is not authenticated");

		if (!timerDoc) throw new Error("No active timer found");

		const pauseEvent = createTimerEvent(TimerEventType.Pause);

		await addActiveTimerEvent(user.uid, pauseEvent);

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

		await addActiveTimerEvent(user.uid, resumeEvent);

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

			const timer = await getActiveTimer(user.uid);

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
