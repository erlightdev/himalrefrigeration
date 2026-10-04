import evlog from "evlog/nitro/v3";
import { defineConfig } from "nitro";

export default defineConfig({
	serverDir: "./server",
	plugins: ["./server/plugins/evlog-drain.ts"],
	experimental: {
		asyncContext: true,
	},
	modules: [
		evlog({
			env: { service: "himalref-web" },
		}),
	],
});
