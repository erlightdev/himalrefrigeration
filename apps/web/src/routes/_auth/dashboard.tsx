import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@himalref/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, CalendarDays, PanelLeft, Wrench } from "lucide-react";
import type { ReactNode } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedSidebarTrigger } from "@/components/motion/animated-sidebar";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/_auth/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { session } = Route.useRouteContext();
	const privateData = useQuery(orpc.privateData.queryOptions());
	const firstName = session.data?.user.name?.split(" ")[0] ?? "there";

	return (
		<div className="flex flex-1 flex-col">
			<header className="flex h-16 shrink-0 items-center justify-between gap-3 border-border border-b px-4">
				<div className="flex min-w-0 items-center gap-3">
					<AnimatedSidebarTrigger className="text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
						<PanelLeft aria-hidden="true" className="size-4" />
					</AnimatedSidebarTrigger>
					<div className="h-5 w-px bg-border" />
					<p className="truncate font-medium text-sm">Overview</p>
					<span className="hidden text-muted-foreground text-xs sm:inline">
						Manage your cooling fleet
					</span>
				</div>
				<ModeToggle />
			</header>

			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-5 sm:p-8">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<p className="text-muted-foreground text-sm">
							Welcome back, {firstName}
						</p>
						<h1 className="mt-1 font-semibold text-2xl tracking-tight">
							Your comfort, at a glance.
						</h1>
					</div>
					<p className="text-muted-foreground text-sm">Today</p>
				</div>

				<section
					className="grid gap-4 md:grid-cols-3"
					aria-label="Account summary"
				>
					<SummaryCard
						label="Active units"
						value="0"
						description="Add an installation to begin."
						icon={<Activity />}
					/>
					<SummaryCard
						label="Open requests"
						value="0"
						description="No service visits in progress."
						icon={<Wrench />}
					/>
					<SummaryCard
						label="Upcoming visits"
						value="0"
						description="Your schedule is clear."
						icon={<CalendarDays />}
					/>
				</section>

				<section className="grid flex-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
					<Card className="min-h-64">
						<CardHeader>
							<CardTitle>Service activity</CardTitle>
							<CardDescription>
								Requests and appointment updates will appear here.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-1 items-center justify-center">
							<div className="max-w-xs text-center">
								<div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
									<Wrench className="size-5" />
								</div>
								<p className="mt-3 font-medium text-sm">
									Nothing needs attention
								</p>
								<p className="mt-1 text-muted-foreground text-xs">
									When you request a visit, its status will be tracked here.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Account connection</CardTitle>
							<CardDescription>
								Private API status for your signed-in account.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="font-medium text-sm">
								{privateData.isPending
									? "Checking connection…"
									: (privateData.data?.message ?? "Connection unavailable")}
							</p>
							<p className="mt-2 text-muted-foreground text-xs">
								Signed in as {session.data?.user.email}
							</p>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}

function SummaryCard({
	label,
	value,
	description,
	icon,
}: {
	label: string;
	value: string;
	description: string;
	icon: ReactNode;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{label}</CardTitle>
				<CardAction className="text-muted-foreground">{icon}</CardAction>
			</CardHeader>
			<CardContent>
				<p className="font-semibold text-2xl tracking-tight">{value}</p>
				<p className="mt-1 text-muted-foreground text-xs">{description}</p>
			</CardContent>
		</Card>
	);
}
