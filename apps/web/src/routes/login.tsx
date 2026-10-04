import { createFileRoute } from "@tanstack/react-router";

import AuthLandscape from "@/features/auth/components/auth-landscape";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthLandscape />;
}
