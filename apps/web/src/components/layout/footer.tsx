import { ArrowUpRight, ChevronRight } from "lucide-react";

import { INDUSTRIES } from "@/data/industries";
import { PROJECT_CATEGORIES } from "@/data/projects";

const socials = [
	{
		label: "Facebook",
		href: "/",
		path: "M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
	},
	{
		label: "Instagram",
		href: "/",
		path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Zm5.7-7.6a1 1 0 1 1-2.1 0 1 1 0 0 1 2.1 0Z",
	},
	{
		label: "X",
		href: "/",
		path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.664l-5.214-6.817-5.97 6.817H1.67l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z",
	},
	{
		label: "LinkedIn",
		href: "/",
		path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.9-2 3.9-2 4.2 0 5 2.7 5 6.3V21h-4v-4.8c0-1.1 0-2.6-1.6-2.6s-1.8 1.3-1.8 2.5V21h-4V9.5Z",
	},
	{
		label: "YouTube",
		href: "/",
		path: "M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C.1 8.4.1 12 .1 12s0 3.6.4 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-5.5.4-5.5s0-3.6-.4-5.5ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z",
	},
];

const columns = [
	{
		label: "Industries",
		links: ["All Industries", ...INDUSTRIES.map((industry) => industry.label)],
	},
	{
		label: "Projects",
		links: [
			"All Projects",
			...PROJECT_CATEGORIES.map((category) => category.label),
		],
	},
	{
		label: "Support",
		links: ["Get a Quote", "Help Center", "Team"],
	},
	{
		label: "Resources",
		links: ["Our Blog", "Case Studies", "Offers"],
	},
	{
		label: "Company",
		links: ["About Us", "Careers", "Events", "Partners"],
	},
];

const linkHrefs: Record<string, string> = {
	"About Us": "/about",
	Careers: "/careers",
	"Our Blog": "/blog",
	"Get a Quote": "/contact",
	"Help Center": "/faq",
	Team: "/team",
	Events: "/events",
	"Case Studies": "/clients",
	Offers: "/offers",
	"All Industries": "/industries",
	"All Projects": "/projects",
	...Object.fromEntries(
		INDUSTRIES.map((industry) => [
			industry.label,
			`/industries/${industry.slug}`,
		]),
	),
	...Object.fromEntries(
		PROJECT_CATEGORIES.map((category) => [
			category.label,
			`/projects/${category.slug}`,
		]),
	),
};

export default function Footer() {
	return (
		<div className="dark">
			<footer className="relative isolate overflow-hidden bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_95%,rgba(25,118,210,0.10),transparent_55%),radial-gradient(circle_at_15%_0%,rgba(25,118,210,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_85%_95%,rgba(226,10,23,0.35),transparent_55%),radial-gradient(circle_at_15%_0%,rgba(120,60,20,0.25),transparent_60%)]"
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]"
				/>

				<div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-10 md:px-10 xl:max-w-[88rem] xl:px-12">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
						<div>
							<h2 className="text-balance font-light text-4xl text-zinc-900 leading-[1.05] tracking-tight md:text-5xl xl:text-[3.5rem] dark:text-zinc-100">
								Speak with our{" "}
								<span className="inline-flex -space-x-2 align-middle">
									{[
										"https://i.pravatar.cc/64?img=12",
										"https://i.pravatar.cc/64?img=33",
										"https://i.pravatar.cc/64?img=51",
									].map((src) => (
										<img
											key={src}
											src={src}
											alt="Engineer"
											className="h-9 w-9 rounded-full border-2 border-white object-cover md:h-11 md:w-11 dark:border-zinc-950"
										/>
									))}
								</span>{" "}
								engineers
								<br />
								about your refrigeration setup.
							</h2>
							<p className="mt-6 max-w-md text-pretty text-sm text-zinc-600 leading-relaxed xl:max-w-lg xl:text-base dark:text-zinc-400">
								Let's talk about how we can design a cooling system that runs
								quietly, lasts longer, and keeps your operating costs
								predictable.
							</p>
						</div>

						<div className="flex flex-col gap-4">
							{[
								{
									title: "Installation",
									body: "Turnkey design, sizing, and on-site commissioning for new builds.",
								},
								{
									title: "Maintenance",
									body: "Scheduled servicing and 24/7 emergency response across Nepal.",
								},
							].map((item) => (
								<a
									key={item.title}
									href="/"
									className="group flex items-start justify-between gap-6 rounded-2xl border border-zinc-200 bg-white/60 p-6 transition hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.04]"
								>
									<div>
										<h3 className="font-medium text-base text-zinc-900 dark:text-zinc-100">
											{item.title}
										</h3>
										<p className="mt-2 max-w-[28ch] text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
											{item.body}
										</p>
									</div>
									<span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-zinc-300 text-zinc-600 transition group-hover:-rotate-12 group-hover:border-primary group-hover:text-primary dark:border-white/15 dark:text-zinc-300 dark:group-hover:border-primary dark:group-hover:text-primary">
										<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
									</span>
								</a>
							))}
						</div>
					</div>

					<div className="mt-24 grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-5 xl:gap-x-12">
						{columns.map((col) => (
							<div key={col.label}>
								<div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider xl:text-[13px] dark:text-zinc-500">
									<span className="text-zinc-400 dark:text-zinc-600">
										{"//"}
									</span>
									{col.label}
								</div>
								<ul className="mt-5 flex flex-col items-start gap-2 xl:mt-6 xl:gap-2.5">
									{col.links.map((link) => (
										<li key={link}>
											<a
												href={linkHrefs[link] ?? "/"}
												className="group inline-flex items-center gap-1.5 rounded-md border border-transparent bg-transparent py-1.5 pr-2 pl-3 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950 active:border-zinc-400 active:bg-white xl:py-2 xl:pr-2.5 xl:pl-3.5 xl:text-[15px] dark:text-zinc-200 dark:active:border-white/30 dark:active:bg-white/[0.08] dark:hover:border-white/20 dark:hover:bg-white/[0.06] dark:hover:text-white"
											>
												{link}
												<ChevronRight
													className="h-3.5 w-3.5 text-zinc-400 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-active:opacity-100 dark:text-zinc-500"
													strokeWidth={2}
												/>
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="mt-16 h-px w-full bg-zinc-200 dark:bg-white/10" />

					<div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
						<a
							href="/"
							className="inline-flex items-center"
							aria-label="Himal Refrigeration & Electrical Industries Pvt. Ltd."
						>
							<img
								src="/images/footer-logo.svg"
								alt="Himal Refrigeration & Electrical Industries Pvt. Ltd."
								className="h-10 w-auto object-contain md:h-12"
							/>
						</a>
						<div className="flex flex-wrap items-center gap-2">
							{socials.map(({ label, href, path }) => (
								<a
									key={label}
									href={href}
									aria-label={label}
									className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 active:translate-y-px dark:border-white/10 dark:bg-white/2 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:bg-white/6 dark:hover:text-zinc-100"
								>
									<span className="sr-only">{label}</span>
									<svg
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-4 w-4"
										role="img"
										aria-label={label}
									>
										<title>{label}</title>
										<path d={path} />
									</svg>
								</a>
							))}
						</div>
					</div>

					<div className="mt-8 flex flex-col items-start justify-between gap-4 border-zinc-200 border-t pt-6 text-xs text-zinc-500 md:flex-row md:items-center xl:text-[13px] dark:border-white/10">
						<span>
							© {new Date().getFullYear()} Himal Refrigeration. Crafted in
							Kathmandu.
						</span>
						<div className="flex items-center gap-8">
							<a
								href="/privacy"
								className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
							>
								Privacy Policy
							</a>
							<a
								href="/terms"
								className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
							>
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
