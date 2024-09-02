import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "../logo";

const meta = {
	title: "Components/Logo",
	component: Logo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		color: { control: "radio", options: ["brand", "foreground", "foreground-muted", "background"] },
		size: { control: "radio", options: ["xs", "sm", "md", "lg", "xl"] },
	},
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		size: "md",
		color: "brand",
	},
};
