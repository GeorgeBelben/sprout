import { padStart } from "~/utils/strings";

export function formatElapsedTime(elapsedTime: number): string {
	const seconds = Math.floor(elapsedTime) % 60;
	const minutes = Math.floor(elapsedTime / 60) % 60;
	const hours = Math.floor(elapsedTime / 60 / 60);

	if (hours === 0) {
		return `${padStart(minutes.toString(), 2, "0")}:${padStart(seconds.toString(), 2, "0")}`;
	}

	return `${padStart(hours.toString(), 2, "0")}:${padStart(minutes.toString(), 2, "0")}:${padStart(seconds.toString(), 2, "0")}`;
}
