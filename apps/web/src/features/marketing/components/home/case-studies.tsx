import { cn } from "@himalref/ui/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ButtonLink } from "@/components/motion/button/base";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { PROJECT_CATEGORIES } from "@/data/projects";

type CaseStudy = {
	client: string;
	title: string;
	stats: [{ value: string; label: string }, { value: string; label: string }];
	image: string;
	/** Panel colour — a Tailwind background class. */
	tone: string;
	href: string;
};

const FOUNDED = 1998;

// A real, verifiable pair of figures per sector — a project count we can
// actually point to, plus how long we've served that sector — rather than
// an invented metric.
const TONES = [
	"bg-[#8f1d24]",
	"bg-[#1f4e79]",
	"bg-[#2f5d50]",
	"bg-[#3d3a4f]",
	"bg-[#6b4a1f]",
	"bg-[#1f4e4e]",
	"bg-[#4a2f5d]",
] as const;

const CASE_STUDIES: CaseStudy[] = PROJECT_CATEGORIES.map((category, index) => ({
	client: category.label,
	title: category.tagline,
	stats: [
		{ value: `${category.projects.length}+`, label: "Completed sites" },
		{ value: `${FOUNDED}`, label: "Serving since" },
	],
	image: category.projects[0].image,
	tone: TONES[index % TONES.length],
	href: `/projects/${category.slug}`,
}));

export function CaseStudies() {
	const items = CASE_STUDIES;

	const [viewportRef, embla] = useEmblaCarousel({
		align: "center",
		loop: true,
		containScroll: false,
	});
	const [selected, setSelected] = useState(0);

	useEffect(() => {
		if (!embla) return;
		const onSelect = () => setSelected(embla.selectedScrollSnap());
		onSelect();
		embla.on("select", onSelect).on("reInit", onSelect);
		return () => {
			embla.off("select", onSelect).off("reInit", onSelect);
		};
	}, [embla]);

	const prev = useCallback(() => embla?.scrollPrev(), [embla]);
	const next = useCallback(() => embla?.scrollNext(), [embla]);

	if (items.length === 0) return null;

	return (
		<section
			aria-roledescription="carousel"
			aria-label="Project case studies"
			className="border-t py-20 lg:py-28"
		>
			<ScrollReveal className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
				<h2 className="max-w-xl border-primary border-l-2 pl-5 font-semibold text-3xl leading-tight tracking-tight sm:text-4xl">
					Trusted on sites of every size.{" "}
					<span className="text-muted-foreground">
						Systems engineered for the load, then supported for their life.
					</span>
				</h2>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={prev}
						aria-label="Previous project"
						className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
					>
						<ChevronLeft className="size-4" />
					</button>
					<button
						type="button"
						onClick={next}
						aria-label="Next project"
						className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
					>
						<ChevronRight className="size-4" />
					</button>
				</div>
			</ScrollReveal>

			<div ref={viewportRef} className="mt-12 overflow-hidden">
				<div className="flex touch-pan-y items-stretch">
					{items.map((study, index) => {
						const active = index === selected;
						return (
							<div
								key={study.title}
								role="group"
								aria-roledescription="slide"
								aria-label={`${index + 1} of ${items.length}: ${study.client}`}
								className="min-w-0 shrink-0 grow-0 basis-[88%] px-2 md:basis-[72%] lg:basis-[62%]"
							>
								<article
									className={cn(
										"grid h-full overflow-hidden rounded-2xl text-white transition-opacity duration-500 md:h-[26rem] md:grid-cols-2",
										study.tone,
										!active && "opacity-40",
									)}
								>
									<div className="flex min-h-[22rem] flex-col p-6 sm:p-8 md:min-h-0">
										<p className="font-semibold text-sm tracking-tight">
											{study.client}
										</p>
										{/* Fixed three-line block so every card lines up, whatever the headline length. */}
										<h3 className="mt-6 line-clamp-3 min-h-[3.75em] text-balance font-medium text-2xl leading-[1.25] tracking-tight">
											{study.title}
										</h3>
										<dl className="mt-auto grid grid-cols-2 gap-6 pt-8">
											{study.stats.map((stat) => (
												<div key={stat.label} className="flex flex-col-reverse">
													<dt className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-white/75">
														{stat.label}
													</dt>
													<dd className="truncate font-medium text-3xl tabular-nums tracking-tight">
														{stat.value}
													</dd>
												</div>
											))}
										</dl>
										<ButtonLink
											href={study.href}
											size="sm"
											variant="secondary"
											tabIndex={active ? 0 : -1}
											className="mt-6 w-fit border-0 bg-white text-neutral-900 hover:bg-white/90"
										>
											View projects
											<ArrowRight className="size-3.5" />
										</ButtonLink>
									</div>
									{/* Absolutely positioned so a tall photo can't stretch the row. */}
									<div className="relative h-56 md:h-auto">
										<img
											src={study.image}
											alt=""
											loading="lazy"
											draggable={false}
											className="absolute inset-0 size-full object-cover"
										/>
									</div>
								</article>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
