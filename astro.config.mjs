import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: netlify(),
	integrations: [
		react(),
		icon(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
});
