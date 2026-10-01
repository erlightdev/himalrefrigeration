import { createFsDrain } from "evlog/fs";

// Nitro injects defineNitroPlugin as an ambient global at runtime
declare const defineNitroPlugin: (
	fn: (nitroApp: { hooks: { hook: (event: string, handler: unknown) => void } }) => void,
) => void;

export default defineNitroPlugin((nitroApp) => {
	if (!import.meta.dev) return;
	nitroApp.hooks.hook("evlog:drain", createFsDrain());
});
