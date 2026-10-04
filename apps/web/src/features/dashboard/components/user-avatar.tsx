import { cn } from "@himalref/ui/lib/utils";

export function initials(name: string) {
	return (
		name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.slice(0, 2)
			.toUpperCase() || "?"
	);
}

export function UserAvatar({
	name,
	image,
	className,
	tone = "primary",
}: {
	name: string;
	image?: string | null;
	className?: string;
	tone?: "primary" | "muted";
}) {
	if (image) {
		return (
			<img
				src={image}
				alt=""
				className={cn("size-8 shrink-0 rounded-full object-cover", className)}
			/>
		);
	}
	return (
		<span
			aria-hidden="true"
			className={cn(
				"grid size-8 shrink-0 place-items-center rounded-full font-semibold text-[11px]",
				tone === "primary"
					? "bg-primary text-primary-foreground"
					: "bg-muted text-muted-foreground",
				className,
			)}
		>
			{initials(name)}
		</span>
	);
}
