import { buttonVariants } from "@himalref/ui/components/button";
import { cn } from "@himalref/ui/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
	ChevronDown,
	HelpCircle,
	MessageSquare,
	PhoneCall,
	Sparkles,
} from "lucide-react";
import { useState } from "react";


export const Route = createFileRoute("/_public/faq")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "Frequently Asked Questions - Himal Refrigeration" }],
	}),
});

interface FAQItem {
	id: string;
	question: string;
	answer: string;
	category:
		| "AC Safety & Health"
		| "Cold Storage & Freezers"
		| "Commercial HVAC & VRF"
		| "Servicing & Warranty";
}

const FAQS: FAQItem[] = [
	{
		id: "faq-1",
		question: "Is it safe to use Room Air Conditioning at home and office?",
		answer:
			"Yes, it is completely safe to use Room AC at home and in office environments. AC units recirculate room air without creating airborne risks when accompanied by outdoor fresh air ventilation. For public offices or high-density areas, running kitchen/toilet exhaust fans and opening windows periodically ensures optimum air exchange while maintaining relative humidity between 40% and 70%.",
		category: "AC Safety & Health",
	},
	{
		id: "faq-2",
		question:
			"What is the recommended temperature setting for energy efficiency & comfort?",
		answer:
			"The recommended default temperature setting is between 24°C and 26°C. Operating room ACs at 24°C balances optimum human thermal comfort with up to 25% lower compressor power consumption compared to setting the unit at 18°C.",
		category: "AC Safety & Health",
	},
	{
		id: "faq-3",
		question:
			"How often should commercial walk-in cold rooms undergo servicing?",
		answer:
			"Commercial walk-in cold storage and freezer rooms should undergo professional inspection every 3 months (quarterly Annual Maintenance Contract). Regular servicing includes checking PUF panel door seals, cleaning evaporator coils, testing automatic defrost cycles, and verifying refrigerant pressure.",
		category: "Cold Storage & Freezers",
	},
	{
		id: "faq-4",
		question: "What is VRF / VRV air conditioning and how does it save power?",
		answer:
			"VRF (Variable Refrigerant Flow) or Daikin VRV technology dynamically adjusts compressor speed and refrigerant flow based on exact heat loads in individual rooms. Rather than running continuously at 100% capacity, VRF systems reduce power draw by up to 40% when only specific zones require cooling.",
		category: "Commercial HVAC & VRF",
	},
	{
		id: "faq-5",
		question:
			"What warranty is provided on Daikin ACs and Himal installed systems?",
		answer:
			"All Daikin inverter split ACs and commercial systems purchased through Himal Refrigeration come with official manufacturer warranties — typically 1 to 5 years on compressors and 1 year on electronic circuit boards. In addition, Himal provides certified installation quality guarantees.",
		category: "Servicing & Warranty",
	},
	{
		id: "faq-6",
		question:
			"Does Himal Refrigeration provide emergency breakdown support outside Kathmandu?",
		answer:
			"Yes! Himal Refrigeration operates authorized technical branches and on-call dispatch teams across all 7 provinces of Nepal. Our rapid response teams carry original OEM spare parts for Daikin, Bitzer, Danfoss, and Copeland equipment.",
		category: "Servicing & Warranty",
	},
	{
		id: "faq-7",
		question:
			"What precautions are recommended during technician home or office visits?",
		answer:
			"Always insist on verified technician identity cards. Himal authorized service technicians follow strict sanitization and tool disinfection protocols for residential and corporate site visits.",
		category: "AC Safety & Health",
	},
	{
		id: "faq-8",
		question:
			"Can Himal design custom PUF panel cold rooms for pharmaceutical storage?",
		answer:
			"Yes. Himal specializes in pharmaceutical cold chain infrastructure designed to strict WHO and ISO standards, complete with digital temperature data logging, dual redundant refrigeration circuits, and automatic SMS alert systems.",
		category: "Cold Storage & Freezers",
	},
];

const CATEGORIES = [
	"All FAQs",
	"AC Safety & Health",
	"Cold Storage & Freezers",
	"Commercial HVAC & VRF",
	"Servicing & Warranty",
];

function RouteComponent() {
	const [selectedCategory, setSelectedCategory] = useState<string>("All FAQs");
	const [visibleCount, setVisibleCount] = useState<number>(4);

	const filteredFaqs = FAQS.filter(
		(faq) =>
			selectedCategory === "All FAQs" || faq.category === selectedCategory,
	);

	const displayedFaqs = filteredFaqs.slice(0, visibleCount);

	return (
		<div className="selection:bg-primary selection:text-primary-foreground">

				{/* FAQ Hero Section */}
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-16 sm:pt-36 lg:pt-40">
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

					<div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs shadow-xs sm:text-sm">
							<HelpCircle className="size-4 text-primary" />
							Frequently Asked Questions & Guidelines
						</div>

						<h1 className="mx-auto max-w-4xl text-balance font-extrabold text-3xl text-zinc-900 leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl dark:text-white">
							Frequently Asked <br className="hidden sm:inline" />
							<span className="font-black text-primary">Questions</span>.
						</h1>

						<p className="mx-auto mt-4 max-w-3xl text-pretty font-normal text-base text-zinc-700 leading-relaxed sm:text-lg dark:text-zinc-300">
							Find quick answers to common questions about our air conditioning
							systems, cold storage installations, maintenance plans, and
							service warranties in Nepal.
						</p>
					</div>
				</section>

				{/* FAQ Category Pills & Individual Accordion Cards */}
				<section className="bg-card/50 py-12 lg:py-20">
					<div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
						{/* Category Filter Pills */}
						<div className="flex flex-wrap items-center justify-center gap-2 border-border/60 border-b pb-2">
							{CATEGORIES.map((cat) => {
								const isActive = selectedCategory === cat;
								return (
									<button
										key={cat}
										type="button"
										onClick={() => {
											setSelectedCategory(cat);
											setVisibleCount(4);
										}}
										className={cn(
											"shrink-0 rounded-full px-4 py-2 font-bold text-xs transition-all sm:text-sm",
											isActive
												? "bg-primary text-primary-foreground shadow-xs"
												: "border border-border/50 bg-muted/60 text-zinc-700 hover:bg-muted hover:text-foreground dark:text-zinc-300",
										)}
									>
										{cat}
									</button>
								);
							})}
						</div>

						{/* Individual Accordion Items */}
						{filteredFaqs.length === 0 ? (
							<div className="space-y-3 py-12 text-center">
								<HelpCircle className="mx-auto size-12 text-zinc-400" />
								<h3 className="font-bold text-foreground text-lg">
									No Matching Questions Found
								</h3>
								<p className="text-muted-foreground text-xs">
									Try searching with a different keyword or select another
									category.
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{displayedFaqs.map((faq) => (
									<details
										key={faq.id}
										className="group rounded-xl border border-border bg-card px-5 transition-all open:shadow-sm"
									>
										<summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-foreground text-sm sm:text-base [&::-webkit-details-marker]:hidden">
											<span>{faq.question}</span>
											<ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
										</summary>
										<p className="pb-4 text-muted-foreground text-sm leading-relaxed">
											{faq.answer}
										</p>
									</details>
								))}

								{/* Expandable "View More" Button */}
								{visibleCount < filteredFaqs.length && (
									<div className="flex justify-center pt-6">
										<button
											type="button"
											onClick={() =>
												setVisibleCount((prev) =>
													Math.min(filteredFaqs.length, prev + 4),
												)
											}
											className={cn(
												buttonVariants({ variant: "outline" }),
												"gap-2 rounded-full border-border/80 px-6 font-bold text-xs shadow-xs hover:bg-muted",
											)}
										>
											<span>View more</span>
											<ChevronDown className="size-4 text-primary" />
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</section>

				{/* Unanswered Questions CTA Box */}
				<section className="border-border/60 border-t bg-muted/30 py-16">
					<div className="mx-auto max-w-4xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
						<div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
							<MessageSquare className="size-6" />
						</div>
						<h2 className="font-extrabold text-2xl text-zinc-900 tracking-tight sm:text-3xl dark:text-white">
							Still Have Questions About Your Cooling System?
						</h2>
						<p className="mx-auto max-w-xl text-xs text-zinc-600 leading-relaxed sm:text-sm dark:text-zinc-300">
							Our senior engineering team is ready to provide technical advice,
							heat load calculations, and site inspections.
						</p>
						<div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
							<a
								href="/contact"
								className={cn(
									buttonVariants({ size: "lg" }),
									"gap-2 rounded-xl font-bold shadow-md",
								)}
							>
								<Sparkles className="size-4" />
								Contact Technical Desk
							</a>
							<a
								href="tel:+977015520123"
								className={cn(
									buttonVariants({ variant: "outline", size: "lg" }),
									"gap-2 rounded-xl font-bold",
								)}
							>
								<PhoneCall className="size-4 text-primary" />
								Call: +977-01-5520123
							</a>
						</div>
					</div>
				</section>
		</div>
	);
}
