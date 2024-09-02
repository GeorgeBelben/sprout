import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

export function useElapsedTime(timestamp: Dayjs | null): number {
	const [timeElapsed, setTimeElapsed] = useState<number>(0);

	useEffect(() => {
		// Function to update the time elapsed
		const updateTimer = () => {
			if (!timestamp) return;

			const now = dayjs();
			setTimeElapsed(now.diff(timestamp, "milliseconds"));
		};

		// Update timer every second
		const intervalId = setInterval(updateTimer, 1000);

		// Initial call to set the timer immediately
		updateTimer();

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [timestamp]);

	return timeElapsed;
}
