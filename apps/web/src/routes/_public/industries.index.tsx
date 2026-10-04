import { createFileRoute } from "@tanstack/react-router";
import { Factory } from "lucide-react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ServiceCard } from "@/features/marketing/components/service-card";
import { INDUSTRIES } from "@/data/industries";

export const Route = createFileRoute("/_public/industries/")({
	component: IndustriesPage,
	head: () => ({
		meta: [
			{ title: "Industries — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Cooling and refrigeration engineered for hospitality, retail, healthcare, logistics and industrial facilities across Nepal.",
			},
		],
	}),
});

function IndustriesPage() {
	return (
		<>
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<Factory className="size-4 text-primary" aria-hidden="true" />
							Industries
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Built around <span className="text-primary">what you store</span>.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							Every sector cools differently. Here's how we engineer for each
							one.
						</p>
					</ScrollReveal>
				</section>

				<div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{INDUSTRIES.map((industry, index) => (
							<ScrollReveal key={industry.slug} delay={(index % 3) * 0.06}>
								<ServiceCard
									to="/industries/$slug"
									params={{ slug: industry.slug }}
									label={industry.label}
									tagline={industry.tagline}
									image={industry.image}
									icon={industry.icon}
									aspect="aspect-[4/3]"
									loading={index < 3 ? "eager" : "lazy"}
								/>
							</ScrollReveal>
						))}
					</div>
				</div>
			</>
	);
}
