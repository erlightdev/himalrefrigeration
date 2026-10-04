import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Gift } from "lucide-react";

import { ButtonLink } from "@/components/motion/button/base";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { formatOfferWindow, OFFERS, offerStatus } from "@/data/offers";

export const Route = createFileRoute("/_public/offers")({
	component: OffersPage,
	head: () => ({
		meta: [
			{ title: "Seasonal Offers — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Free inspections and priority booking timed around Dashain, Tihar and the pre-monsoon season.",
			},
		],
	}),
});

const STATUS_LABEL = {
	live: "Live now",
	upcoming: "Upcoming",
	ended: "Ended",
} as const;

function OffersPage() {
	const offers = OFFERS.filter((offer) => offerStatus(offer) !== "ended").sort(
		(a, b) => a.start.localeCompare(b.start),
	);

	return (
		<>
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<Gift className="size-4 text-primary" aria-hidden="true" />
							Seasonal offers
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Timed around <span className="text-primary">Nepal's seasons</span>
							.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							Free inspections and priority booking around Dashain, Tihar and
							the pre-monsoon season — when a breakdown is least convenient.
						</p>
					</ScrollReveal>
				</section>

				<div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
					{offers.length === 0 ? (
						<div className="rounded-2xl border border-border border-dashed p-10 text-center">
							<p className="font-medium">Nothing running right now</p>
							<p className="mt-1 text-muted-foreground text-sm">
								Get in touch and we'll let you know when the next one starts.
							</p>
						</div>
					) : (
						<div className="grid gap-5">
							{offers.map((offer, index) => {
								const status = offerStatus(offer);
								return (
									<ScrollReveal
										key={offer.slug}
										delay={index * 0.06}
										className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center"
									>
										<div>
											<div className="flex flex-wrap items-center gap-2.5">
												<span className="font-medium text-primary text-sm">
													{offer.occasion}
												</span>
												<span className="text-muted-foreground text-sm">
													· {formatOfferWindow(offer)}
												</span>
												{status === "live" ? (
													<span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary text-xs">
														<span className="size-1.5 rounded-full bg-primary" />
														{STATUS_LABEL.live}
													</span>
												) : (
													<span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground text-xs">
														{STATUS_LABEL.upcoming}
													</span>
												)}
											</div>
											<h2 className="mt-3 font-semibold text-xl tracking-tight">
												{offer.title}
											</h2>
											<p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
												{offer.description}
											</p>
											<ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
												{offer.perks.map((perk) => (
													<li
														key={perk}
														className="flex items-center gap-2 text-sm"
													>
														<Check
															className="size-4 shrink-0 text-primary"
															aria-hidden="true"
														/>
														{perk}
													</li>
												))}
											</ul>
										</div>
										<ButtonLink href="/contact" className="w-fit md:w-auto">
											Book now
											<ArrowRight className="size-3.5" />
										</ButtonLink>
									</ScrollReveal>
								);
							})}
						</div>
					)}
				</div>
			</>
	);
}
