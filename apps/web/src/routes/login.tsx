import { createFileRoute } from "@tanstack/react-router";

import AuthLandscape from "@/components/auth/auth-landscape";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthLandscape />;
}
