import { ReactElement } from "react";
import { HeaderTimer } from "~/features/timer";
import { Logo } from "./logo";
import { Avatar } from "./avatar";
import { Tooltip } from "./tooltip";
import { Dropdown } from "./dropdown";
import { Cog, LogOut } from "lucide-react";
import { useUser } from "~/hooks/use-user";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/firebase";

export function Header(): ReactElement {
	return (
		<div className="h-12 flex items-center justify-between px-3">
			<Logo size="xs" color="brand" />
			<HeaderTimer />
			<UserMenu />
		</div>
	);
}

function UserMenu(): ReactElement {
	const user = useUser();

	if (!user) return <></>;

	return (
		<Dropdown
			menuItems={[
				{
					key: "settings",
					label: "Settings",
					icon: Cog,
					href: "/settings",
					keyboardShortcut: "S",
				},
				{
					key: "logout",
					label: "Logout",
					icon: LogOut,
					onClick: async () => {
						console.log("signing out");
						await signOut(auth);
					},
					keyboardShortcut: "L",
				},
			]}
		>
			<span>
				<Tooltip content={user.email ?? ""}>
					<span>
						<Avatar email={user.email ?? ""} displayName={user.displayName ?? ""} />
					</span>
				</Tooltip>
			</span>
		</Dropdown>
	);
}
