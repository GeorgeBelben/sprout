import { Cog, LogOut, Timer, User } from "lucide-react";
import { PropsWithChildren, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "./tooltip";
import { cn } from "~/utils/cn";
import { Logo } from "./logo";
import { useUser } from "~/hooks";
import { Dropdown } from "./dropdown";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/firebase";
import { UserAvatar } from "./user-avatar";

const sidebarItems = [
	{
		title: "Timer",
		icon: Timer,
		href: "/",
	},
	{
		title: "Clients",
		icon: User,
		href: "/clients",
	},
];

export function Sidebar(): ReactElement {
	return (
		<div className="w-12 flex flex-col bg-gray-1">
			<div className="flex-1 flex flex-col">
				<div className="size-12 flex items-center justify-center">
					<Logo size="xs" />
					<span className="sr-only">Sprout</span>
				</div>
				{sidebarItems.map((item) => (
					<SidebarItem key={item.href} href={item.href} title={item.title}>
						<item.icon size={14} />
						<span className="sr-only">{item.title}</span>
					</SidebarItem>
				))}
			</div>
			<div className="size-12 flex items-center justify-center">
				<UserMenu />
			</div>
		</div>
	);
}

type SidebarItemProps = PropsWithChildren<{
	title: string;
	href: string;
}>;

function SidebarItem({ children, title, href }: SidebarItemProps): ReactElement {
	return (
		<Tooltip side="left" content={title}>
			<span>
				<NavLink
					key={title}
					to={href}
					className={(props) =>
						cn("size-12 flex items-center justify-center transition-all duration-100", {
							"bg-gray-3 text-violet-11": props.isActive,
							"text-gray-10 hover:text-gray-12": !props.isActive,
						})
					}
				>
					{children}
				</NavLink>
			</span>
		</Tooltip>
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
				<Tooltip side="left" content={user.email ?? ""}>
					<span>
						<UserAvatar email={user.email ?? ""} displayName={user.displayName ?? ""} />
					</span>
				</Tooltip>
			</span>
		</Dropdown>
	);
}
