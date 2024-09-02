import { ReactElement, useState } from "react";
import { Clock } from "lucide-react";
import { useElapsedTime } from "../hooks/use-elapsed-time";
import dayjs, { Dayjs } from "dayjs";
import { formatElapsedTime } from "../utils";

export function HeaderTimer(): ReactElement {
	const [startTimestamp, setStartTimestamp] = useState<Dayjs | null>(null);

	const elapsedTime = useElapsedTime(startTimestamp);

	if (!startTimestamp) {
		return (
			<button
				onClick={() => setStartTimestamp(dayjs())}
				className="bg-violet-9 hover:bg-violet-8 rounded-lg px-3 py-1 flex items-center space-x-1 font-medium"
			>
				<Clock size={12} />
				<span>Start Timer</span>
			</button>
		);
	}

	return (
		<button
			onClick={() => {}}
			className="bg-violet-9 hover:bg-violet-8 rounded-lg px-3 py-1 flex items-center space-x-1 font-medium"
		>
			<Clock size={12} />
			<span>{formatElapsedTime(elapsedTime)}</span>
		</button>
	);
}
