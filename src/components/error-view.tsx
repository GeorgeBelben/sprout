import { Ban } from "lucide-react";
import { ReactElement, useEffect } from "react";
import { Button } from "./button";
import { getErrorMessage } from "~/utils";

export type ErrorViewProps = {
	error: unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	resetErrorBoundary?: (...args: any[]) => void;
};

export function ErrorView({ error, resetErrorBoundary }: ErrorViewProps): ReactElement {
	const message = getErrorMessage(error);

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="absolute inset-0 flex items-center justify-center flex-col p-8">
			<Ban size={64} className="text-violet-10 mb-4" />
			<h2 className="text-3xl font-bold text-gray-12 mb-4">An error occurred</h2>
			<p className="text-center text-gray-9 font-mono bg-gray-2 rounded-lg p-4">
				{message ?? "An unexpected error occurred, please try again later."}
			</p>
			{resetErrorBoundary && (
				<Button onClick={resetErrorBoundary} className="mt-4">
					Try again
				</Button>
			)}
		</div>
	);
}
