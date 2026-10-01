import {
	createFileRoute,
	Outlet,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";

import { PageHeader } from "@/components/dashboard/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { usePermissions } from "@/hooks/use-permissions";

export const Route = createFileRoute("/_auth/settings")({
	component: SettingsLayout,
});

const SECTIONS = [
	{ to: "/settings/profile", label: "Profile" },
	{ to: "/settings/users", label: "Users & roles", permission: true },
] as const;

function SettingsLayout() {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const canManageUsers = usePermissions().can({ user: ["list"] });
	const sections = SECTIONS.filter(
		(section) => !("permission" in section) || canManageUsers,
	);

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader title="Settings" />
			<div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pt-4 pb-12 sm:px-8 sm:pt-6">
				{sections.length > 1 ? (
					<Tabs
						variant="underline"
						value={pathname}
						onValueChange={(to) => navigate({ to })}
						className="mb-6"
					>
						<TabsList wrapperClassName="w-full" className="w-full">
							{sections.map((section) => (
								<TabsTrigger key={section.to} value={section.to}>
									{section.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				) : null}
				<Outlet />
			</div>
		</div>
	);
}
