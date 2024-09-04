export function padStart(string: string, targetLength: number, padString: string): string {
	while (string.length < targetLength) {
		string = padString + string;
	}
	return string;
}

export function getInitials(string: string): string {
	if (string.length === 0) return "";
	const words = string.split(" ");
	const wordsWithLength = words.filter((word) => word.length > 0);
	const alpha = /[A-Za-z]/;
	let initials = "";
	for (const word of wordsWithLength) {
		if (alpha.test(word[0])) {
			initials += word[0].toUpperCase();
		}
	}
	return initials.slice(0, 3);
}
