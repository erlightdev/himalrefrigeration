import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Link2 } from "lucide-react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/motion/breadcrumb";
import { Button } from "@/components/motion/button/base";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
	BLOG_POSTS,
	type BlogPost,
	formatPostDate,
	postIsoDate,
	postsByDate,
} from "@/data/blog-posts";
import { toast } from "@/lib/toast";

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		const post = BLOG_POSTS.find((item) => item.slug === params.slug);
		if (!post) throw notFound();
		return { post };
	},
	head: ({ loaderData }) => ({
		meta: loaderData
			? [
					{ title: `${loaderData.post.title} — Himal Refrigeration` },
					{ name: "description", content: loaderData.post.excerpt },
				]
			: [],
	}),
	component: ArticlePage,
});

function ArticlePage() {
	const { post } = Route.useLoaderData();
	// Same topic first, then the newest of the rest.
	const related = postsByDate()
		.filter((item) => item.id !== post.id)
		.sort(
			(a, b) =>
				Number(b.category === post.category) -
				Number(a.category === post.category),
		)
		.slice(0, 3);

	const share = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success("Link copied");
		} catch {
			toast.error("Couldn't copy the link");
		}
	};

	const [lead, ...body] = post.body;

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<Header />

			<main className="flex-1">
				<article className="mx-auto max-w-3xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
					<Breadcrumb>
						<BreadcrumbList maxItems={Number.POSITIVE_INFINITY}>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{post.category}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<ScrollReveal className="mt-8">
						<h1 className="text-balance font-extrabold text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
							{post.title}
						</h1>
						<p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
							{post.excerpt}
						</p>
						<div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-border border-y py-4">
							<div className="flex items-center gap-3">
								<span
									aria-hidden="true"
									className="grid size-9 place-items-center rounded-full bg-accent font-semibold text-accent-foreground text-xs"
								>
									{post.author
										.split(" ")
										.map((word) => word[0])
										.slice(0, 2)
										.join("")}
								</span>
								<div className="text-sm">
									<p className="font-medium">{post.author}</p>
									<p className="text-muted-foreground">
										<time dateTime={postIsoDate(post)}>
											{formatPostDate(post)}
										</time>{" "}
										· {post.readTime}
									</p>
								</div>
							</div>
							<Button variant="ghost" size="sm" onClick={share}>
								<Link2 className="size-3.5" />
								Copy link
							</Button>
						</div>
					</ScrollReveal>

					<div className="mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-muted">
						<img src={post.image} alt="" className="size-full object-cover" />
					</div>

					<div className="mt-10 space-y-6 text-pretty leading-[1.8] sm:text-[1.0625rem]">
						{lead ? (
							<p className="text-foreground text-lg leading-relaxed sm:text-xl">
								{lead}
							</p>
						) : null}
						{body.map((paragraph) => (
							<p key={paragraph.slice(0, 32)} className="text-foreground/85">
								{paragraph}
							</p>
						))}
					</div>
				</article>

				{related.length > 0 ? (
					<section className="border-border border-t">
						<div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
							<div className="flex items-center justify-between">
								<h2 className="font-semibold text-xl tracking-tight">
									Keep reading
								</h2>
								<Link
									to="/blog"
									className="text-muted-foreground text-sm transition-colors hover:text-foreground"
								>
									All articles
								</Link>
							</div>
							<div className="mt-6 grid gap-5 sm:grid-cols-3">
								{related.map((item) => (
									<RelatedCard key={item.id} post={item} />
								))}
							</div>
						</div>
					</section>
				) : null}
			</main>

			<Footer />
		</div>
	);
}

function RelatedCard({ post }: { post: BlogPost }) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug: post.slug }}
			className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
		>
			<div className="aspect-[16/10] overflow-hidden bg-muted">
				<img
					src={post.image}
					alt=""
					loading="lazy"
					className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				/>
			</div>
			<div className="p-5">
				<p className="text-muted-foreground text-xs">
					<span className="text-primary">{post.category}</span> ·{" "}
					{post.readTime}
				</p>
				<p className="mt-2 line-clamp-2 font-medium leading-snug transition-colors group-hover:text-primary">
					{post.title}
				</p>
			</div>
		</Link>
	);
}
