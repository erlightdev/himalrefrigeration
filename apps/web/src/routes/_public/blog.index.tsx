import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/motion/input";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import {
	BLOG_CATEGORIES,
	type BlogPost,
	formatPostDate,
	postIsoDate,
	postsByDate,
} from "@/data/blog-posts";

export const Route = createFileRoute("/_public/blog/")({
	component: BlogPage,
	head: () => ({
		meta: [
			{ title: "Blog — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Practical guides on HVAC efficiency, cold storage and maintenance from Himal Refrigeration's engineers.",
			},
		],
	}),
});

function BlogPage() {
	const [category, setCategory] = useState<string>("All");
	const [query, setQuery] = useState("");

	const posts = useMemo(() => {
		const q = query.trim().toLowerCase();
		return postsByDate().filter(
			(post) =>
				(category === "All" || post.category === category) &&
				(!q ||
					post.title.toLowerCase().includes(q) ||
					post.excerpt.toLowerCase().includes(q)),
		);
	}, [category, query]);

	// The newest post leads only on the unfiltered view; once someone filters,
	// every result gets equal weight.
	const browsing = category === "All" && !query.trim();
	const [lead, ...rest] = browsing ? posts : [undefined, ...posts];

	return (
		<>
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<BookOpen className="size-4 text-primary" aria-hidden="true" />
							Blog
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Notes from the <span className="text-primary">field</span>.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							Practical guides on efficiency, cold storage and maintenance from
							our engineers.
						</p>
					</ScrollReveal>
				</section>

				<div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<Tabs
							variant="pill"
							value={category}
							onValueChange={setCategory}
							className="min-w-0"
						>
							<TabsList className="border border-border">
								{BLOG_CATEGORIES.map((item) => (
									<TabsTrigger key={item} value={item}>
										{item}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<Input
							value={query}
							onChange={setQuery}
							placeholder="Search articles"
							aria-label="Search articles"
							leftIcon={<Search className="size-4" />}
							className="w-full md:w-64"
						/>
					</div>

					{posts.length === 0 ? (
						<div className="mt-10 rounded-2xl border border-border border-dashed p-10 text-center">
							<p className="font-medium">No articles match that</p>
							<p className="mt-1 text-muted-foreground text-sm">
								Try another word or category.
							</p>
						</div>
					) : (
						<>
							{lead ? <LeadPost post={lead} /> : null}
							{rest.length > 0 ? (
								<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
									{rest.map((post, index) =>
										post ? (
											<ScrollReveal key={post.id} delay={(index % 3) * 0.06}>
												<PostCard post={post} />
											</ScrollReveal>
										) : null,
									)}
								</div>
							) : null}
						</>
					)}
				</div>
			</>
	);
}

function PostMeta({ post }: { post: BlogPost }) {
	return (
		<p className="text-muted-foreground text-sm">
			<span className="text-primary">{post.category}</span> ·{" "}
			<time dateTime={postIsoDate(post)}>{formatPostDate(post)}</time> ·{" "}
			{post.readTime}
		</p>
	);
}

function LeadPost({ post }: { post: BlogPost }) {
	return (
		<ScrollReveal className="mt-10">
			<Link
				to="/blog/$slug"
				params={{ slug: post.slug }}
				className="group grid overflow-hidden rounded-3xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[1.15fr_1fr]"
			>
				<div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
					<img
						src={post.image}
						alt=""
						className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
					/>
				</div>
				<div className="flex flex-col p-6 sm:p-8">
					<PostMeta post={post} />
					<h2 className="mt-3 text-balance font-semibold text-2xl leading-tight tracking-tight sm:text-3xl">
						{post.title}
					</h2>
					<p className="mt-3 line-clamp-3 text-muted-foreground leading-relaxed">
						{post.excerpt}
					</p>
					<p className="mt-auto pt-6 text-muted-foreground text-sm">
						{post.author}
					</p>
				</div>
			</Link>
		</ScrollReveal>
	);
}

function PostCard({ post }: { post: BlogPost }) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug: post.slug }}
			className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
		>
			<div className="aspect-[16/10] overflow-hidden bg-muted">
				<img
					src={post.image}
					alt=""
					loading="lazy"
					className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				/>
			</div>
			<div className="flex flex-1 flex-col p-5">
				<PostMeta post={post} />
				<h3 className="mt-2 line-clamp-2 font-medium leading-snug transition-colors group-hover:text-primary">
					{post.title}
				</h3>
				<p className="mt-2 line-clamp-2 text-muted-foreground text-sm leading-relaxed">
					{post.excerpt}
				</p>
			</div>
		</Link>
	);
}
