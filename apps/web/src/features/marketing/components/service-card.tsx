import { cn } from "@himalref/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface ServiceCardProps {
	to: string;
	params?: Record<string, string>;
	label: string;
	tagline?: string;
	image: string;
	icon?: LucideIcon;
	/** Tailwind aspect utility for the card frame. */
	aspect?: string;
	loading?: "eager" | "lazy";
	className?: string;
}

/**
 * Full-bleed image link card with a gradient scrim, glass icon chip and an
 * arrow button that fills with the primary colour on hover — shared by the
 * services and industries grids.
 */
export function ServiceCard({
	to,
	params,
	label,
	tagline,
	image,
	icon: Icon,
	aspect = "aspect-[4/5]",
	loading = "lazy",
	className,
}: ServiceCardProps) {
	return (
		<Link
			to={to}
			params={params}
			className={cn(
				"group relative block overflow-hidden rounded-3xl bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				aspect,
				className,
			)}
		>
			<img
				src={image}
				alt=""
				loading={loading}
				className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-zinc-950/5 transition-colors duration-300 group-hover:from-zinc-950/90 group-hover:via-zinc-950/35"
			/>

			{Icon ? (
				<span className="absolute top-4 left-4 grid size-10 place-items-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-md">
					<Icon className="size-4.5" aria-hidden="true" />
				</span>
			) : null}

			<span className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-white text-zinc-950 transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
				<ArrowRight
					className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
					aria-hidden="true"
				/>
			</span>

			<div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 group-hover:-translate-y-0.5">
				<p className="font-medium text-lg text-white tracking-tight">{label}</p>
				{tagline ? (
					<p className="mt-0.5 line-clamp-2 text-sm text-white/75">
						{tagline}
					</p>
				) : null}
			</div>
		</Link>
	);
}
