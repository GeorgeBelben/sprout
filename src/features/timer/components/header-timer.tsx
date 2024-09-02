import { ReactElement } from "react";
import { Button } from "~/components";
import { useActiveTimer } from "../hooks/use-active-timer";
import { formatElapsedTime } from "../utils";
import { TimerStatus } from "../types";
import { cn } from "~/utils/cn";

export function HeaderTimer(): ReactElement {
	const timer = useActiveTimer();
	console.log(timer);

	if (timer.loading) {
		return <div>Loading...</div>;
	}

	if (!timer.exists) {
		return (
			<Button variant={"ghost"} onClick={() => timer.start()}>
				<span className={cn("size-3 inline-block rounded-full bg-red-9 mr-2")} />
				<span>Start tracking</span>
			</Button>
		);
	}

	return (
		<div className="flex items-center space-x-2">
			<span
				className={cn("size-3 inline-block rounded-full", {
					"bg-red-9 animate-pulse": timer.status === TimerStatus.Active,
					"bg-gray-7": timer.status === TimerStatus.Paused,
				})}
			/>
			<p>{formatElapsedTime(timer.elapsedTime)}</p>
			<div className="flex items-center space-x-1">
				{timer.status === TimerStatus.Paused ? (
					<Button variant="ghost" size="icon" onClick={() => timer.resume()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="size-4"
						>
							<path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
						</svg>
					</Button>
				) : (
					<Button variant="ghost" size="icon" onClick={() => timer.pause()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="size-4"
						>
							<path d="M4.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1ZM10.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1Z" />
						</svg>
					</Button>
				)}
				<Button variant="ghost" size="icon" onClick={() => {}}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
						<rect width={10} height={10} x={3} y={3} rx={1.5} />
					</svg>
				</Button>
			</div>
		</div>
	);
}
