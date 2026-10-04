export interface ProjectCardProps {
	name: string;
	image: string;
	loading?: "eager" | "lazy";
}

/**
 * Static image tile for a completed project site — same visual language as
 * ServiceCard (gradient scrim, caption) but not a link, since there's no
 * per-project detail page.
 */
export function ProjectCard({
	name,
	image,
	loading = "lazy",
}: ProjectCardProps) {
	return (
		<figure className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
			<img
				src={image}
				alt={name}
				loading={loading}
				className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-zinc-950/5"
			/>
			<figcaption className="absolute inset-x-0 bottom-0 p-5">
				<p className="font-medium text-lg text-white tracking-tight">{name}</p>
			</figcaption>
		</figure>
	);
}
