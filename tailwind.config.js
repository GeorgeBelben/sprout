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
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
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
			},
			animation: {
				slideDownAndFade: "slideDownAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideLeftAndFade: "slideLeftAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideUpAndFade: "slideUpAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideRightAndFade: "slideRightAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
			},
		},
	},
	plugins: [],
};
