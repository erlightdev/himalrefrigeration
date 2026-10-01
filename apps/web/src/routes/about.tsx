import { createFileRoute } from "@tanstack/react-router";
import {
	Award,
	Calculator,
	Check,
	ClipboardCheck,
	Compass,
	MapPin,
	ScanSearch,
	ShieldCheck,
	Target,
	Wrench,
} from "lucide-react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Marquee } from "@/components/motion/marquee";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{ title: "About — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Cooling Nepal since 1998. Nepal's first ISO 9001 refrigeration manufacturer and the sole authorized DAIKIN distributor.",
			},
		],
	}),
});

const FOUNDED = 1998;
const YEARS = new Date().getFullYear() - FOUNDED;

// Leadership quotes are verbatim excerpts from their published messages.
// The footer carries the contact call-to-action, so this page doesn't.
// Each fact appears once on the page: the hero states who we are, the
// numbers state scale, the timeline states how we got here, and the steps
// carry the core strengths.
const STATS: Array<
	{ label: string } & (
		| { value: number; suffix: string; text?: never }
		| { text: string; value?: never; suffix?: never }
	)
> = [
	{ value: 200, suffix: "+", label: "Projects" },
	{ value: 7, suffix: "", label: "Provinces served" },
	// Not a quantity, so it shouldn't count up.
	{ text: "24/7", label: "Support" },
];

const MILESTONES = [
	{
		year: "1998",
		title: "Nepal's first AC manufacturer",
		body: "Launched the Himal brand when air conditioning was almost unknown in Nepal.",
	},
	{
		year: "2004",
		title: "ISO 9001 certified",
		body: "The first refrigeration company in Nepal held to an international quality standard.",
	},
	{
		year: "2008",
		title: "Sole DAIKIN distributor",
		body: "Brought inverter and VRF systems to hotels, hospitals and corporate towers.",
	},
	{
		year: "2014",
		title: "Industrial cold storage",
		body: "Walk-in blast freezers, pharmaceutical cold chains and full MEP contracting.",
	},
	{
		year: "2018",
		title: "Power and cooling together",
		body: "Added FUJIAIRE air conditioning and JAKSON generators for uninterrupted sites.",
	},
	{
		year: "Today",
		title: "A nationwide service network",
		body: "Technicians and genuine spare parts in every province, with maintenance contracts.",
	},
];

// Core strengths, told as the order a project actually runs in.
const STEPS = [
	{
		phase: "Survey",
		title: "Measure before we recommend",
		body: "A site thermal evaluation and load calculation decide the system — not a catalogue.",
		icon: ScanSearch,
		preview: "survey",
	},
	{
		phase: "Install",
		title: "Design it precisely, fit it cleanly",
		body: "Equipment sized to the load, ducting and piping planned, then commissioned and handed over.",
		icon: Wrench,
		preview: "install",
	},
	{
		phase: "Maintain",
		title: "Keep it running for its whole life",
		body: "Genuine OEM spares in stock and 24/7 emergency support under an Annual Maintenance Contract.",
		icon: ShieldCheck,
		preview: "maintain",
	},
] as const;

const VISION = [
	{
		title: "Our objectives",
		body: "Manufacture and install HVAC and cooling systems designed for peak efficiency, with rigorous quality assurance across design, installation, sales and lifetime MEP maintenance.",
		icon: Target,
	},
	{
		title: "Mission & vision",
		body: "Reliable HVAC, MEP and firefighting infrastructure that makes climate control accessible, cost-effective and dependable for every Nepalese business.",
		icon: Compass,
	},
];

const LEADERS = [
	{
		name: "Kamal Chaudhary",
		role: "Managing Director",
		image: "/images/about/kamal.png",
		quote:
			"From initial consultation to thermal inspection and final handover, Himal provides A to Z solutions backed by our dedicated team.",
	},
	{
		name: "Vijay Kr. Chaudhary",
		role: "Executive Director",
		image: "/images/about/bijay.png",
		quote:
			"Today, genuine spare parts availability and rapid after-sales service remain the core strengths of Himal Refrigeration.",
	},
];

const PARTNERS = ["DAIKIN", "FUJIAIRE", "JAKSON", "BITZER", "DANFOSS"];

function SectionHeading({
	eyebrow,
	title,
}: {
	eyebrow: string;
	title: string;
}) {
	return (
		<div className="mb-10 max-w-xl">
			<p className="font-medium text-primary text-sm">{eyebrow}</p>
			<h2 className="mt-2 text-balance font-semibold text-2xl tracking-tight sm:text-3xl">
				{title}
			</h2>
		</div>
	);
}

const PREVIEW_ROW =
	"flex items-center gap-3 rounded-xl border border-border bg-background/80 px-3 py-2.5 text-sm backdrop-blur";

/** Small illustrative UI above each step — decorative, hidden from assistive tech. */
function StepPreview({ kind }: { kind: (typeof STEPS)[number]["preview"] }) {
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

function AboutPage() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<Header />

			<main className="flex-1">
				{/* Who we are */}
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<div className="relative mx-auto max-w-5xl px-5 pt-32 pb-16 text-center sm:px-8 lg:pt-40 lg:pb-24">
						<ScrollReveal>
							<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
								<Award className="size-4 text-primary" aria-hidden="true" />
								Nepal's Pioneer Refrigeration &amp; HVAC Contractor
							</p>
							<h1 className="mx-auto mt-5 max-w-4xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
								Over <span className="text-primary">{YEARS} Years</span> of
								Engineering Excellence &amp; Innovation.
							</h1>
							<p className="mx-auto mt-5 max-w-3xl text-pretty text-base text-muted-foreground leading-relaxed sm:text-lg">
								Founded in {FOUNDED}, Himal Refrigeration pioneered air
								conditioning in Nepal. Today, we are Nepal's sole authorized
								distributor of DAIKIN and the nation's first ISO-certified
								refrigeration manufacturer.
							</p>
						</ScrollReveal>

						<dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border text-left">
							{STATS.map((stat) => (
								<div
									key={stat.label}
									className="flex flex-col-reverse bg-background px-5 py-5"
								>
									<dt className="mt-1 text-muted-foreground text-sm">
										{stat.label}
									</dt>
									<dd className="font-semibold text-2xl tabular-nums tracking-tight sm:text-3xl">
										{stat.text ?? (
											<>
												<AnimatedNumber value={stat.value} />
												{stat.suffix}
											</>
										)}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</section>

				{/* How we got here */}
				<section className="border-border border-t bg-muted/30">
					<div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
						<SectionHeading eyebrow="Our story" title="Milestones" />
						<ol className="relative grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
							{MILESTONES.map((milestone, index) => (
								<li key={milestone.year}>
									<ScrollReveal delay={(index % 3) * 0.06}>
										<p className="font-medium text-primary text-sm tabular-nums">
											{milestone.year}
										</p>
										<div className="mt-3 h-px w-full bg-border" />
										<h3 className="mt-4 font-medium">{milestone.title}</h3>
										<p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
											{milestone.body}
										</p>
									</ScrollReveal>
								</li>
							))}
						</ol>
					</div>
				</section>

				{/* What we aim for */}
				<section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
					<SectionHeading
						eyebrow="Core foundation"
						title="Our vision & capabilities"
					/>
					<div className="grid gap-4 md:grid-cols-2">
						{VISION.map((item, index) => (
							<ScrollReveal
								key={item.title}
								delay={index * 0.06}
								className="rounded-2xl border border-border p-6"
							>
								<span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
									<item.icon className="size-5" aria-hidden="true" />
								</span>
								<h3 className="mt-5 font-medium">{item.title}</h3>
								<p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
									{item.body}
								</p>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* How we work */}
				<section className="border-border border-t">
					<div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
						<div className="mx-auto mb-12 max-w-2xl text-center">
							<span className="inline-flex rounded-full border border-border px-3 py-1 text-muted-foreground text-xs">
								How we work
							</span>
							<h2 className="mt-4 text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
								Three steps. One reliable system.
							</h2>
							<p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
								Every project follows the same path, from the first site visit
								to years of support after handover.
							</p>
						</div>
						<ol className="grid gap-5 md:grid-cols-3">
							{STEPS.map((step, index) => (
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
				</section>

				{/* Who leads */}
				<section className="border-border border-t bg-muted/30">
					<div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
						<SectionHeading
							eyebrow="Leadership"
							title="The people behind Himal"
						/>
						<div className="grid gap-6 md:grid-cols-2">
							{LEADERS.map((leader, index) => (
								<ScrollReveal key={leader.name} delay={index * 0.08}>
									<figure className="flex h-full flex-col rounded-2xl border border-border bg-background p-6">
										<blockquote className="flex-1 text-pretty text-base leading-relaxed">
											“{leader.quote}”
										</blockquote>
										<figcaption className="mt-6 flex items-center gap-3">
											<img
												src={leader.image}
												alt=""
												loading="lazy"
												className="size-11 rounded-full bg-muted object-cover object-top"
											/>
											<div>
												<p className="font-medium text-sm">{leader.name}</p>
												<p className="text-muted-foreground text-sm">
													{leader.role}
												</p>
											</div>
										</figcaption>
									</figure>
								</ScrollReveal>
							))}
						</div>
					</div>
				</section>

				{/* Partners */}
				<section
					aria-label="Brand partners"
					className="border-border border-y py-10"
				>
					<p className="mb-6 text-center text-muted-foreground text-sm">
						Authorized partner for
					</p>
					<Marquee speed={30} gap="4rem" pauseOnHover fade>
						{PARTNERS.map((partner) => (
							<span
								key={partner}
								className="font-semibold text-foreground/70 text-lg tracking-[0.2em]"
							>
								{partner}
							</span>
						))}
					</Marquee>
				</section>
			</main>

			<Footer />
		</div>
	);
}
