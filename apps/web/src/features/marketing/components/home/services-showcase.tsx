import { cn } from "@himalref/ui/lib/utils";
import {
	Check,
	ClipboardCheck,
	Fan,
	type LucideIcon,
	Refrigerator,
	Thermometer,
	Wrench,
} from "lucide-react";
import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Service = {
	label: string;
	tag: string;
	title: string;
	description: string;
	points: [string, string];
	Visual: () => ReactNode;
};

/* ── Shared vignette parts ─────────────────────────────────────────────── */

const card =
	"rounded-2xl border border-border bg-card text-card-foreground shadow-xl shadow-black/5";

function IconChip({ icon: Icon }: { icon: LucideIcon }) {
	return (
		<span className="grid size-9 place-items-center rounded-full border border-border bg-muted/60">
			<Icon className="size-4 text-muted-foreground" />
		</span>
	);
}

function Pill({ children }: { children: ReactNode }) {
	return (
		<span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
			{children}
		</span>
	);
}

function Toast({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"absolute flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-medium text-xs shadow-lg",
				className,
			)}
		>
			<Check className="size-3.5 text-primary" />
			{children}
		</div>
	);
}

/* ── One vignette per service ──────────────────────────────────────────── */

function RefrigerationVisual() {
	return (
		<div className="relative w-64">
			<div className={cn(card, "absolute inset-0 -rotate-6 opacity-50")} />
			<div className={cn(card, "absolute inset-0 rotate-3 opacity-70")} />
			<div className={cn(card, "relative p-5")}>
				<div className="flex items-center justify-between">
					<IconChip icon={Refrigerator} />
					<span className="font-mono text-[11px] text-muted-foreground">
						COLD ROOM 01
					</span>
				</div>
				<p className="mt-5 font-semibold text-3xl tabular-nums tracking-tight">
					−18°C
				</p>
				<p className="text-muted-foreground text-xs">
					Walk-in freezer · set point
				</p>
				<div className="mt-4 grid gap-1.5">
					<div className="h-1.5 w-full rounded-full bg-muted" />
					<div className="h-1.5 w-4/5 rounded-full bg-muted" />
					<div className="h-1.5 w-3/5 rounded-full bg-muted" />
				</div>
				<div className="mt-4 flex flex-wrap gap-1.5">
					<Pill>Supermarket</Pill>
					<Pill>Display cases</Pill>
				</div>
			</div>
			<Toast className="-right-8 -bottom-5">Holding steady</Toast>
		</div>
	);
}

function HvacVisual() {
	const zones = [
		{ name: "Lobby", temp: "22°" },
		{ name: "Offices", temp: "23°" },
		{ name: "Server", temp: "18°" },
	];
	return (
		<div className="relative w-72">
			<div className={cn(card, "p-4")}>
				<div className="flex items-center justify-between">
					<p className="font-medium text-sm">Floor 3 / VRF system</p>
					<span className="text-muted-foreground text-xs">12 units</span>
				</div>
				<div className="mt-3 grid grid-cols-3 gap-2">
					{zones.map((zone) => (
						<div key={zone.name} className="rounded-xl bg-muted/60 px-2.5 py-3">
							<p className="font-semibold text-lg tabular-nums">{zone.temp}</p>
							<p className="text-[11px] text-muted-foreground">{zone.name}</p>
						</div>
					))}
				</div>
			</div>
			<div className={cn(card, "relative -mt-3 ml-10 p-4")}>
				<div className="flex items-center gap-2.5">
					<IconChip icon={Fan} />
					<div>
						<p className="font-medium text-sm">Each zone, its own climate</p>
						<p className="text-muted-foreground text-xs">
							Multi-split and VRF, one controller
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function MaintenanceVisual() {
	const steps = ["Inspect", "Clean", "Recharge"];
	return (
		<div className="relative w-72">
			<div className={cn(card, "p-5")}>
				<div className="flex items-center justify-between">
					<p className="font-medium text-sm">Scheduled service</p>
					<Pill>Visit 04</Pill>
				</div>
				<div className="mt-5 flex items-center">
					{steps.map((step, index) => (
						<div key={step} className="flex flex-1 items-center last:flex-none">
							<div className="flex flex-col items-center gap-1.5">
								<span className="grid size-8 place-items-center rounded-full border border-primary/40 bg-primary/10">
									<Check className="size-3.5 text-primary" />
								</span>
								<span className="text-[11px] text-muted-foreground">
									{step}
								</span>
							</div>
							{index < steps.length - 1 ? (
								<span className="mx-1 mb-5 h-px flex-1 bg-primary/40" />
							) : null}
						</div>
					))}
				</div>
				<div className="mt-5 flex items-center gap-3 border-border border-t pt-4">
					<IconChip icon={Wrench} />
					<div>
						<p className="font-medium text-sm">Running at peak efficiency</p>
						<p className="text-muted-foreground text-xs">
							Next visit in 6 months
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function ColdStorageVisual() {
	const lines = [
		{ name: "Pharmaceutical", range: "+2 to +8°C" },
		{ name: "Agricultural", range: "0 to +4°C" },
		{ name: "Frozen food", range: "−20°C" },
	];
	return (
		<div className="relative w-72">
			<div className={cn(card, "p-4")}>
				<div className="flex items-center justify-between px-1 pb-3">
					<span className="font-mono text-[11px] text-muted-foreground tracking-wider">
						COLD CHAIN
					</span>
					<ClipboardCheck className="size-4 text-muted-foreground" />
				</div>
				<div className="grid gap-1.5">
					{lines.map((line) => (
						<div
							key={line.name}
							className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-xs"
						>
							<span className="flex items-center gap-2">
								<Thermometer className="size-3.5 text-primary" />
								{line.name}
							</span>
							<span className="text-muted-foreground tabular-nums">
								{line.range}
							</span>
						</div>
					))}
				</div>
			</div>
			<Toast className="-bottom-5 -left-6">Built to your product</Toast>
		</div>
	);
}

const SERVICES: Service[] = [
	{
		label: "Commercial refrigeration",
		tag: "Walk-in & display",
		title: "Cold that holds, shift after shift.",
		description:
			"Design, installation and maintenance for supermarkets and restaurants.",
		points: ["Walk-in coolers and freezer rooms", "Display cases"],
		Visual: RefrigerationVisual,
	},
	{
		label: "HVAC & air conditioning",
		tag: "Whole-building comfort",
		title: "The right climate in every room.",
		description:
			"Complete climate control for commercial buildings, sized floor by floor.",
		points: ["Multi-split ACs and VRF systems", "Central ventilation"],
		Visual: HvacVisual,
	},
	{
		label: "Maintenance support",
		tag: "Scheduled care",
		title: "No surprises. No downtime.",
		description:
			"Scheduled servicing that keeps systems at peak efficiency and removes unexpected downtime.",
		points: ["Filter replacement", "Gas charging"],
		Visual: MaintenanceVisual,
	},
	{
		label: "Industrial cold storage",
		tag: "Cold chain",
		title: "Infrastructure for what can't get warm.",
		description:
			"Custom cold chain infrastructure for facilities across Nepal.",
		points: ["Pharmaceutical and agricultural", "Food processing"],
		Visual: ColdStorageVisual,
	},
];

export function ServicesShowcase() {
	return (
		<section className="border-t py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
						Complete cooling &amp; climate control.
					</h2>
					<p className="mt-3 text-muted-foreground sm:text-lg">
						High-performance solutions backed by certified technicians and
						original spare parts.
					</p>
				</div>

				<div className="mt-16 grid gap-16 lg:mt-20 lg:gap-24">
					{SERVICES.map((service, index) => {
						const flipped = index % 2 === 1;
						return (
							<article
								key={service.label}
								className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
							>
								<ScrollReveal className={cn(flipped && "md:order-2")}>
									<div
										aria-hidden="true"
										className="relative grid aspect-[6/5] place-items-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted via-muted/60 to-background p-8"
									>
										<span className="absolute top-5 left-5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
											<span className="size-1.5 rounded-full bg-primary" />
											{service.tag}
										</span>
										<service.Visual />
									</div>
								</ScrollReveal>

								<ScrollReveal
									delay={0.08}
									className={cn(flipped && "md:order-1")}
								>
									<p className="font-mono text-muted-foreground text-xs">
										0{index + 1} / {service.label}
									</p>
									<h3 className="mt-3 text-balance font-semibold text-2xl tracking-tight">
										{service.title}
									</h3>
									<p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
										{service.description}
									</p>
									<ul className="mt-6 grid gap-2.5">
										{service.points.map((point) => (
											<li
												key={point}
												className="flex items-center gap-2.5 text-sm"
											>
												<Check className="size-4 shrink-0 text-primary" />
												{point}
											</li>
										))}
									</ul>
								</ScrollReveal>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
