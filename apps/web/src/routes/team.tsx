import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Briefcase,
	HardHat,
	PhoneCall,
	Snowflake,
	Users,
	Wind,
	Wrench,
} from "lucide-react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ButtonLink } from "@/components/motion/button/base";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const Route = createFileRoute("/team")({
	component: TeamPage,
	head: () => ({
		meta: [
			{ title: "Our Team — Himal Refrigeration" },
			{
				name: "description",
				content:
					"The people behind Himal Refrigeration's HVAC, cold storage and electrical engineering work across Nepal.",
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Organization",
					name: "Himal Refrigeration & Electrical Industries",
					employee: LEADERSHIP.map((person) => ({
						"@type": "Person",
						name: person.name,
						jobTitle: person.title,
					})),
				}),
			},
		],
	}),
});

const FOUNDED = 1998;

type Person = { name: string; title: string; image: string };

const LEADERSHIP: Person[] = [
	{
		name: "Kamal Chaudhary",
		title: "Managing Director",
		image: "/images/about/kamal.png",
	},
	{
		name: "Vijay Kr. Chaudhary",
		title: "Executive Director",
		image: "/images/about/bijay.png",
	},
];

const CAPABILITIES = [
	{
		label: "HVAC Engineering",
		description:
			"VRF, VRV and central plant design for homes and large buildings.",
		icon: Wind,
	},
	{
		label: "Cold Storage",
		description: "PUF-panel cold rooms, blast freezers and multi-zone storage.",
		icon: Snowflake,
	},
	{
		label: "Service & AMC",
		description: "Scheduled maintenance and 24/7 emergency breakdown response.",
		icon: Wrench,
	},
	{
		label: "MEP & Projects",
		description:
			"Mechanical, electrical, plumbing and firefighting contracting.",
		icon: HardHat,
	},
];

const PARTNERS = [
	{ name: "DAIKIN", detail: "Japan — sole distributor" },
	{ name: "FUJIAIRE", detail: "Malaysia" },
	{ name: "JAKSON", detail: "India — generators" },
	{ name: "BITZER", detail: "Germany — compressors" },
	{ name: "DANFOSS", detail: "Denmark — controls" },
	{ name: "COPELAND", detail: "USA — scroll compressors" },
];

function TeamPage() {
	const years = new Date().getFullYear() - FOUNDED;

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<Header />

			<main className="flex-1">
				{/* Hero */}
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<Users className="size-4 text-primary" aria-hidden="true" />
							Team
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							The people behind the <span className="text-primary">work</span>.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							Engineers and technicians across HVAC, cold storage and electrical
							work, led by the same two people who started Himal in
							{` ${FOUNDED}`}.
						</p>

						<dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
							<div className="flex flex-col-reverse bg-background px-5 py-5">
								<dt className="mt-1 text-muted-foreground text-sm">
									Years in HVAC
								</dt>
								<dd className="font-semibold text-2xl tabular-nums tracking-tight sm:text-3xl">
									{years}+
								</dd>
							</div>
							<div className="flex flex-col-reverse bg-background px-5 py-5">
								<dt className="mt-1 text-muted-foreground text-sm">
									Disciplines
								</dt>
								<dd className="font-semibold text-2xl tabular-nums tracking-tight sm:text-3xl">
									{CAPABILITIES.length}
								</dd>
							</div>
							<div className="flex flex-col-reverse bg-background px-5 py-5">
								<dt className="mt-1 text-muted-foreground text-sm">Support</dt>
								<dd className="font-semibold text-2xl tracking-tight sm:text-3xl">
									24/7
								</dd>
							</div>
						</dl>
					</ScrollReveal>
				</section>

				{/* Group photo */}
				<section className="border-border/60 border-b">
					<ScrollReveal className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
						<div className="relative overflow-hidden rounded-3xl border border-border">
							<img
								src="/images/team/group-photo.webp"
								alt="The Himal Refrigeration team at a Daikin VRV X product launch"
								loading="eager"
								fetchPriority="high"
								width={1600}
								height={1067}
								className="h-80 w-full object-cover object-top sm:h-[28rem] lg:h-[32rem]"
							/>
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 sm:p-8">
								<p className="font-semibold text-sm text-white sm:text-base">
									The whole team, together
								</p>
								<p className="mt-1 text-white/80 text-xs sm:text-sm">
									At the Daikin VRV X product launch
								</p>
							</div>
						</div>
					</ScrollReveal>
				</section>

				{/* Leadership */}
				<section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
					<ScrollReveal className="max-w-xl">
						<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
							Leadership
						</p>
						<h2 className="mt-2 text-balance font-semibold text-2xl tracking-tight sm:text-3xl">
							Running the company since {FOUNDED}
						</h2>
					</ScrollReveal>
					<div className="mt-8 grid gap-5 sm:grid-cols-2">
						{LEADERSHIP.map((person, index) => (
							<ScrollReveal
								key={person.name}
								delay={index * 0.08}
								className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
							>
								<img
									src={person.image}
									alt=""
									loading="lazy"
									width={64}
									height={64}
									className="size-16 shrink-0 rounded-full bg-muted object-cover object-top"
								/>
								<div>
									<p className="font-medium">{person.name}</p>
									<p className="text-muted-foreground text-sm">
										{person.title}
									</p>
								</div>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* Capabilities */}
				<section className="border-border border-t bg-muted/30">
					<div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
						<ScrollReveal className="max-w-xl">
							<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
								What the team covers
							</p>
							<h2 className="mt-2 text-balance font-semibold text-2xl tracking-tight sm:text-3xl">
								Four disciplines, one team
							</h2>
						</ScrollReveal>
						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							{CAPABILITIES.map((item, index) => (
								<ScrollReveal
									key={item.label}
									delay={index * 0.06}
									className="rounded-2xl border border-border bg-card p-6"
								>
									<span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
										<item.icon className="size-5" aria-hidden="true" />
									</span>
									<h3 className="mt-4 font-medium">{item.label}</h3>
									<p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
										{item.description}
									</p>
								</ScrollReveal>
							))}
						</div>
					</div>
				</section>

				{/* Partners */}
				<section className="border-border border-t">
					<div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8">
						<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
							Authorized OEM partners
						</p>
						<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
							{PARTNERS.map((partner) => (
								<div
									key={partner.name}
									className="rounded-xl border border-border p-4"
								>
									<p className="font-semibold tracking-wide">{partner.name}</p>
									<p className="mt-0.5 text-muted-foreground text-xs">
										{partner.detail}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Careers CTA */}
				<section className="border-border border-t bg-primary text-primary-foreground">
					<div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 lg:py-16">
						<span className="inline-grid size-12 place-items-center rounded-2xl bg-white/10">
							<Briefcase className="size-6" aria-hidden="true" />
						</span>
						<h2 className="mt-5 text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
							Want to join the team?
						</h2>
						<p className="mx-auto mt-3 max-w-xl text-pretty text-primary-foreground/85">
							We're always looking for HVAC engineers, cold storage specialists
							and certified technicians across Nepal.
						</p>
						<div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<ButtonLink
								href="/contact"
								className="bg-white text-primary hover:bg-white/90"
							>
								Submit an inquiry
								<ArrowRight className="size-4" />
							</ButtonLink>
							<ButtonLink
								href="tel:+9779800000000"
								variant="ghost"
								className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
							>
								<PhoneCall className="size-4" />
								+977 980-0000000
							</ButtonLink>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
