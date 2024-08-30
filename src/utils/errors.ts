import { ErrorLike } from "../types";

export const ensureError = (error: unknown): Error => {
	if (error instanceof Error) {
		return error;
	}
	return new Error(JSON.stringify(error));
};

export function getErrorMessage(error: unknown, fallbackMessage = "Unknown error") {
	if (isErrorLike(error)) {
		return error.message;
	}

	return error ? JSON.stringify(error) : fallbackMessage;
}

export function isErrorLike(error: unknown): error is ErrorLike {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof (error as Record<string, unknown>).message === "string"
	);
}
