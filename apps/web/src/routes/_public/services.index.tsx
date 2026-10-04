import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CalendarDays,
	PhoneCall,
	ScanSearch,
	ShieldCheck,
	Wrench,
} from "lucide-react";

import { HowWeWork } from "@/features/marketing/components/how-we-work";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ServiceCard } from "@/features/marketing/components/service-card";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/_public/services/")({
	component: ServicesPage,
	head: () => ({
		meta: [
			{ title: "Services — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Design & install, cold storage, HVAC, maintenance, transport refrigeration and 24/7 emergency repair across Nepal.",
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "ItemList",
					itemListElement: SERVICES.map((service, index) => ({
						"@type": "ListItem",
						position: index + 1,
						item: {
							"@type": "Service",
							name: service.label,
							description: service.summary,
							areaServed: "Nepal",
							provider: {
								"@type": "Organization",
								name: "Himal Refrigeration & Electrical Industries",
							},
						},
					})),
				}),
			},
		],
	}),
});

const BAND_STATS = [
	{ value: 200, suffix: "+", label: "Units installed" },
	{ value: 25, suffix: "yr", label: "In operation" },
	{ value: 92, suffix: "%", label: "First-visit fixes" },
	{ value: 24, suffix: "/7", label: "Emergency line" },
];

const PROCESS = [
	{
		phase: "Survey",
		title: "Measure before we recommend",
		body: "Load, layout and duty cycle measured before anything is specified.",
		icon: ScanSearch,
		preview: "survey",
	},
	{
		phase: "Engineer",
		title: "Build it once, build it right",
		body: "Sized, built and commissioned by one accountable team.",
		icon: Wrench,
		preview: "install",
	},
	{
		phase: "Maintain",
		title: "Keep it running for its whole life",
		body: "Serviced on a calendar, with 24/7 backup when it matters.",
		icon: ShieldCheck,
		preview: "maintain",
	},
] as const;

function ServicesPage() {
	return (
		<>
				{/* Hero */}
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<div className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<ScrollReveal>
							<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
								<CalendarDays
									className="size-4 text-primary"
									aria-hidden="true"
								/>
								Services
							</p>
						</ScrollReveal>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							<TextReveal text="Every degree, covered." stagger={0.12} />
						</h1>
						<ScrollReveal delay={0.35}>
							<p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground sm:text-lg">
								Eight specialist teams, one cold chain — from design and install
								to 24/7 emergency repair across Nepal.
							</p>
						</ScrollReveal>
						<ScrollReveal delay={0.45}>
							<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
								<Link
									to="/contact"
									className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition hover:bg-primary/90 active:translate-y-px"
								>
									Get a quote
									<ArrowRight className="size-4" aria-hidden="true" />
								</Link>
								<a
									href="tel:+9779800000000"
									className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-sm transition hover:border-primary/40 hover:text-primary"
								>
									<PhoneCall className="size-4" aria-hidden="true" />
									24/7 hotline
								</a>
							</div>
						</ScrollReveal>
					</div>
				</section>

				{/* Service grid */}
				<section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
					<ScrollReveal className="mb-10 flex items-end justify-between gap-6">
						<h2 className="text-balance font-semibold text-2xl tracking-tight sm:text-3xl">
							What we do
						</h2>
						<p className="hidden max-w-xs text-right text-muted-foreground text-sm sm:block">
							Pick a service — each page covers scope, process and pricing
							questions.
						</p>
					</ScrollReveal>

					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{SERVICES.map((service, index) => (
							<ScrollReveal key={service.slug} delay={(index % 4) * 0.06}>
								<ServiceCard
									to="/services/$slug"
									params={{ slug: service.slug }}
									label={service.label}
									tagline={service.tagline}
									image={service.image}
									icon={service.icon}
									loading={index < 4 ? "eager" : "lazy"}
								/>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* Stats band */}
				<section className="border-border border-y bg-muted/30">
					<div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-4">
						{BAND_STATS.map((stat, index) => (
							<ScrollReveal
								key={stat.label}
								delay={index * 0.06}
								className="text-center"
							>
								<p className="font-extrabold text-4xl tracking-tight sm:text-5xl">
									<AnimatedNumber value={stat.value} />
									<span className="text-primary">{stat.suffix}</span>
								</p>
								<p className="mt-2 font-medium text-muted-foreground text-sm">
									{stat.label}
								</p>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* Process */}
				<HowWeWork
					steps={PROCESS}
					title="Same rhythm, every service."
					description="Every service runs on the same path — measured first, engineered second, supported for life."
				/>

				{/* CTA */}
				<section className="border-border border-t">
					<div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
						<ScrollReveal className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-14 text-center text-white sm:px-12">
							<div
								aria-hidden="true"
								className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(226,10,23,0.35),transparent_60%)]"
							/>
							<h2 className="relative text-balance font-semibold text-2xl tracking-tight sm:text-3xl">
								Not sure which service fits?
							</h2>
							<p className="relative mx-auto mt-3 max-w-md text-pretty text-white/70">
								One call with our engineering team and we'll point you the right
								way — no obligation.
							</p>
							<Link
								to="/contact"
								className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-sm text-zinc-950 transition hover:bg-white/90 active:translate-y-px"
							>
								Book a call
								<ArrowRight className="size-4" aria-hidden="true" />
							</Link>
						</ScrollReveal>
					</div>
				</section>
			</>
	);
}
