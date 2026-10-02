import { createFileRoute } from "@tanstack/react-router";
import {
	Briefcase,
	HardHat,
	Mail,
	Snowflake,
	Wind,
	Wrench,
} from "lucide-react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ButtonLink } from "@/components/motion/button/base";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const Route = createFileRoute("/careers")({
	component: CareersPage,
	head: () => ({
		meta: [
			{ title: "Careers — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Join Himal Refrigeration's HVAC, cold storage and electrical engineering team in Nepal. See the roles we hire for and how to apply.",
			},
		],
	}),
});

const ROLES = [
	{
		icon: Wind,
		label: "HVAC Engineering",
		description:
			"Design, sizing and commissioning of air conditioning and ventilation systems.",
	},
	{
		icon: Snowflake,
		label: "Cold Storage",
		description:
			"Walk-in freezer, chiller and refrigeration installs for food, pharma and retail.",
	},
	{
		icon: Wrench,
		label: "Service & AMC",
		description:
			"Scheduled maintenance, breakdown response and annual maintenance contracts.",
	},
	{
		icon: HardHat,
		label: "MEP & Projects",
		description: "Electrical and mechanical works on new-build project sites.",
	},
];

const STEPS = [
	{
		step: "01",
		title: "Send your CV",
		description:
			"Email your CV and a short note on what you'd like to work on to the address below.",
	},
	{
		step: "02",
		title: "We review it",
		description:
			"Our team looks over every application against current and upcoming site needs.",
	},
	{
		step: "03",
		title: "We get in touch",
		description:
			"If there's a fit, we'll call or email you to talk through the role and next steps.",
	},
];

function CareersPage() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<Header />

			<main className="flex-1">
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<Briefcase className="size-4 text-primary" aria-hidden="true" />
							Careers
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Build cooling systems that{" "}
							<span className="text-primary">last</span>.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							We're always open to hearing from HVAC engineers, cold storage
							specialists and certified technicians across Nepal.
						</p>
					</ScrollReveal>
				</section>

				<div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-16">
					<ScrollReveal className="mx-auto max-w-2xl text-center">
						<h2 className="font-semibold text-2xl tracking-tight sm:text-3xl">
							Roles we hire for
						</h2>
						<p className="mt-3 text-muted-foreground">
							No open positions are listed right now — reach out anyway if your
							background fits one of these areas.
						</p>
					</ScrollReveal>

					<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{ROLES.map((role, index) => (
							<ScrollReveal
								key={role.label}
								delay={index * 0.06}
								className="rounded-2xl border border-border bg-card p-6"
							>
								<span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
									<role.icon className="size-5" aria-hidden="true" />
								</span>
								<h3 className="mt-4 font-medium">{role.label}</h3>
								<p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
									{role.description}
								</p>
							</ScrollReveal>
						))}
					</div>
				</div>

				<section className="border-border border-t bg-muted/30">
					<div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-16">
						<ScrollReveal className="mx-auto max-w-2xl text-center">
							<h2 className="font-semibold text-2xl tracking-tight sm:text-3xl">
								How to apply
							</h2>
						</ScrollReveal>

						<div className="mt-10 grid gap-5 sm:grid-cols-3">
							{STEPS.map((item, index) => (
								<ScrollReveal
									key={item.step}
									delay={index * 0.06}
									className="rounded-2xl border border-border bg-card p-6"
								>
									<span className="font-mono text-primary text-sm">
										{item.step}
									</span>
									<h3 className="mt-3 font-medium">{item.title}</h3>
									<p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
										{item.description}
									</p>
								</ScrollReveal>
							))}
						</div>
					</div>
				</section>

				<section className="border-border border-t bg-primary text-primary-foreground">
					<div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 lg:py-16">
						<span className="inline-grid size-12 place-items-center rounded-2xl bg-white/10">
							<Mail className="size-6" aria-hidden="true" />
						</span>
						<h2 className="mt-5 text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
							Send us your CV
						</h2>
						<p className="mx-auto mt-3 max-w-xl text-pretty text-primary-foreground/85">
							Email your CV and a short note on the kind of work you're looking
							for — we'll get back to you if there's a fit.
						</p>
						<div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<ButtonLink
								href="mailto:info@himalref.com.np"
								className="bg-white text-primary hover:bg-white/90"
							>
								<Mail className="size-4" />
								info@himalref.com.np
							</ButtonLink>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
