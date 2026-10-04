import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, Clock, MapPin } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/motion/breadcrumb";
import { ButtonLink } from "@/components/motion/button/base";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
	EVENTS,
	type EventItem,
	formatEventDate,
	isUpcoming,
} from "@/data/events";

export const Route = createFileRoute("/_public/events/$slug")({
	loader: ({ params }) => {
		const event = EVENTS.find((item) => item.slug === params.slug);
		if (!event) throw notFound();
		return { event };
	},
	head: ({ loaderData }) => ({
		meta: loaderData
			? [
					{ title: `${loaderData.event.title} — Himal Refrigeration` },
					{ name: "description", content: loaderData.event.description },
				]
			: [],
	}),
	component: EventPage,
});

function EventPage() {
	const { event } = Route.useLoaderData();
	const upcoming = isUpcoming(event);
	const related = EVENTS.filter((item) => item.id !== event.id)
		.sort((a, b) => b.start.localeCompare(a.start))
		.slice(0, 3);

	return (
		<>
				<article className="mx-auto max-w-5xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
					<Breadcrumb>
						<BreadcrumbList maxItems={Number.POSITIVE_INFINITY}>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/events">Events</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage className="max-w-[14rem] truncate sm:max-w-xs">
									{event.title}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<ScrollReveal className="mt-8 max-w-3xl">
						<p className="flex items-center gap-2 font-medium text-sm">
							<span className="text-primary">{event.type}</span>
							{upcoming ? null : (
								<span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground text-xs">
									Past event
								</span>
							)}
						</p>
						<h1 className="mt-3 text-balance font-extrabold text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
							{event.title}
						</h1>
						<p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
							{event.description}
						</p>
					</ScrollReveal>

					<dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
						<Meta
							icon={CalendarDays}
							label="Date"
							value={formatEventDate(event)}
						/>
						<Meta icon={Clock} label="Time" value={event.time} />
						<Meta
							icon={MapPin}
							label="Venue"
							value={`${event.venue}, ${event.location.replace(", Nepal", "")}`}
						/>
					</dl>

					<div className="mt-8 aspect-[16/8] overflow-hidden rounded-3xl bg-muted">
						<img src={event.image} alt="" className="size-full object-cover" />
					</div>

					<div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem]">
						<div className="space-y-5 text-pretty leading-relaxed">
							{event.about.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>

						<aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
							<div>
								<h2 className="font-medium text-muted-foreground text-sm">
									{upcoming ? "What to expect" : "Highlights"}
								</h2>
								<ul className="mt-3 space-y-2.5">
									{event.highlights.map((item) => (
										<li key={item} className="flex items-start gap-2.5 text-sm">
											<Check
												className="mt-0.5 size-4 shrink-0 text-primary"
												aria-hidden="true"
											/>
											{item}
										</li>
									))}
								</ul>
							</div>

							{upcoming ? (
								<div className="rounded-2xl border border-border bg-card p-5">
									<p className="font-medium">Planning to attend?</p>
									<p className="mt-1 text-muted-foreground text-sm">
										Book a time with an engineer at the event.
									</p>
									<ButtonLink href="/contact" size="sm" className="mt-4 w-full">
										Contact us
										<ArrowRight className="size-3.5" />
									</ButtonLink>
								</div>
							) : null}
						</aside>
					</div>
				</article>

				{related.length > 0 ? (
					<section className="border-border border-t">
						<div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
							<div className="flex items-center justify-between">
								<h2 className="font-semibold text-xl tracking-tight">
									More events
								</h2>
								<Link
									to="/events"
									className="text-muted-foreground text-sm transition-colors hover:text-foreground"
								>
									View all
								</Link>
							</div>
							<div className="mt-6 grid gap-5 sm:grid-cols-3">
								{related.map((item) => (
									<RelatedCard key={item.id} event={item} />
								))}
							</div>
						</div>
					</section>
				) : null}
			</>
	);
}

function Meta({
	icon: Icon,
	label,
	value,
}: {
	icon: typeof CalendarDays;
	label: string;
	value: string;
}) {
	return (
		<div className="flex flex-col-reverse gap-1 bg-background px-5 py-4">
			<dd className="flex items-start gap-2 font-medium text-sm">
				<Icon
					className="mt-0.5 size-4 shrink-0 text-primary"
					aria-hidden="true"
				/>
				{value}
			</dd>
			<dt className="text-muted-foreground text-xs">{label}</dt>
		</div>
	);
}

function RelatedCard({ event }: { event: EventItem }) {
	return (
		<Link
			to="/events/$slug"
			params={{ slug: event.slug }}
			className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
		>
			<div className="aspect-[16/10] overflow-hidden bg-muted">
				<img
					src={event.image}
					alt=""
					loading="lazy"
					className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				/>
			</div>
			<div className="p-5">
				<p className="text-muted-foreground text-xs">
					{event.type} · {formatEventDate(event)}
				</p>
				<p className="mt-2 line-clamp-2 font-medium leading-snug transition-colors group-hover:text-primary">
					{event.title}
				</p>
			</div>
		</Link>
	);
}
