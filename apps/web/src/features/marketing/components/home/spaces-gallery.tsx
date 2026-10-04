import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Photo = { src: string; alt: string; aspect: string };

const p = (name: string, alt: string, aspect: string): Photo => ({
	src: `/images/projects/${name}.webp`,
	alt,
	aspect,
});

// Placeholder photography (see public/images/projects/README.md) — swap a
// file for a real installation photo of the same name.
const COLUMNS: Photo[][] = [
	[
		p(
			"outdoor-units-wall",
			"Outdoor AC units mounted on a commercial wall",
			"aspect-[4/3]",
		),
		p(
			"dairy-display",
			"Refrigerated dairy display in a supermarket",
			"aspect-[4/5]",
		),
		p("office-corridor", "Glass-walled office corridor", "aspect-[3/2]"),
		p(
			"building-pipework",
			"Ducting and refrigerant pipework on a brick building",
			"aspect-[4/5]",
		),
	],
	[
		p("frozen-storage", "Frozen goods stacked in a cold store", "aspect-[3/4]"),
		p(
			"indoor-split-ac",
			"Indoor split air conditioner set to 22 degrees",
			"aspect-[3/2]",
		),
		p(
			"rooftop-crew",
			"Technicians at work beside rooftop condensers",
			"aspect-[4/3]",
		),
		p(
			"drinks-aisle",
			"Chilled drinks aisle in a grocery store",
			"aspect-[4/5]",
		),
	],
	[
		p("condenser-bank", "Bank of industrial condenser fans", "aspect-[3/4]"),
		p(
			"open-plan-office",
			"Open-plan office with linear lighting",
			"aspect-[3/2]",
		),
		p(
			"cold-store-loading",
			"Loading entrance to a cold storage facility",
			"aspect-[4/3]",
		),
		p(
			"display-chiller",
			"Glass-door beverage chiller in a shop",
			"aspect-[3/4]",
		),
	],
	[
		p(
			"rooftop-inspection",
			"Engineer inspecting rooftop plant",
			"aspect-[4/3]",
		),
		p("wall-mounted-ac", "Wall-mounted air conditioning unit", "aspect-[3/2]"),
		p("beverage-display", "Row of refrigerated display cases", "aspect-[4/3]"),
		p(
			"outdoor-units-wall",
			"Outdoor AC units mounted on a commercial wall",
			"aspect-[4/5]",
		),
	],
];

function GalleryColumn({
	photos,
	reverse,
	speed,
	className,
}: {
	photos: Photo[];
	reverse: boolean;
	speed: number;
	className?: string;
}) {
	const reduce = useReducedMotion();
	// Embla's loop needs more content than the viewport holds, so each column
	// runs its set twice.
	const slides = [...photos, ...photos];
	const [viewportRef] = useEmblaCarousel(
		{ axis: "y", loop: true, dragFree: true, watchDrag: false },
		reduce
			? []
			: [
					AutoScroll({
						speed,
						direction: reverse ? "backward" : "forward",
						startDelay: 0,
						stopOnInteraction: false,
						stopOnMouseEnter: true,
						stopOnFocusIn: false,
					}),
				],
	);

	return (
		<div
			ref={viewportRef}
			className={`h-full overflow-hidden ${className ?? ""}`}
		>
			<div className="flex h-full flex-col">
				{slides.map((photo, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: the set repeats, so the index disambiguates
						key={`${photo.src}-${index}`}
						className="min-h-0 shrink-0 pb-3"
					>
						<img
							src={photo.src}
							alt={index < photos.length ? photo.alt : ""}
							aria-hidden={index >= photos.length || undefined}
							loading="lazy"
							decoding="async"
							draggable={false}
							className={`w-full rounded-lg bg-muted object-cover ${photo.aspect}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export function SpacesGallery() {
	return (
		<section className="border-t py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<ScrollReveal className="flex flex-col justify-between gap-4 border-border border-b pb-8 md:flex-row md:items-end">
					<div>
						<p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
							Where we work
						</p>
						<h2 className="mt-3 max-w-md text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
							Built for every space that needs to stay cool
						</h2>
					</div>
					<p className="max-w-xs text-muted-foreground text-sm md:text-right">
						From rooftop condensers to supermarket chillers and cold stores.
					</p>
				</ScrollReveal>

				<div className="relative mt-8 h-[36rem] [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] lg:h-[40rem]">
					<div className="grid h-full grid-cols-2 gap-3 md:grid-cols-4">
						{COLUMNS.map((photos, index) => (
							<GalleryColumn
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed column layout
								key={index}
								photos={photos}
								reverse={index % 2 === 1}
								speed={0.45 + (index % 2) * 0.1}
								className={index >= 2 ? "hidden md:block" : undefined}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
