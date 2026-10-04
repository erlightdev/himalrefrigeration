import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@himalref/ui/components/sheet";
import { cn } from "@himalref/ui/lib/utils";
import { Bell } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
	NotificationStack,
	type NotificationStackItem,
} from "@/components/motion/notification-stack";
import { EASE_OUT } from "@/lib/ease";

type AppNotification = {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
};

// Placeholder feed until notifications have a backend: service reminders and
// account events will replace these.
const SAMPLE_NOTIFICATIONS: AppNotification[] = [
	{
		id: "visit-confirmed",
		title: "Service visit confirmed",
		description: "A technician will arrive Thursday between 10–12.",
		time: "2h",
		read: false,
	},
	{
		id: "filter-due",
		title: "Filter replacement due",
		description: "Your split AC is due for its 6-month filter change.",
		time: "1d",
		read: false,
	},
	{
		id: "warranty",
		title: "Warranty registered",
		description: "Coverage is active until October 2028.",
		time: "3d",
		read: false,
	},
	{
		id: "invoice-paid",
		title: "Invoice paid",
		description: "Payment for your annual maintenance plan was received.",
		time: "1w",
		read: true,
	},
	{
		id: "welcome",
		title: "Welcome to Himal Care",
		description: "Track installations, warranties and service visits here.",
		time: "2w",
		read: true,
	},
];

function toStackItem(item: AppNotification): NotificationStackItem {
	return {
		id: item.id,
		title: item.title,
		description: item.description,
		trailing: <span className="text-muted-foreground">{item.time}</span>,
	};
}

/**
 * The beUI stack is built to sit in a page and unfold upward from its compact
 * footprint. In a drop-down we want it to unfold downward instead, so the
 * wrapper reserves the height the expanded cards grow into.
 */
function useUnfoldDownward(active: boolean, itemCount: number) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [reserve, setReserve] = useState(0);

	useLayoutEffect(() => {
		const wrapper = wrapperRef.current;
		if (!active || !wrapper) return;
		const button = wrapper.querySelector<HTMLElement>(":scope > button");
		const layer = button?.querySelector<HTMLElement>(":scope > span.absolute");
		if (!button || !layer) {
			setReserve(0);
			return;
		}
		const measure = () =>
			setReserve(Math.max(0, layer.offsetHeight - button.offsetHeight));
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(layer);
		return () => observer.disconnect();
	}, [active, itemCount]);

	return { wrapperRef, reserve };
}

export function NotificationsMenu() {
	const reduce = useReducedMotion();
	const rootRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [items, setItems] = useState(SAMPLE_NOTIFICATIONS);
	const unread = items.filter((item) => !item.read);
	const { wrapperRef, reserve } = useUnfoldDownward(open, unread.length);
	const markAllRead = () =>
		setItems((current) => current.map((item) => ({ ...item, read: true })));
	const markRead = (id: string) =>
		setItems((current) =>
			current.map((item) => (item.id === id ? { ...item, read: true } : item)),
		);

	// Open compact, then unfold on the next frame so the stack animates in.
	useEffect(() => {
		if (!open) {
			setExpanded(false);
			return;
		}
		const frame = requestAnimationFrame(() => setExpanded(true));
		return () => cancelAnimationFrame(frame);
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onPointer = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("pointerdown", onPointer);
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("pointerdown", onPointer);
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const count = unread.length;

	return (
		<div ref={rootRef} className="relative">
			<button
				type="button"
				aria-label={count ? `Notifications, ${count} unread` : "Notifications"}
				aria-expanded={open}
				aria-haspopup="dialog"
				onClick={() => setOpen((value) => !value)}
				className={cn(
					"relative grid size-8 place-items-center rounded-md border border-border bg-background text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
					open && "bg-accent",
				)}
			>
				<Bell className="size-[1.1rem] text-primary" />
				{count ? (
					<span className="absolute -top-1 -right-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 font-semibold text-[10px] text-primary-foreground leading-4 ring-2 ring-background">
						{count}
					</span>
				) : null}
			</button>

			<AnimatePresence>
				{open ? (
					<motion.div
						role="dialog"
						aria-label="Notifications"
						initial={
							reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }
						}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.18, ease: EASE_OUT }}
						style={{ transformOrigin: "top right" }}
						className="absolute top-full right-0 z-50 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] rounded-3xl border border-border bg-popover p-1.5 shadow-xl"
					>
						<div className="flex items-center justify-between px-3 pt-2 pb-1">
							<p className="font-medium text-sm">Notifications</p>
							{count ? (
								<button
									type="button"
									onClick={markAllRead}
									className="rounded-md px-1.5 py-0.5 text-muted-foreground text-xs outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
								>
									Mark all read
								</button>
							) : null}
						</div>
						<div ref={wrapperRef} style={{ paddingTop: reserve }}>
							<NotificationStack
								items={unread.map(toStackItem)}
								expanded={expanded}
								onExpandedChange={() => {}}
								onViewAll={() => {
									setOpen(false);
									setSheetOpen(true);
								}}
								collapsedLabel="Notifications"
								expandedLabel="All notifications"
								className="max-w-none"
								emptyLabel="You're all caught up"
								classNames={{ count: "bg-primary dark:bg-primary" }}
							/>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>

			<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
				<SheetContent side="right" className="w-full gap-0 sm:max-w-md">
					<SheetHeader className="border-b px-5 py-4">
						<SheetTitle className="text-base">Notifications</SheetTitle>
						<SheetDescription>
							{count
								? `${count} unread · ${items.length} total`
								: "You're all caught up."}
						</SheetDescription>
					</SheetHeader>
					<ul className="flex-1 overflow-y-auto p-2">
						{items.map((item) => (
							<li key={item.id}>
								<button
									type="button"
									onClick={() => markRead(item.id)}
									className={cn(
										"flex w-full gap-3 rounded-xl px-3 py-3 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:bg-muted/60",
										item.read && "opacity-60",
									)}
								>
									<span
										aria-hidden="true"
										className={cn(
											"mt-1.5 size-2 shrink-0 rounded-full",
											item.read ? "bg-transparent" : "bg-primary",
										)}
									/>
									<span className="min-w-0 flex-1">
										<span className="flex items-start justify-between gap-3">
											<span className="font-medium text-sm">{item.title}</span>
											<span className="shrink-0 text-muted-foreground text-xs">
												{item.time}
											</span>
										</span>
										<span className="mt-0.5 block text-muted-foreground text-xs leading-relaxed">
											{item.description}
										</span>
										<span className="sr-only">
											{item.read ? "Read" : "Unread — select to mark read"}
										</span>
									</span>
								</button>
							</li>
						))}
					</ul>
					<SheetFooter className="border-t px-5 py-3">
						<button
							type="button"
							onClick={markAllRead}
							disabled={!count}
							className="self-end rounded-md px-2 py-1 text-muted-foreground text-xs outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
						>
							Mark all read
						</button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}
