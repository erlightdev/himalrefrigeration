import type { ReactNode } from "react";

/** One settings row: a short explanation on the left, the control on the right. */
export function SettingsSection({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: ReactNode;
}) {
	return (
		<section className="grid gap-4 border-border border-b py-8 first:pt-2 last:border-b-0 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10">
			<div>
				<h2 className="font-medium text-sm">{title}</h2>
				{description ? (
					<p className="mt-1 text-muted-foreground text-sm leading-relaxed">
						{description}
					</p>
				) : null}
			</div>
			<div className="min-w-0 max-w-md">{children}</div>
		</section>
	);
}
