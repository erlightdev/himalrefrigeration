import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
	ArrowRight,
	PhoneCall,
	Search,
	ShieldCheck,
	Wrench,
} from "lucide-react";

import { HowWeWork, type HowWeWorkStep } from "@/components/how-we-work";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/motion/breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ServiceCard } from "@/components/service-card";
import { ServiceTabs } from "@/components/service-tabs";
import { getService, SERVICES } from "@/data/services";

// Same three-phase shape for every service — the work differs, the
// rhythm (survey, fit, support) doesn't.
const PROCESS_ICONS = [Search, Wrench, ShieldCheck] as const;
const PREVIEW_KINDS = ["survey", "install", "maintain"] as const;

export const Route = createFileRoute("/services/$slug")({
	// Icon is a component reference and can't cross the loader's
	// server→client serialization boundary, so the loader only confirms the
	// slug exists (and 404s otherwise); the component re-reads the full
	// record straight from the static SERVICES array.
	loader: ({ params }) => {
		const service = getService(params.slug);
		if (!service) throw notFound();
		return {
			slug: service.slug,
			label: service.label,
			summary: service.summary,
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [] };
		return {
			meta: [
				{ title: `${loaderData.label} — Himal Refrigeration` },
				{ name: "description", content: loaderData.summary },
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Service",
						name: loaderData.label,
						description: loaderData.summary,
						areaServed: "Nepal",
						provider: {
							"@type": "Organization",
							name: "Himal Refrigeration & Electrical Industries",
						},
					}),
				},
			],
		};
	},
	component: ServicePage,
});

function ServicePage() {
	const { slug } = Route.useLoaderData();
	const service = getService(slug);
	if (!service) return null;
	const related = SERVICES.filter((item) => item.slug !== service.slug).slice(
		0,
		3,
	);

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
					<div className="relative mx-auto max-w-4xl px-5 pt-32 pb-14 sm:px-8 lg:pt-40 lg:pb-20">
						<Breadcrumb>
							<BreadcrumbList maxItems={Number.POSITIVE_INFINITY}>
								<BreadcrumbItem>
									<BreadcrumbLink href="/">Home</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href="/services">Services</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{service.label}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>

						<ScrollReveal className="mt-10">
							<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
								<service.icon
									className="size-4 text-primary"
									aria-hidden="true"
								/>
								{service.category}
							</p>
							<h1 className="mt-5 text-balance font-extrabold text-3xl leading-[1.1] tracking-tight sm:text-5xl">
								{service.tagline}
							</h1>
							<p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
								{service.summary}
							</p>
						</ScrollReveal>

						<ScrollReveal delay={0.1}>
							<div className="mt-8 flex flex-wrap items-center gap-3">
								<Link
									to="/contact"
									className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition hover:bg-primary/90 active:translate-y-px"
								>
									Request this service
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

				{/* Image + stats */}
				<section className="mx-auto max-w-4xl px-5 pt-12 sm:px-8">
					<ScrollReveal className="relative overflow-hidden rounded-3xl bg-muted">
						<img
							src={service.image}
							alt=""
							className="aspect-[16/8] size-full object-cover"
						/>
					</ScrollReveal>
					<div className="mt-8 grid grid-cols-3 gap-4">
						{service.stats.map((stat, index) => (
							<ScrollReveal
								key={stat.label}
								delay={index * 0.06}
								className="rounded-2xl border border-border bg-card p-4 text-center sm:p-6"
							>
								<p className="font-extrabold text-2xl tracking-tight sm:text-4xl">
									<AnimatedNumber value={stat.value} />
									<span className="text-primary">{stat.suffix}</span>
								</p>
								<p className="mt-1.5 font-medium text-muted-foreground text-xs sm:text-sm">
									{stat.label}
								</p>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* What's included */}
				<section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
					<ScrollReveal>
						<h2 className="font-semibold text-xl tracking-tight sm:text-2xl">
							What's included
						</h2>
					</ScrollReveal>
					<ScrollReveal delay={0.06} className="mt-6">
						<ServiceTabs
							items={service.features}
							image={service.image}
							label={service.label}
						/>
					</ScrollReveal>

					<ScrollReveal delay={0.1} className="mt-8">
						<div className="flex flex-wrap gap-2">
							{service.equipment.map((item) => (
								<span
									key={item}
									className="rounded-full border border-border px-3 py-1.5 text-sm"
								>
									{item}
								</span>
							))}
						</div>
					</ScrollReveal>
				</section>

				{/* Process */}
				<section className="border-border border-t bg-muted/30">
					<HowWeWork
						steps={
							service.process.map((step, index) => ({
								phase: step.phase,
								title: step.title,
								body: step.description,
								icon: PROCESS_ICONS[index],
								preview: PREVIEW_KINDS[index],
							})) satisfies readonly HowWeWorkStep[]
						}
						title="Three steps, no guesswork."
						description="This is how the service runs, from the first call to ongoing support."
					/>
				</section>

				{/* FAQ */}
				<section className="border-border border-t">
					<div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
						<ScrollReveal>
							<h2 className="font-semibold text-xl tracking-tight">
								Frequently asked
							</h2>
							<BouncyAccordion
								className="mt-6"
								items={service.faqs.map((faq, index) => ({
									id: `${service.slug}-faq-${index}`,
									title: faq.question,
									description: faq.answer,
								}))}
							/>
						</ScrollReveal>
					</div>
				</section>

				{/* Related services */}
				<section className="border-border border-t">
					<div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
						<div className="flex items-center justify-between">
							<h2 className="font-semibold text-xl tracking-tight">
								Other services
							</h2>
							<Link
								to="/services"
								className="text-muted-foreground text-sm transition-colors hover:text-foreground"
							>
								View all
							</Link>
						</div>
						<div className="mt-6 grid gap-5 sm:grid-cols-3">
							{related.map((item) => (
								<ServiceCard
									key={item.slug}
									to="/services/$slug"
									params={{ slug: item.slug }}
									label={item.label}
									tagline={item.category}
									image={item.image}
									icon={item.icon}
									aspect="aspect-[4/3]"
								/>
							))}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
