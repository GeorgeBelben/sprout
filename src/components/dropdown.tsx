import { PropsWithChildren, ReactElement } from "react";
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "~/utils/cn";

type BaseMenuItem = {
	label: string;
	key: string;
	icon: LucideIcon;
	keyboardShortcut?: string;
};

type MenuItemLink = BaseMenuItem & {
	href: string;
};

type MenuItemButton = BaseMenuItem & {
	onClick: () => void;
};

type MenuItem = MenuItemLink | MenuItemButton;

type DropdownProps = PropsWithChildren<{
	menuItems: MenuItem[];
}>;

export function Dropdown({ children, menuItems }: DropdownProps): ReactElement {
	return (
		<DropdownPrimitive.Root>
			<DropdownPrimitive.Trigger asChild>{children}</DropdownPrimitive.Trigger>

			<DropdownPrimitive.Portal>
				<DropdownPrimitive.Content
					className="min-w-56 bg-gray-2 border border-gray-4 rounded-md p-1 shadow will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
					sideOffset={8}
					collisionPadding={8}
				>
					{menuItems.map((item) => {
						const onRenderInnerItem = () => (
							<>
								<div className="flex items-center space-x-2">
									<item.icon size={14} />
									<span>{item.label}</span>
								</div>
								{item.keyboardShortcut && (
									<div className="ml-auto bg-gray-4 text-gray-10 font-semibold px-1.5 py-1 rounded font-mono text-[10px] group-data-[highlighted]:bg-gray-6 group-data-[highlighted]:text-gray-12 group-data-[disabled]:text-mauve8">
										{item.keyboardShortcut}
									</div>
								)}
							</>
						);

						return (
							<DropdownPrimitive.Item
								key={item.key}
								asChild
								className={cn(
									"group cursor-pointer text-sm leading-none text-gray-10 rounded flex items-center h-8 px-3 relative select-none outline-none data-[disabled]:text-violet-8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-4 data-[highlighted]:text-gray-12 transition-all duration-100"
								)}
							>
								{"onClick" in item ? (
									<button className="w-full" onClick={item.onClick}>
										{onRenderInnerItem()}
									</button>
								) : (
									<Link to={item.href}>{onRenderInnerItem()}</Link>
								)}
							</DropdownPrimitive.Item>
						);
					})}
				</DropdownPrimitive.Content>
			</DropdownPrimitive.Portal>
		</DropdownPrimitive.Root>
	);
}
