import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
	AnimatedSidebarInset,
	AnimatedSidebarProvider,
} from "@/components/motion/animated-sidebar";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
	ssr: false,
	component: AuthLayout,
	beforeLoad: async () => {
		const session = await authClient.getSession();
		if (!session.data) {
			throw redirect({
				to: "/login",
			});
		}
		return { session };
	},
});

function AuthLayout() {
	return (
		<AnimatedSidebarProvider className="bg-sidebar">
			<AppSidebar />
			<AnimatedSidebarInset className="overflow-hidden">
				<Outlet />
			</AnimatedSidebarInset>
		</AnimatedSidebarProvider>
	);
}
