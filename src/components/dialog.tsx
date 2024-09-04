import React, { PropsWithChildren } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "~/utils/cn";
import { Button } from "./button";

type DialogProps = PropsWithChildren<{
	open: boolean;
	onClose(): void;
	title: string;
	description?: string;
}>;

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
	({ children, open, onClose, title, description }, forwardedRef) => (
		<DialogPrimitive.Root open={open} onOpenChange={(open) => (!open ? onClose() : undefined)}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0" />
				<DialogPrimitive.Content
					className={cn(
						"rounded-xl bg-gray-2 border border-gray-4 p-[25px] shadow-lg focus:outline-none",
						"data-[state=open]:animate-contentShow",
						"fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2"
					)}
					ref={forwardedRef}
				>
					<div className="flex items-center justify-between mb-4">
						<DialogPrimitive.Title className="text-2xl font-bold">{title}</DialogPrimitive.Title>
						<DialogPrimitive.Close aria-label="Close" asChild>
							<Button variant={"ghost"} size={"icon"}>
								<X size={20} />
							</Button>
						</DialogPrimitive.Close>
					</div>
					{description && (
						<DialogPrimitive.Description className="text-gray-11 mb-4">
							{description}
						</DialogPrimitive.Description>
					)}
					{children}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
);

export const DialogTitle = DialogPrimitive.Title;
