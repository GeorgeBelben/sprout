import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

export function cn(...inputs: ClassValue[]) {
	return twMerge(cx(inputs));
}
