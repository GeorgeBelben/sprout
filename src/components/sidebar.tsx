import { Briefcase, LayoutDashboard } from "lucide-react";
import { PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "./tooltip";

const sidebarItems = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		href: "/",
	},
	{
		title: "Projects",
		icon: Briefcase,
		href: "/projects",
	},
];

export function Sidebar(): ReactElement {
	return (
		<div className="w-12 flex flex-col">
			<div className="flex-1 flex flex-col">
				{sidebarItems.map((item) => (
					<SidebarItem key={item.href} href={item.href} title={item.title}>
						<item.icon size={14} />
						<span className="sr-only">{item.title}</span>
					</SidebarItem>
				))}
			</div>
			<div></div>
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
			<Link
				key={title}
				to={href}
				className="size-12 flex items-center justify-center text-gray-10 hover:text-gray-12 transition-all duration-100"
			>
				{children}
			</Link>
		</Tooltip>
	);
}
