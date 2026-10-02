import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Factory } from "lucide-react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { INDUSTRIES } from "@/data/industries";

export const Route = createFileRoute("/industries/")({
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
								<Link
									to="/industries/$slug"
									params={{ slug: industry.slug }}
									className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
								>
									<div className="relative aspect-[16/10] overflow-hidden bg-muted">
										<img
											src={industry.image}
											alt=""
											loading="lazy"
											className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-medium text-[11px] text-white backdrop-blur-sm">
											<industry.icon className="size-3.5" aria-hidden="true" />
											{industry.category}
										</span>
									</div>
									<div className="flex flex-1 flex-col p-5">
										<p className="font-medium transition-colors group-hover:text-primary">
											{industry.label}
										</p>
										<p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
											{industry.tagline}
										</p>
										<span className="mt-auto flex items-center gap-1 pt-4 text-primary text-sm">
											See how
											<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
										</span>
									</div>
								</Link>
							</ScrollReveal>
						))}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
