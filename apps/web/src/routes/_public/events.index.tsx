import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useMemo, useState } from "react";

import { ButtonLink } from "@/components/motion/button/base";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import {
	EVENT_TYPES,
	EVENTS,
	type EventItem,
	type EventType,
	eventDateParts,
	formatEventDate,
	isUpcoming,
} from "@/data/events";

export const Route = createFileRoute("/_public/events/")({
	component: EventsPage,
	head: () => ({
		meta: [
			{ title: "Events — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Expos, technical seminars and product launches with Himal Refrigeration across Nepal.",
			},
		],
	}),
});

type Filter = "all" | EventType;

function EventsPage() {
	const [filter, setFilter] = useState<Filter>("all");

	const { upcoming, past } = useMemo(() => {
		const shown = EVENTS.filter(
			(event) => filter === "all" || event.type === filter,
		);
		const byStart = (a: EventItem, b: EventItem) =>
			a.start.localeCompare(b.start);
		return {
			upcoming: shown.filter((event) => isUpcoming(event)).sort(byStart),
			past: shown
				.filter((event) => !isUpcoming(event))
				.sort((a, b) => byStart(b, a)),
		};
	}, [filter]);

	return (
		<>
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<CalendarDays
								className="size-4 text-primary"
								aria-hidden="true"
							/>
							Events
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Meet our engineers <span className="text-primary">in person</span>
							.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							Expos, technical seminars and product launches across Nepal.
						</p>
					</ScrollReveal>
				</section>

				<div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
					<Tabs
						variant="pill"
						value={filter}
						onValueChange={(value) => setFilter(value as Filter)}
					>
						<TabsList className="border border-border">
							<TabsTrigger value="all">All</TabsTrigger>
							{EVENT_TYPES.map((type) => (
								<TabsTrigger key={type.value} value={type.value}>
									{type.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>

					<section aria-labelledby="upcoming-heading" className="mt-10">
						<h2
							id="upcoming-heading"
							className="font-semibold text-xl tracking-tight"
						>
							Upcoming
						</h2>
						{upcoming.length > 0 ? (
							<div className="mt-5 grid gap-5">
								{upcoming.map((event) => (
									<UpcomingCard key={event.id} event={event} />
								))}
							</div>
						) : (
							<div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border border-dashed p-6 sm:flex-row sm:items-center">
								<div>
									<p className="font-medium">Nothing scheduled right now</p>
									<p className="mt-1 text-muted-foreground text-sm">
										Get in touch and we'll let you know when the next one is
										announced.
									</p>
								</div>
								<ButtonLink href="/contact" size="sm" variant="secondary">
									Contact us
									<ArrowRight className="size-3.5" />
								</ButtonLink>
							</div>
						)}
					</section>

					{past.length > 0 ? (
						<section aria-labelledby="past-heading" className="mt-16">
							<h2
								id="past-heading"
								className="font-semibold text-xl tracking-tight"
							>
								Past events
							</h2>
							<ol className="mt-5 divide-y divide-border border-border border-y">
								{past.map((event) => (
									<li key={event.id}>
										<PastRow event={event} />
									</li>
								))}
							</ol>
						</section>
					) : null}
				</div>
			</>
	);
}

function UpcomingCard({ event }: { event: EventItem }) {
	return (
		<ScrollReveal>
			<Link
				to="/events/$slug"
				params={{ slug: event.slug }}
				className="group grid overflow-hidden rounded-3xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[1.1fr_1fr]"
			>
				<div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
					<img
						src={event.image}
						alt=""
						className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
					/>
				</div>
				<div className="flex flex-col p-6 sm:p-8">
					<p className="font-medium text-primary text-sm">
						{event.type} · {formatEventDate(event)}
					</p>
					<h3 className="mt-3 text-balance font-semibold text-2xl tracking-tight">
						{event.title}
					</h3>
					<p className="mt-3 line-clamp-3 text-muted-foreground leading-relaxed">
						{event.description}
					</p>
					<p className="mt-auto flex items-center gap-1.5 pt-6 text-muted-foreground text-sm">
						<MapPin className="size-4 shrink-0" aria-hidden="true" />
						{event.venue}
					</p>
				</div>
			</Link>
		</ScrollReveal>
	);
}

function PastRow({ event }: { event: EventItem }) {
	const { month, day, year } = eventDateParts(event);
	return (
		<Link
			to="/events/$slug"
			params={{ slug: event.slug }}
			className="group flex items-center gap-5 py-5 outline-none focus-visible:bg-muted/50"
		>
			<div className="w-14 shrink-0 text-center">
				<p className="font-medium text-muted-foreground text-xs uppercase">
					{month}
				</p>
				<p className="font-semibold text-2xl tabular-nums leading-none">
					{day}
				</p>
				<p className="mt-1 text-muted-foreground text-xs tabular-nums">
					{year}
				</p>
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium transition-colors group-hover:text-primary">
					{event.title}
				</p>
				<p className="mt-1 truncate text-muted-foreground text-sm">
					{event.type} · {event.location}
				</p>
			</div>
			<ArrowUpRight
				className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
				aria-hidden="true"
			/>
		</Link>
	);
}
