import {
	createFileRoute,
	Outlet,
	redirect,
	useNavigate,
} from "@tanstack/react-router";

import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import {
	AnimatedSidebarInset,
	AnimatedSidebarProvider,
} from "@/components/motion/animated-sidebar";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
	ssr: false,
	component: AuthLayout,
	beforeLoad: async () => {
		const session = await getSessionFast();
		if (!session.data) {
			throw redirect({
				to: "/login",
			});
		}
		return { session };
	},
});

/**
 * `beforeLoad` runs on every navigation inside the dashboard. Reuse the
 * session the auth client already holds (kept current by sign-in, sign-out
 * and profile updates) so moving between pages doesn't wait on the network;
 * only a cold load asks the server.
 */
async function getSessionFast() {
	const cached = authClient.$store.atoms.session?.get() as
		| {
				data: Awaited<ReturnType<typeof authClient.getSession>>["data"];
				isPending: boolean;
		  }
		| undefined;
	if (cached && !cached.isPending && cached.data) {
		return { data: cached.data, error: null };
	}
	return authClient.getSession();
}

function AuthLayout() {
	const navigate = useNavigate();
	return (
		<AnimatedSidebarProvider
			className="bg-sidebar"
			onNavigate={(href) => navigate({ to: href })}
		>
			<AppSidebar />
			<AnimatedSidebarInset className="overflow-hidden">
				<Outlet />
			</AnimatedSidebarInset>
		</AnimatedSidebarProvider>
	);
}
