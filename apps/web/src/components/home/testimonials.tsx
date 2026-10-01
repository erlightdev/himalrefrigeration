import { createAvatar } from "@dicebear/core";
import * as funEmoji from "@dicebear/fun-emoji";
import { cn } from "@himalref/ui/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { EASE_OUT } from "@/lib/ease";

type Testimonial = {
	quote: string;
	name: string;
	role: string;
	/** Optional portrait in /public; falls back to a generated avatar. */
	image?: string;
};

/**
 * Real customer quotes go here, with the customer's permission.
 * While this is empty the section renders SAMPLE_TESTIMONIALS in development
 * only — invented quotes must never reach the live site.
 */
const TESTIMONIALS: Testimonial[] = [];

// Development preview only (see the gate in Testimonials below). These are
// written for layout and are not real customers — never ship them.
const SAMPLE_TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"We moved all 84 rooms to a VRF system over the off-season. Guests stopped complaining about noise, and our electricity bill dropped noticeably the first summer.",
		name: "Anjali Shrestha",
		role: "General Manager, Lakeside hotel, Pokhara",
	},
	{
		quote:
			"A display chiller failed on a Friday evening. Their technician was on site within two hours with the right part, and we didn't lose any stock.",
		name: "Rajesh Maharjan",
		role: "Store Operations, Supermarket, Lalitpur",
	},
	{
		quote:
			"For vaccines, the cold room can't drift. Two years in, the temperature log is flat, and the maintenance visits happen without us having to chase anyone.",
		name: "Dr. Sunita Karki",
		role: "Pharmacy Lead, Hospital, Kathmandu",
	},
	{
		quote:
			"They did the load calculation before quoting anything. The system they recommended was smaller than another bid, and it has kept up through every hot spell.",
		name: "Bikash Thapa",
		role: "Facilities Head, Office tower, Kathmandu",
	},
];

const ROTATE_MS = 6000;

/** Fun-emoji avatar generated locally (no network), seeded so it's stable per person. */
function avatarFor(seed: string) {
	return createAvatar(funEmoji, {
		seed,
		radius: 0,
		backgroundType: ["gradientLinear"],
	}).toDataUri();
}

export function Testimonials() {
	const items =
		TESTIMONIALS.length > 0
			? TESTIMONIALS
			: import.meta.env.DEV
				? SAMPLE_TESTIMONIALS
				: [];
	const avatars = useMemo(
		() =>
			items.map((item) => item.image ?? avatarFor(`${item.name}-${item.role}`)),
		[items],
	);
	const reduce = useReducedMotion();
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (paused || reduce || items.length < 2) return;
		const timer = window.setInterval(
			() => setActive((current) => (current + 1) % items.length),
			ROTATE_MS,
		);
		return () => window.clearInterval(timer);
	}, [paused, reduce, items.length]);

	const current = items[active];
	if (!current) return null;

	return (
		<section
			aria-roledescription="carousel"
			aria-label="Customer testimonials"
			className="border-t py-20 lg:py-28"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onFocusCapture={() => setPaused(true)}
			onBlurCapture={() => setPaused(false)}
		>
			<div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
				<span className="inline-flex rounded-full border border-border px-3 py-1 text-muted-foreground text-xs">
					What clients say
				</span>

				<div className="relative mt-12 grid min-h-[17rem] place-items-center sm:min-h-[14rem]">
					<AnimatePresence mode="wait" initial={false}>
						<motion.figure
							key={active}
							initial={
								reduce
									? { opacity: 0 }
									: { opacity: 0, y: 8, filter: "blur(4px)" }
							}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							exit={
								reduce
									? { opacity: 0 }
									: { opacity: 0, y: -8, filter: "blur(4px)" }
							}
							transition={{ duration: 0.35, ease: EASE_OUT }}
							aria-live="polite"
						>
							<blockquote className="text-balance font-medium text-xl leading-snug tracking-tight sm:text-2xl">
								“{current.quote}”
							</blockquote>
							<figcaption className="mt-10">
								<p className="font-medium">{current.name}</p>
								<p className="mt-0.5 text-muted-foreground text-sm">
									{current.role}
								</p>
							</figcaption>
						</motion.figure>
					</AnimatePresence>
				</div>

				<div className="mt-10 flex items-center justify-center" role="tablist">
					{items.map((item, index) => {
						const selected = index === active;
						return (
							<button
								key={`${item.role}-${index}`}
								type="button"
								role="tab"
								aria-selected={selected}
								aria-label={`${item.name}, ${item.role}`}
								onClick={() => setActive(index)}
								className={cn(
									"relative -mx-1.5 grid size-14 place-items-center overflow-hidden rounded-2xl border-2 border-background bg-muted outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring",
									selected
										? "z-10 size-[4.5rem] -translate-y-2 border-primary/60 shadow-xl"
										: "opacity-60 hover:opacity-100",
									index % 2 === 0 ? "-rotate-3" : "rotate-3",
									selected && "rotate-0",
								)}
							>
								<img
									src={avatars[index]}
									alt=""
									className="size-full object-cover"
								/>
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}
