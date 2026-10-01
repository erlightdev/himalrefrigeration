import { createFileRoute, redirect } from "@tanstack/react-router";

// User management moved under Settings; keep the old address working.
export const Route = createFileRoute("/_auth/users")({
	beforeLoad: () => {
		throw redirect({ to: "/settings/users" });
	},
});
