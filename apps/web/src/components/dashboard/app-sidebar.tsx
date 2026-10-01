import { useNavigate } from "@tanstack/react-router";
import {
	Bell,
	ClipboardList,
	FileText,
	LayoutGrid,
	LifeBuoy,
	LogOut,
	type LucideIcon,
	Search,
	Settings,
	ShieldCheck,
	Wrench,
	X,
} from "lucide-react";
import { useState } from "react";

import {
	AnimatedSidebar,
	AnimatedSidebarClose,
	AnimatedSidebarContent,
	AnimatedSidebarFooter,
	AnimatedSidebarGroup,
	AnimatedSidebarGroupContent,
	AnimatedSidebarGroupLabel,
	AnimatedSidebarHeader,
	AnimatedSidebarMenu,
	AnimatedSidebarMenuButton,
	AnimatedSidebarMenuItem,
	AnimatedSidebarMenuSub,
	AnimatedSidebarMenuSubButton,
	AnimatedSidebarMenuSubItem,
	AnimatedSidebarRail,
	useAnimatedSidebar,
} from "@/components/motion/animated-sidebar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/motion/select";
import { authClient } from "@/lib/auth-client";

const destinations = [
	{ label: "Overview", href: "/dashboard", icon: LayoutGrid },
	{
		label: "Service requests",
		icon: Wrench,
		children: ["Open requests", "Scheduled visits", "History"],
	},
	{
		label: "Installations",
		icon: ClipboardList,
		children: ["All units", "Maintenance plans"],
	},
	{ label: "Warranties", icon: ShieldCheck },
	{ label: "Invoices", icon: FileText },
] satisfies {
	label: string;
	href?: string;
	icon: LucideIcon;
	children?: string[];
}[];

export function AppSidebar() {
	const [active, setActive] = useState("Overview");
	const [openSection, setOpenSection] = useState<string | null>(null);

	return (
		<AnimatedSidebar
			variant="inset"
			collapsible="icon"
			ariaLabel="Customer dashboard navigation"
		>
			<AnimatedSidebarHeader className="p-3 pb-2">
				<div className="flex min-h-11 items-center gap-3 overflow-hidden px-2">
					<a
						href="/"
						className="grid size-7 shrink-0 place-items-center rounded-lg bg-background shadow-xs outline-none ring-1 ring-sidebar-border focus-visible:ring-2 focus-visible:ring-ring"
					>
						<img src="/images/logo.svg" alt="Himal" className="size-5" />
					</a>
					<span className="min-w-0 flex-1 truncate font-semibold text-sm group-data-[state=collapsed]/sidebar:hidden">
						Himal Refrigeration
					</span>
					<AnimatedSidebarClose className="ml-auto text-muted-foreground hover:bg-muted md:hidden">
						<X aria-hidden="true" className="size-4" />
					</AnimatedSidebarClose>
				</div>
			</AnimatedSidebarHeader>

			<AnimatedSidebarContent className="px-2 pt-1">
				<AnimatedSidebarGroup className="pb-2">
					<AnimatedSidebarGroupContent>
						<AnimatedSidebarMenu>
							<AnimatedSidebarMenuItem>
								<AnimatedSidebarMenuButton
									icon={<Search className="size-4" />}
									onSelect={() => setActive("Search")}
								>
									Search
								</AnimatedSidebarMenuButton>
							</AnimatedSidebarMenuItem>
							<AnimatedSidebarMenuItem>
								<AnimatedSidebarMenuButton
									icon={<Bell className="size-4" />}
									badge="2"
									onSelect={() => setActive("Notifications")}
								>
									Notifications
								</AnimatedSidebarMenuButton>
							</AnimatedSidebarMenuItem>
						</AnimatedSidebarMenu>
					</AnimatedSidebarGroupContent>
				</AnimatedSidebarGroup>

				<AnimatedSidebarGroup className="pt-1">
					<AnimatedSidebarGroupLabel>Workspace</AnimatedSidebarGroupLabel>
					<AnimatedSidebarGroupContent>
						<AnimatedSidebarMenu>
							{destinations.map(({ label, icon: Icon, ...item }) => {
								const children = "children" in item ? item.children : undefined;
								const href = "href" in item ? item.href : undefined;

								return (
									<AnimatedSidebarMenuItem key={label}>
										<AnimatedSidebarMenuButton
											href={href}
											isActive={
												active === label || children?.includes(active) === true
											}
											ariaExpanded={
												children ? openSection === label : undefined
											}
											icon={<Icon className="size-4" />}
											onSelect={() => {
												if (!children) {
													setActive(label);
													setOpenSection(null);
													return;
												}
												setOpenSection((current) =>
													current === label ? null : label,
												);
											}}
										>
											{label}
										</AnimatedSidebarMenuButton>
										{children ? (
											<AnimatedSidebarMenuSub open={openSection === label}>
												{children.map((child) => (
													<AnimatedSidebarMenuSubItem key={child}>
														<AnimatedSidebarMenuSubButton
															isActive={active === child}
															onSelect={() => setActive(child)}
														>
															{child}
														</AnimatedSidebarMenuSubButton>
													</AnimatedSidebarMenuSubItem>
												))}
											</AnimatedSidebarMenuSub>
										) : null}
									</AnimatedSidebarMenuItem>
								);
							})}
						</AnimatedSidebarMenu>
					</AnimatedSidebarGroupContent>
				</AnimatedSidebarGroup>

				<AnimatedSidebarGroup className="pt-1">
					<AnimatedSidebarGroupLabel>Support</AnimatedSidebarGroupLabel>
					<AnimatedSidebarGroupContent>
						<AnimatedSidebarMenu>
							<AnimatedSidebarMenuItem>
								<AnimatedSidebarMenuButton
									icon={<LifeBuoy className="size-4" />}
									isActive={active === "Get help"}
									onSelect={() => setActive("Get help")}
								>
									Get help
								</AnimatedSidebarMenuButton>
							</AnimatedSidebarMenuItem>
							<AnimatedSidebarMenuItem>
								<AnimatedSidebarMenuButton
									icon={<Settings className="size-4" />}
									isActive={active === "Settings"}
									onSelect={() => setActive("Settings")}
								>
									Settings
								</AnimatedSidebarMenuButton>
							</AnimatedSidebarMenuItem>
						</AnimatedSidebarMenu>
					</AnimatedSidebarGroupContent>
				</AnimatedSidebarGroup>
			</AnimatedSidebarContent>

			<AnimatedSidebarFooter className="gap-3 border-none p-3">
				<SidebarUser />
			</AnimatedSidebarFooter>

			<AnimatedSidebarRail />
		</AnimatedSidebar>
	);
}

function SidebarUser() {
	const navigate = useNavigate();
	const sidebar = useAnimatedSidebar();
	const [open, setOpen] = useState(false);
	const { data: session } = authClient.useSession();
	const name = session?.user.name ?? "Account";
	const email = session?.user.email ?? "";
	const initials =
		name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.slice(0, 2)
			.toUpperCase() || "HR";

	const signOut = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: "/" });
				},
			},
		});
	};

	return (
		<Select
			value=""
			open={open}
			onOpenChange={(next) => {
				// The panel can't fit in the icon rail, so opening from there
				// unfolds the sidebar first.
				if (next && !sidebar.isMobile && !sidebar.open) sidebar.setOpen(true);
				setOpen(next);
			}}
			onValueChange={(action) => {
				if (action === "sign-out") signOut();
			}}
			className="w-full"
		>
			<SelectTrigger className="min-h-11 gap-3 overflow-hidden border-transparent bg-transparent p-1 pr-3 hover:border-sidebar-border hover:bg-sidebar-foreground/[0.05] group-data-[state=collapsed]/sidebar:pr-1 group-data-[state=collapsed]/sidebar:[&>span:last-child]:hidden">
				<span className="flex min-w-0 flex-1 items-center gap-3 text-left">
					<span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
						{initials}
					</span>
					<span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
						<span className="block truncate font-medium text-sm">{name}</span>
						<span className="block truncate text-muted-foreground text-xs">
							{email}
						</span>
					</span>
				</span>
			</SelectTrigger>
			<SelectContent className="border-sidebar-border bg-card">
				<p className="px-2.5 pt-1.5 pb-1 font-medium text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
					My account
				</p>
				<SelectItem value="settings">
					<span className="flex items-center gap-2">
						<Settings className="size-3.5" />
						Settings
					</span>
				</SelectItem>
				<SelectItem
					value="sign-out"
					className="text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:bg-destructive/10"
				>
					<span className="flex items-center gap-2">
						<LogOut className="size-3.5" />
						Sign out
					</span>
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
