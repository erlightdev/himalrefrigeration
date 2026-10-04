import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
	type BlogPost,
	formatPostDate,
	postIsoDate,
	postsByDate,
} from "@/data/blog-posts";

/* Abstract artwork per card — drawn in SVG so it scales and themes cleanly. */

function RingsArt() {
	return (
		<svg viewBox="0 0 400 240" className="size-full" aria-hidden="true">
			<defs>
				<linearGradient id="rings-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#fdf0ef" />
					<stop offset="1" stopColor="#f6c9c6" />
				</linearGradient>
				<linearGradient id="rings-fg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#f08a84" />
					<stop offset="1" stopColor="#c8141f" />
				</linearGradient>
			</defs>
			<rect width="400" height="240" fill="url(#rings-bg)" />
			{[78, 64, 50, 36, 22].map((r, i) => (
				<circle
					key={r}
					cx={200 + i * 5}
					cy={120 - i * 3}
					r={r}
					fill="none"
					stroke="url(#rings-fg)"
					strokeWidth="9"
					opacity={0.35 + i * 0.13}
				/>
			))}
		</svg>
	);
}

function WaveArt() {
	return (
		<svg viewBox="0 0 400 240" className="size-full" aria-hidden="true">
			<defs>
				<linearGradient id="wave-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#eef6f9" />
					<stop offset="1" stopColor="#bcdbe6" />
				</linearGradient>
			</defs>
			<rect width="400" height="240" fill="url(#wave-bg)" />
			{Array.from({ length: 9 }, (_, i) => (
				<path
					// biome-ignore lint/suspicious/noArrayIndexKey: static decorative lines
					key={i}
					d={`M-20 ${190 - i * 9} C 80 ${40 - i * 6}, 160 ${40 - i * 6}, 210 ${130 - i * 8} S 330 ${230 - i * 9}, 420 ${110 - i * 9}`}
					fill="none"
					stroke="#6aa9bf"
					strokeWidth="10"
					strokeLinecap="round"
					opacity={0.18 + i * 0.07}
				/>
			))}
		</svg>
	);
}

function FrostArt() {
	const arms = Array.from({ length: 6 }, (_, i) => i * 60);
	return (
		<svg viewBox="0 0 400 240" className="size-full" aria-hidden="true">
			<defs>
				<linearGradient id="frost-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#f2f3f5" />
					<stop offset="1" stopColor="#cfd4dc" />
				</linearGradient>
			</defs>
			<rect width="400" height="240" fill="url(#frost-bg)" />
			<g transform="translate(200 120)" stroke="#5b6472" strokeLinecap="round">
				{arms.map((deg) => (
					<g key={deg} transform={`rotate(${deg})`}>
						<line y1="0" y2="-82" strokeWidth="8" opacity="0.75" />
						<line
							x1="0"
							y1="-50"
							x2="-18"
							y2="-68"
							strokeWidth="6"
							opacity="0.55"
						/>
						<line
							x1="0"
							y1="-50"
							x2="18"
							y2="-68"
							strokeWidth="6"
							opacity="0.55"
						/>
						<line
							x1="0"
							y1="-26"
							x2="-12"
							y2="-38"
							strokeWidth="5"
							opacity="0.4"
						/>
						<line
							x1="0"
							y1="-26"
							x2="12"
							y2="-38"
							strokeWidth="5"
							opacity="0.4"
						/>
					</g>
				))}
				<circle r="10" fill="#5b6472" opacity="0.8" />
			</g>
		</svg>
	);
}

// Same three looks every time, cycled over whichever posts are actually
// newest — the art is decorative, not tied to a specific article.
const ARTS: Array<() => ReactNode> = [
	() => <RingsArt />,
	() => <WaveArt />,
	() => <FrostArt />,
];

export function FieldNotes() {
	const posts = postsByDate().slice(0, 3);
	if (posts.length === 0) return null;

	return (
		<section className="border-t py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<ScrollReveal className="mx-auto max-w-2xl text-center">
					<h2 className="text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
						Notes from the field.
					</h2>
					<p className="mt-3 text-muted-foreground sm:text-lg">
						Practical advice on keeping cooling systems efficient and reliable.
					</p>
				</ScrollReveal>

				<div className="mt-12 grid gap-5 md:grid-cols-3">
					{posts.map((post, index) => (
						<ScrollReveal key={post.id} delay={index * 0.08}>
							<NoteCard post={post} art={ARTS[index % ARTS.length]()} />
						</ScrollReveal>
					))}
				</div>
			</div>
		</section>
	);
}

function NoteCard({ post, art }: { post: BlogPost; art: ReactNode }) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug: post.slug }}
			className="group flex h-full flex-col rounded-3xl border border-border bg-card p-3 outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
		>
			<div className="flex-1 px-4 pt-4 pb-6">
				<p className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
					{post.category}
				</p>
				<h3 className="mt-4 text-pretty font-medium text-lg leading-snug tracking-tight transition-colors group-hover:text-primary">
					{post.title}
				</h3>
				<time
					dateTime={postIsoDate(post)}
					className="mt-4 block text-muted-foreground text-sm"
				>
					{formatPostDate(post)}
				</time>
			</div>
			<div className="aspect-[5/3] overflow-hidden rounded-2xl">{art}</div>
		</Link>
	);
}
