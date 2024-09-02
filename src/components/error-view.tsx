import { Ban } from "lucide-react";
import { ReactElement } from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "./button";
import { getErrorMessage } from "~/utils";

export function ErrorView({ error, resetErrorBoundary }: FallbackProps): ReactElement {
	const message = getErrorMessage(error);

	return (
		<div className="absolute inset-0 flex items-center justify-center flex-col p-8">
			<Ban size={64} className="text-violet-10 mb-4" />
			<h1 className="text-3xl font-bold text-gray-12 mb-4">An error occurred</h1>
			<p className="text-center text-gray-9 font-mono bg-gray-2 rounded-lg p-4">
				{message ?? "An unexpected error occurred, please try again later."}
			</p>
			<Button onClick={resetErrorBoundary} className="mt-4">
				Try again
			</Button>
		</div>
	);
}
