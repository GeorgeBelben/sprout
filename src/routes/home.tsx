import { ReactElement } from "react";
import { useActiveTimer } from "~/hooks";
import { TimerStatus } from "~/types";

export function Home(): ReactElement {
	const timer = useActiveTimer();

	const [hours, minutes, seconds] = timer.formattedElapsedTime;

	return (
		<div className="flex-1 flex flex-col space-y-8">
			<div className="h-96 relative flex p-16 gap-16">
				<div className="absolute inset-0 -z-20 bg-gradient-to-r from-violet-9 to-blue-10 opacity-20"></div>
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#111111]/0 to-[#111111]"></div>
				<div className="flex flex-col flex-1 justify-between items-start">
					<button className="bg-white/5 hover:bg-white/10 border border-white/5 p-2 px-4 rounded-full transition-all duration-200">
						<p className="opacity-70">No project selected</p>
					</button>
					<div className="flex w-full items-end justify-between">
						<div className="flex items-center space-x-1">
							<p className="font-extrabold text-7xl tracking-wide">
								{hours}
								<span>:</span>
								{minutes}
								<span className="text-gray-10">
									<span>:</span>
									{seconds}
								</span>
							</p>
						</div>

						<div className="flex items-center space-x-2">
							{timer.status === TimerStatus.Paused ? (
								<button
									className="size-20 rounded-full inline-flex bg-violet-9 hover:bg-violet-10 items-center justify-center"
									onClick={() => timer.resume()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="size-8"
									>
										<path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
									</svg>
									<span className="sr-only">Start</span>
								</button>
							) : (
								<button
									className="size-20 rounded-full inline-flex bg-violet-9 hover:bg-violet-10 items-center justify-center"
									onClick={() => timer.pause()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="size-8"
									>
										<path d="M4.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1ZM10.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1Z" />
									</svg>
									<span className="sr-only">Pause</span>
								</button>
							)}
							<button
								className="size-20 rounded-full inline-flex bg-gray-5 hover:bg-gray-6 items-center justify-center"
								onClick={() => {}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="size-8"
								>
									<rect width={10} height={10} x={3} y={3} rx={1.5} />
								</svg>
								<span className="sr-only">Stop</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
