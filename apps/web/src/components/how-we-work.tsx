import { cn } from "@himalref/ui/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
	Calculator,
	Check,
	ClipboardCheck,
	MapPin,
	Wrench,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export type HowWeWorkStep = {
	/** Short label shown in small caps, e.g. "Survey". */
	phase: string;
	title: string;
	body: string;
	icon: LucideIcon;
	/** Which decorative mini-UI sits above the card. */
	preview: "survey" | "install" | "maintain";
};

const PREVIEW_ROW =
	"flex items-center gap-3 rounded-xl border border-border bg-background/80 px-3 py-2.5 text-sm backdrop-blur";

/** Small illustrative UI above each step — decorative, hidden from assistive tech. */
function StepPreview({ kind }: { kind: HowWeWorkStep["preview"] }) {
	return (
		<div
			aria-hidden="true"
			className="relative grid h-48 place-items-center overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent)] px-8"
		>
			{kind === "survey" ? (
				<div className="grid w-full max-w-60 gap-2">
					<div className={PREVIEW_ROW}>
						<span className="grid size-7 place-items-center rounded-lg bg-muted">
							<MapPin className="size-3.5 text-muted-foreground" />
						</span>
						Site visit
					</div>
					<div className={PREVIEW_ROW}>
						<span className="grid size-7 place-items-center rounded-lg bg-muted">
							<Calculator className="size-3.5 text-muted-foreground" />
						</span>
						Load calculation
					</div>
				</div>
			) : null}
			{kind === "install" ? (
				<div className="w-full max-w-60 rounded-2xl border border-border bg-background/80 p-3 backdrop-blur">
					<div className="flex items-center justify-between px-1 pb-2">
						<span className="font-medium text-[10px] text-muted-foreground tracking-[0.18em]">
							SYSTEM PLAN
						</span>
						<ClipboardCheck className="size-3.5 text-muted-foreground" />
					</div>
					<div className="grid gap-1.5">
						{["Equipment sized", "Ducting & piping", "Commissioned"].map(
							(item) => (
								<div
									key={item}
									className="flex items-center gap-2 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs"
								>
									<Check className="size-3 text-primary" />
									{item}
								</div>
							),
						)}
					</div>
				</div>
			) : null}
			{kind === "maintain" ? (
				<div className="relative grid size-24 place-items-center rounded-3xl border border-border bg-background/80 backdrop-blur">
					<span className="grid size-11 place-items-center rounded-full bg-muted">
						<Wrench className="size-5 text-foreground" />
					</span>
					<span className="absolute -right-2.5 -bottom-2.5 grid size-8 place-items-center rounded-full border border-border bg-background">
						<Check className="size-3.5 text-primary" />
					</span>
					<span className="absolute -top-2.5 -left-3 rounded-full bg-primary px-2 py-0.5 font-semibold text-[10px] text-primary-foreground">
						24/7
					</span>
				</div>
			) : null}
		</div>
	);
}

export function HowWeWork({
	steps,
	title = "Three steps. One reliable system.",
	description = "Every project follows the same path, from the first site visit to years of support after handover.",
	className,
}: {
	steps: readonly HowWeWorkStep[];
	title?: string;
	description?: string;
	className?: string;
}) {
	return (
		<div
			className={cn("mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24", className)}
		>
			<div className="mx-auto mb-12 max-w-2xl text-center">
				<span className="inline-flex rounded-full border border-border px-3 py-1 text-muted-foreground text-xs">
					How we work
				</span>
				<h2 className="mt-4 text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
					{title}
				</h2>
				<p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
					{description}
				</p>
			</div>
			<ol className="grid gap-5 md:grid-cols-3">
				{steps.map((step, index) => (
					<li key={step.phase}>
						<ScrollReveal
							delay={index * 0.08}
							className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card"
						>
							<StepPreview kind={step.preview} />
							<div className="flex flex-1 flex-col p-6 pt-5">
								<div className="flex items-center justify-between">
									<span className="font-medium text-muted-foreground text-xs tabular-nums tracking-[0.2em]">
										STEP 0{index + 1}
									</span>
									<span className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
										<step.icon className="size-4" aria-hidden="true" />
									</span>
								</div>
								<p className="mt-6 font-medium text-primary text-xs uppercase tracking-[0.18em]">
									{step.phase}
								</p>
								<h3 className="mt-2 font-medium text-lg tracking-tight">
									{step.title}
								</h3>
								<p className="mt-2 text-muted-foreground text-sm leading-relaxed">
									{step.body}
								</p>
							</div>
						</ScrollReveal>
					</li>
				))}
			</ol>
		</div>
	);
}
