import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApplicationProviders } from "~/providers";
import { Router } from "~/router.tsx";
import "~/lib/i18n";
import "~/main.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApplicationProviders>
			<Router />
		</ApplicationProviders>
	</StrictMode>
);
