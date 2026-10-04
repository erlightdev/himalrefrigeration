import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/motion/breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getProjectCategory, PROJECT_CATEGORIES } from "@/data/projects";
import { ProjectCard } from "@/features/marketing/components/project-card";

export const Route = createFileRoute("/_public/projects/$category")({
	// icon is a component reference and can't cross the loader's
	// server→client serialization boundary, so the component re-reads the
	// full record from the static array using the slug.
	loader: ({ params }) => {
		const category = getProjectCategory(params.category);
		if (!category) throw notFound();
		return { slug: category.slug, label: category.label };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [] };
		const category = getProjectCategory(loaderData.slug);
		return {
			meta: [
				{ title: `${loaderData.label} Projects — Himal Refrigeration` },
				{
					name: "description",
					content: category?.tagline ?? loaderData.label,
				},
			],
			scripts: category
				? [
						{
							type: "application/ld+json",
							children: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "ItemList",
								name: `${category.label} projects`,
								itemListElement: category.projects.map((project, index) => ({
									"@type": "ListItem",
									position: index + 1,
									name: project.name,
								})),
							}),
						},
					]
				: [],
		};
	},
	component: ProjectCategoryPage,
});

function ProjectCategoryPage() {
	const { slug } = Route.useLoaderData();
	const category = getProjectCategory(slug);
	if (!category) return null;

	const otherCategories = PROJECT_CATEGORIES.filter(
		(item) => item.slug !== category.slug,
	).slice(0, 3);

	return (
		<>
			<div className="mx-auto max-w-6xl px-5 pt-28 pb-4 sm:px-8 sm:pt-32">
				<Breadcrumb>
					<BreadcrumbList maxItems={Number.POSITIVE_INFINITY}>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{category.label}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<ScrollReveal className="mt-8">
					<p className="flex items-center gap-2 font-medium text-primary text-sm">
						<category.icon className="size-4" aria-hidden="true" />
						Projects
					</p>
					<h1 className="mt-3 text-balance font-extrabold text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
						{category.label}
					</h1>
					<p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
						{category.tagline}
					</p>
				</ScrollReveal>
			</div>

			<div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-20">
				<div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{category.projects.map((project, index) => (
						<ScrollReveal key={project.name} delay={(index % 3) * 0.06}>
							<ProjectCard
								name={project.name}
								image={project.image}
								loading={index < 3 ? "eager" : "lazy"}
							/>
						</ScrollReveal>
					))}
				</div>
			</div>

			{otherCategories.length > 0 ? (
				<section className="border-border border-t">
					<div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
						<div className="flex items-center justify-between">
							<h2 className="font-semibold text-xl tracking-tight">
								Other sectors
							</h2>
							<Link
								to="/projects"
								className="text-muted-foreground text-sm transition-colors hover:text-foreground"
							>
								View all
							</Link>
						</div>
						<div className="mt-6 grid gap-5 sm:grid-cols-3">
							{otherCategories.map((item) => (
								<Link
									key={item.slug}
									to="/projects/$category"
									params={{ category: item.slug }}
									className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
								>
									<img
										src={item.projects[0].image}
										alt=""
										loading="lazy"
										className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
									/>
									<div
										aria-hidden="true"
										className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-zinc-950/5"
									/>
									<p className="absolute inset-x-0 bottom-0 p-5 font-medium text-lg text-white tracking-tight">
										{item.label}
									</p>
								</Link>
							))}
						</div>
					</div>
				</section>
			) : null}
		</>
	);
}
