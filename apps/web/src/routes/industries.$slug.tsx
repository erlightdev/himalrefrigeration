import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Search, ShieldCheck, Wrench, X } from "lucide-react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
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
import { getIndustry, INDUSTRIES } from "@/data/industries";

// Same three-phase shape for every industry — the work differs, the
// rhythm (assess, fit, maintain) doesn't.
const PROCESS_ICONS = [Search, Wrench, ShieldCheck] as const;

export const Route = createFileRoute("/industries/$slug")({
	// Icon is a component reference and can't cross the loader's
	// server→client serialization boundary, so the loader only confirms the
	// slug exists (and 404s otherwise); the component re-reads the full
	// record straight from the static INDUSTRIES array.
	loader: ({ params }) => {
		const industry = getIndustry(params.slug);
		if (!industry) throw notFound();
		return {
			slug: industry.slug,
			label: industry.label,
			summary: industry.summary,
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [] };
		return {
			meta: [
				{ title: `${loaderData.label} Cooling — Himal Refrigeration` },
				{ name: "description", content: loaderData.summary },
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Service",
						name: `${loaderData.label} refrigeration & HVAC`,
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
	component: IndustryPage,
});

function IndustryPage() {
	const { slug } = Route.useLoaderData();
	const industry = getIndustry(slug);
	if (!industry) return null;
	const related = INDUSTRIES.filter((item) => item.slug !== industry.slug)
		.filter((item) => item.category === industry.category)
		.concat(INDUSTRIES.filter((item) => item.slug !== industry.slug))
		.filter(
			(item, index, list) =>
				list.findIndex((i) => i.slug === item.slug) === index,
		)
		.slice(0, 3);

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<Header />

			<main className="flex-1">
				<article className="mx-auto max-w-4xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
					<Breadcrumb>
						<BreadcrumbList maxItems={Number.POSITIVE_INFINITY}>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/industries">Industries</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{industry.label}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<ScrollReveal className="mt-8">
						<p className="flex items-center gap-2 font-medium text-primary text-sm">
							<industry.icon className="size-4" aria-hidden="true" />
							{industry.category}
						</p>
						<h1 className="mt-3 text-balance font-extrabold text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
							{industry.label}
						</h1>
						<p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
							{industry.summary}
						</p>
					</ScrollReveal>

					<div className="mt-8 aspect-[16/8] overflow-hidden rounded-3xl bg-muted">
						<img
							src={industry.image}
							alt=""
							className="size-full object-cover"
						/>
					</div>

					<div className="mt-12 grid gap-10 lg:grid-cols-2">
						<ScrollReveal>
							<h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
								Where it goes wrong
							</h2>
							<ul className="mt-4 space-y-3">
								{industry.challenges.map((challenge) => (
									<li
										key={challenge}
										className="flex items-start gap-2.5 text-sm"
									>
										<X
											className="mt-0.5 size-4 shrink-0 text-muted-foreground"
											aria-hidden="true"
										/>
										<span className="text-muted-foreground">{challenge}</span>
									</li>
								))}
							</ul>
						</ScrollReveal>

						<ScrollReveal delay={0.06}>
							<h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
								What we do
							</h2>
							<ul className="mt-4 space-y-3">
								{industry.solutions.map((solution) => (
									<li
										key={solution.title}
										className="flex items-start gap-2.5 text-sm"
									>
										<Check
											className="mt-0.5 size-4 shrink-0 text-primary"
											aria-hidden="true"
										/>
										<span>
											<span className="font-medium">{solution.title}.</span>{" "}
											<span className="text-muted-foreground">
												{solution.description}
											</span>
										</span>
									</li>
								))}
							</ul>
						</ScrollReveal>
					</div>

					<ScrollReveal
						delay={0.1}
						className="mt-12 rounded-2xl border border-border p-6"
					>
						<h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
							Equipment &amp; systems
						</h2>
						<div className="mt-4 flex flex-wrap gap-2">
							{industry.equipment.map((item) => (
								<span
									key={item}
									className="rounded-full border border-border px-3 py-1.5 text-sm"
								>
									{item}
								</span>
							))}
						</div>
					</ScrollReveal>
				</article>

				<section className="border-border border-t bg-muted/30">
					<div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
						<ScrollReveal className="mx-auto max-w-2xl text-center">
							<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
								How we work
							</p>
							<h2 className="mt-2 text-balance font-semibold text-2xl tracking-tight sm:text-3xl">
								Our process
							</h2>
						</ScrollReveal>
						<ol className="mt-10 grid gap-5 md:grid-cols-3">
							{industry.process.map((step, index) => {
								const StepIcon = PROCESS_ICONS[index];
								return (
									<li key={step.title}>
										<ScrollReveal
											delay={index * 0.08}
											className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
										>
											<div className="flex items-center justify-between">
												<span className="font-medium text-muted-foreground text-xs tabular-nums tracking-[0.2em]">
													STEP 0{index + 1}
												</span>
												<span className="grid size-9 place-items-center rounded-full bg-accent text-primary">
													<StepIcon className="size-4" aria-hidden="true" />
												</span>
											</div>
											<h3 className="mt-5 font-medium tracking-tight">
												{step.title}
											</h3>
											<p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
												{step.description}
											</p>
										</ScrollReveal>
									</li>
								);
							})}
						</ol>
					</div>
				</section>

				<section className="border-border border-t">
					<div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
						<ScrollReveal>
							<h2 className="font-semibold text-xl tracking-tight">
								Frequently asked
							</h2>
							<BouncyAccordion
								className="mt-6"
								items={industry.faqs.map((faq, index) => ({
									id: `${industry.slug}-faq-${index}`,
									title: faq.question,
									description: faq.answer,
								}))}
							/>
						</ScrollReveal>
					</div>
				</section>

				{related.length > 0 ? (
					<section className="border-border border-t">
						<div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
							<div className="flex items-center justify-between">
								<h2 className="font-semibold text-xl tracking-tight">
									Other industries
								</h2>
								<Link
									to="/industries"
									className="text-muted-foreground text-sm transition-colors hover:text-foreground"
								>
									View all
								</Link>
							</div>
							<div className="mt-6 grid gap-5 sm:grid-cols-3">
								{related.map((item) => (
									<ServiceCard
										key={item.slug}
										to="/industries/$slug"
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
				) : null}
			</main>

			<Footer />
		</div>
	);
}
