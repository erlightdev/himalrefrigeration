"use client";

import { cn } from "@himalref/ui/lib/utils";
import { Check, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";

export type ServiceTabItem = {
	icon: LucideIcon;
	title: string;
	description: string;
	points: readonly string[];
};

/**
 * Vertical-tab "what's included" browser: icon+label tab rail on the left,
 * an animated panel with the feature's details and a framed image on the
 * right. On mobile the rail becomes a horizontally scrolling pill row and
 * the image drops below the copy.
 */
export function ServiceTabs({
	items,
	image,
	label,
}: {
	items: readonly ServiceTabItem[];
	image: string;
	label: string;
}) {
	const [active, setActive] = useState(0);
	const reduce = useReducedMotion();
	const layoutGroupId = useId();
	const item = items[active];
	const Icon = item.icon;

	return (
		<div className="grid gap-3 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-5">
			<div
				role="tablist"
				aria-orientation="vertical"
				aria-label={`${label} inclusions`}
				className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0"
			>
				{items.map((tab, index) => {
					const selected = index === active;
					const TabIcon = tab.icon;
					return (
						<button
							key={tab.title}
							type="button"
							role="tab"
							aria-selected={selected}
							onClick={() => setActive(index)}
							className="relative shrink-0 rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full"
						>
							{selected ? (
								<motion.span
									layoutId={`${layoutGroupId}-tab-bg`}
									transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
									className="absolute inset-0 rounded-2xl border border-border bg-card shadow-sm"
								/>
							) : null}
							<span className="relative z-10 flex items-center gap-3 px-4 py-3.5">
								<TabIcon
									aria-hidden="true"
									className={cn(
										"size-4.5 shrink-0 transition-colors",
										selected ? "text-primary" : "text-muted-foreground",
									)}
								/>
								<span
									className={cn(
										"whitespace-nowrap font-medium text-sm transition-colors lg:whitespace-normal",
										selected
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{tab.title}
								</span>
							</span>
						</button>
					);
				})}
			</div>

			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={active}
					role="tabpanel"
					initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
					transition={{ duration: 0.25, ease: EASE_OUT }}
					className="grid overflow-hidden rounded-3xl border border-border bg-muted/40 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
				>
					<div className="p-6 sm:p-8">
						<span className="grid size-12 place-items-center rounded-2xl bg-accent text-primary">
							<Icon className="size-5" aria-hidden="true" />
						</span>
						<h3 className="mt-6 font-semibold text-xl tracking-tight sm:text-2xl">
							{item.title}
						</h3>
						<p className="mt-2 text-pretty text-muted-foreground leading-relaxed">
							{item.description}
						</p>
						<ul className="mt-6 space-y-2.5">
							{item.points.map((point) => (
								<li key={point} className="flex items-start gap-2.5 text-sm">
									<Check
										className="mt-0.5 size-4 shrink-0 text-primary"
										aria-hidden="true"
									/>
									<span>{point}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="flex items-center border-border border-t bg-card p-4 sm:border-t-0 sm:border-l">
						<div className="w-full overflow-hidden rounded-xl border border-border bg-background">
							<div className="flex items-center gap-1.5 border-border border-b px-3 py-2.5">
								<span
									aria-hidden="true"
									className="size-2 rounded-full bg-zinc-300"
								/>
								<span
									aria-hidden="true"
									className="size-2 rounded-full bg-zinc-300"
								/>
								<span
									aria-hidden="true"
									className="size-2 rounded-full bg-zinc-300"
								/>
							</div>
							<img
								src={image}
								alt=""
								loading="lazy"
								className="aspect-[4/3] w-full object-cover"
							/>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
