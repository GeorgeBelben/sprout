import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ReactElement } from "react";
import md5 from "md5";

type AvatarProps = {
	email: string;
	displayName: string;
};

export function Avatar({ email, displayName }: AvatarProps): ReactElement {
	return (
		<AvatarPrimitive.Root className="cursor-pointer bg-violet-9 inline-flex h-[24px] w-[24px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
			<AvatarPrimitive.Image
				className="h-full w-full rounded-[inherit] object-cover"
				src={getGravatarUrl(email)}
				alt={displayName}
			/>
		</AvatarPrimitive.Root>
	);
}

function getGravatarUrl(email: string): string {
	if (email.length === 0) return "https://www.gravatar.com/avatar/?d=identicon";
	const hash = md5(email.trim().toLowerCase());
	return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}
