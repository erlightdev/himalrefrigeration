import { PanelLeft } from "lucide-react";
import type { ReactNode } from "react";

import { NotificationsMenu } from "@/features/dashboard/components/notifications-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedSidebarTrigger } from "@/components/motion/animated-sidebar";

export function PageHeader({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: ReactNode;
}) {
	return (
		<header className="flex h-16 shrink-0 items-center justify-between gap-3 border-border border-b px-4">
			<div className="flex min-w-0 items-center gap-3">
				<AnimatedSidebarTrigger className="text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
					<PanelLeft aria-hidden="true" className="size-4" />
				</AnimatedSidebarTrigger>
				<div className="h-5 w-px bg-border" />
				<p className="truncate font-medium text-sm">{title}</p>
				{description ? (
					<span className="hidden text-muted-foreground text-xs sm:inline">
						{description}
					</span>
				) : null}
			</div>
			<div className="flex items-center gap-2">
				{actions}
				<NotificationsMenu />
				<ModeToggle />
			</div>
		</header>
	);
}
