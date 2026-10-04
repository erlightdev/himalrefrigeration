import { Link } from "@tanstack/react-router";

import type { LegalSection } from "@/data/legal/privacy-policy";

const dateFormat = new Intl.DateTimeFormat("en-US", {
	month: "long",
	day: "numeric",
	year: "numeric",
});

export function LegalPage({
	title,
	updated,
	sections,
}: {
	title: string;
	updated: string;
	sections: LegalSection[];
}) {
	return (
		<div className="mx-auto max-w-5xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
					<h1 className="text-balance font-extrabold text-3xl leading-[1.15] tracking-tight sm:text-4xl">
						{title}
					</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Last updated{" "}
						<time dateTime={updated}>
							{dateFormat.format(new Date(`${updated}T00:00:00`))}
						</time>
					</p>

					<div className="mt-4 rounded-xl border border-primary/30 border-dashed bg-accent/40 px-4 py-3 text-sm">
						<p className="text-accent-foreground">
							This is a plain-language draft covering what the site actually
							does today. Have it reviewed by a lawyer licensed in Nepal before
							relying on it, and update it if the site's data practices change.
						</p>
					</div>

					<div className="mt-10 grid gap-10 lg:grid-cols-[14rem_1fr]">
						<nav
							aria-label="Sections"
							className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
						>
							<ul className="space-y-2.5 text-sm">
								{sections.map((section) => (
									<li key={section.id}>
										<a
											href={`#${section.id}`}
											className="text-muted-foreground transition-colors hover:text-foreground"
										>
											{section.heading}
										</a>
									</li>
								))}
							</ul>
						</nav>

						<div className="min-w-0 space-y-10">
							{sections.map((section) => (
								<section
									key={section.id}
									id={section.id}
									className="scroll-mt-28"
								>
									<h2 className="font-semibold text-xl tracking-tight">
										{section.heading}
									</h2>
									<div className="mt-3 space-y-3 text-pretty text-muted-foreground leading-relaxed">
										{section.blocks.map((block) =>
											block.type === "p" ? (
												<p key={block.text.slice(0, 40)}>{block.text}</p>
											) : (
												<ul
													key={block.items[0]}
													className="list-disc space-y-1.5 pl-5"
												>
													{block.items.map((item) => (
														<li key={item}>{item}</li>
													))}
												</ul>
											),
										)}
									</div>
								</section>
							))}

							<section className="rounded-2xl border border-border bg-card p-6">
								<p className="font-medium">Questions about this?</p>
								<p className="mt-1.5 text-muted-foreground text-sm">
									Email{" "}
									<a
										href="mailto:info@himalref.com.np"
										className="text-primary underline-offset-4 hover:underline"
									>
										info@himalref.com.np
									</a>{" "}
									or{" "}
									<Link
										to="/contact"
										className="text-primary underline-offset-4 hover:underline"
									>
										use the contact form
									</Link>
									.
								</p>
							</section>
						</div>
					</div>
				</div>
	);
}
