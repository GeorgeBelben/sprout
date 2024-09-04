function getColorScale(name) {
	let scale = {};
	for (let i = 1; i <= 12; i++) {
		scale[i] = `var(--${name}-${i})`;
	}
	return scale;
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			gray: getColorScale("gray"),
			violet: getColorScale("violet"),
			red: getColorScale("red"),
			blue: getColorScale("blue"),
			green: getColorScale("green"),
			black: "#000",
			white: "#fff",
			transparent: "transparent",
		},
		extend: {
			fontFamily: {
				sans: ["Plus Jakarta Sans", "sans-serif"],
			},
			keyframes: {
				slideDownAndFade: {
					from: { opacity: "0", transform: "translateY(-2px) scale(0.9)" },
					to: { opacity: "1", transform: "translateY(0) scale(1)" },
				},
				slideLeftAndFade: {
					from: { opacity: "0", transform: "translateX(2px) scale(0.9)" },
					to: { opacity: "1", transform: "translateX(0) scale(1)" },
				},
				slideUpAndFade: {
					from: { opacity: "0", transform: "translateY(2px) scale(0.9)" },
					to: { opacity: "1", transform: "translateY(0) scale(1)" },
				},
				slideRightAndFade: {
					from: { opacity: "0", transform: "translateX(-2px) scale(0.9)" },
					to: { opacity: "1", transform: "translateX(0) scale(1)" },
				},
				overlayShow: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				contentShow: {
					from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
					to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
				},
			},
			animation: {
				slideDownAndFade: "slideDownAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideLeftAndFade: "slideLeftAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideUpAndFade: "slideUpAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideRightAndFade: "slideRightAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
				overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
			},
		},
	},
	plugins: [],
};
