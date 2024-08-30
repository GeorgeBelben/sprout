import type { Preview } from "@storybook/react";
import "../src/main.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "gray-1",
			values: [
				{
					name: "gray-1",
					value: "var(--gray-1)",
				},
			],
		},
	},
};

export default preview;
