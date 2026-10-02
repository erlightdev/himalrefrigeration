import {
	ArrowRight,
	ArrowUpRight,
	Beef,
	Building2,
	CalendarDays,
	ChevronDown,
	FileText,
	Gauge,
	HeartPulse,
	HelpCircle,
	Menu,
	PhoneCall,
	Pill,
	Refrigerator,
	ShieldCheck,
	ShoppingCart,
	Snowflake,
	Sparkles,
	Truck,
	Users,
	Utensils,
	Wind,
	Wrench,
	X,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";

import { currentOrNextOffer, formatOfferWindow } from "@/data/offers";

import { ModeToggle } from "../mode-toggle";

type MegaItem = {
	label: string;
	category: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
	href?: string;
};

type MegaFeature = {
	tag: string;
	title: string;
	description: string;
	image: string;
	href?: string;
};

type MegaMenu = {
	items: MegaItem[];
	feature: MegaFeature;
};

type NavItem = {
	href: string;
	label: string;
	badge?: string;
	mega?: MegaMenu;
};

const nav: NavItem[] = [
	{
		href: "/",
		label: "Discover",
		mega: {
			items: [
				{
					label: "About Us",
					category: "Company & history",
					Icon: Building2,
					href: "/about",
				},
				{
					label: "Our Clients",
					category: "Sector-wise portfolio",
					Icon: ShieldCheck,
					href: "/clients",
				},
				{
					label: "Contact Us",
					category: "Support & inquiries",
					Icon: PhoneCall,
					href: "/contact",
				},
				{
					label: "Our Blog",
					category: "Articles & news",
					Icon: FileText,
					href: "/blog",
				},
				{
					label: "Our Team",
					category: "Certified engineers",
					Icon: Users,
					href: "/team",
				},
				{
					label: "Events & Expos",
					category: "Industry trade shows",
					Icon: CalendarDays,
					href: "/events",
				},
				{
					label: "FAQ",
					category: "Frequently asked questions",
					Icon: HelpCircle,
					href: "/faq",
				},
			],
			feature: {
				tag: "Company",
				title: "Over 25 Years of Excellence",
				description:
					"Founded in 1998, Himal Refrigeration is Nepal’s premier HVAC and commercial cooling partner.",
				image:
					"https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
			},
		},
	},
	{
		href: "/",
		label: "Services",
		mega: {
			items: [
				{
					label: "Cooling Systems",
					category: "Design & install",
					Icon: Snowflake,
				},
				{
					label: "Maintenance Support",
					category: "Service plans",
					Icon: Wrench,
				},
				{ label: "Cold Storage", category: "Industrial", Icon: Building2 },
				{
					label: "Commercial Kitchens",
					category: "Hospitality",
					Icon: Utensils,
				},
				{ label: "HVAC & Ventilation", category: "Air systems", Icon: Wind },
				{ label: "Reefer & Transport", category: "Cold chain", Icon: Truck },
				{ label: "Energy Audits", category: "Optimization", Icon: Gauge },
				{
					label: "Emergency Repair",
					category: "24/7 support",
					Icon: ShieldCheck,
				},
			],
			feature: {
				tag: "New",
				title: "Cold-Chain for Logistics",
				description:
					"End-to-end refrigerated transport solutions — from reefer trucks to last-mile delivery.",
				image:
					"https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800",
			},
		},
	},
	{
		href: "/",
		label: "Products",
		badge: "Catalog",
		mega: {
			items: [
				{
					label: "Industrial Chillers",
					category: "Water & Air Cooled",
					Icon: Snowflake,
				},
				{
					label: "Walk-In Cold Rooms",
					category: "PUF Panel Systems",
					Icon: Building2,
				},
				{
					label: "Commercial Freezers",
					category: "Display & Storage",
					Icon: Refrigerator,
				},
				{
					label: "VRF & Multi-Split ACs",
					category: "HVAC Systems",
					Icon: Wind,
				},
				{
					label: "Condensing Units",
					category: "Bitzer & Copeland",
					Icon: Gauge,
				},
				{
					label: "Refrigerated Trucks",
					category: "Transport Reefers",
					Icon: Truck,
				},
				{
					label: "Evaporator Coils",
					category: "Heat Exchangers",
					Icon: Wrench,
				},
				{
					label: "Spare Parts & Gas",
					category: "R404a, R134a, R410a",
					Icon: ShieldCheck,
				},
			],
			feature: {
				tag: "Showcase",
				title: "High-Efficiency Cold Rooms",
				description:
					"German-engineered PUF insulation panels with digital temperature monitoring for food & pharma.",
				image:
					"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
			},
		},
	},
	{
		href: "/industries",
		label: "Industries",
		mega: {
			items: [
				{
					label: "Restaurants & Cafés",
					category: "Hospitality",
					Icon: Utensils,
					href: "/industries/restaurants-cafes",
				},
				{
					label: "Hotels & Resorts",
					category: "Hospitality",
					Icon: Building2,
					href: "/industries/hotels-resorts",
				},
				{
					label: "Logistics & Reefer",
					category: "Transport",
					Icon: Truck,
					href: "/industries/logistics-reefer",
				},
				{
					label: "Cold Storage",
					category: "Industrial",
					Icon: Snowflake,
					href: "/industries/cold-storage",
				},
				{
					label: "Supermarkets",
					category: "Retail",
					Icon: ShoppingCart,
					href: "/industries/supermarkets",
				},
				{
					label: "Pharmaceuticals",
					category: "Healthcare",
					Icon: Pill,
					href: "/industries/pharmaceuticals",
				},
				{
					label: "Dairy & Meat",
					category: "Food processing",
					Icon: Beef,
					href: "/industries/dairy-meat",
				},
				{
					label: "Hospitals",
					category: "Medical",
					Icon: HeartPulse,
					href: "/industries/hospitals",
				},
			],
			feature: {
				tag: "Guide",
				title: "Built around your industry",
				description:
					"How we approach cooling differently for hospitality, retail, healthcare and industrial sites.",
				image: "/images/industries/hotels-resorts.webp",
				href: "/industries",
			},
		},
	},
	{ href: "/", label: "Case Studies", badge: "Projects" },
];

export default function Header() {
	const [open, setOpen] = useState(false);
	const [banner, setBanner] = useState(true);
	const [scrolled, setScrolled] = useState(false);
	const [hovered, setHovered] = useState<string | null>(null);
	const [expanded, setExpanded] = useState<string | null>(null);
	const currentOffer = currentOrNextOffer();

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className="sticky top-0 z-50">
			{/* Top Announcement Banner */}
			{banner && (
				<div
					className={`grid transition-all duration-300 ease-out ${
						scrolled
							? "grid-rows-[0fr] opacity-0"
							: "grid-rows-[1fr] opacity-100"
					}`}
					aria-hidden={scrolled}
				>
					<div className="relative overflow-hidden bg-primary text-primary-foreground">
						<div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-2 py-2 pr-10 pl-4 text-xs sm:gap-3 sm:px-10 sm:text-sm">
							<Sparkles className="h-4 w-4 shrink-0" strokeWidth={1.75} />
							<p className="min-w-0 truncate">
								<span className="sm:hidden">
									{currentOffer?.occasion ?? "Himal Refrigeration"} — free
									inspection
								</span>
								<span className="hidden sm:inline">
									{currentOffer
										? `${currentOffer.occasion} offer — free system inspection on bookings through ${formatOfferWindow(currentOffer).split(" – ")[1]}.`
										: "Book a service visit with our engineering team."}
								</span>
							</p>
							<a
								href="/offers"
								className="hidden shrink-0 items-center gap-1 font-medium underline-offset-4 hover:underline sm:inline-flex"
							>
								See offer
								<ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
							</a>
						</div>
						<button
							type="button"
							aria-label="Dismiss announcement"
							onClick={() => setBanner(false)}
							className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-primary-foreground/80 transition hover:bg-white/10 hover:text-white sm:right-3"
						>
							<X className="h-4 w-4" strokeWidth={2} />
						</button>
					</div>
				</div>
			)}

			{/* Floating Glass Pill Navbar */}
			<div className="absolute inset-x-0 top-full px-3 pt-3 md:px-6 md:pt-8">
				{/* biome-ignore lint/a11y/noStaticElementInteractions: resets mega menu hover state; wrapper is not interactive */}
				<div
					className="mx-auto w-full max-w-7xl"
					onMouseLeave={() => setHovered(null)}
				>
					<div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200/70 bg-white/80 px-4 py-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.10)] backdrop-blur-xl md:px-6 md:py-2.5 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]">
						<a
							href="/"
							aria-label="Himal Refrigeration"
							className="inline-flex items-center gap-2.5"
						>
							<img
								src="/images/logo.svg"
								alt="Himal Refrigeration"
								className="size-9 object-contain"
							/>
							<span className="font-bold text-foreground text-lg tracking-tight">
								HIMAL REFRIGERATION
							</span>
						</a>

						{/* Desktop Nav */}
						<nav className="hidden items-center gap-1 lg:flex">
							{nav.map((item) => {
								const isActive = hovered === item.label;
								const base =
									"inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-medium text-[15px] text-zinc-800 tracking-tight transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-white";
								if (item.mega) {
									return (
										<button
											key={item.label}
											type="button"
											onMouseEnter={() => setHovered(item.label)}
											onFocus={() => setHovered(item.label)}
											aria-expanded={isActive}
											className={base}
										>
											<span>{item.label}</span>
											{item.badge && (
												<span className="rounded-full bg-primary/10 px-2 py-0.5 font-bold text-[10px] text-primary uppercase tracking-wider dark:bg-primary/20 dark:text-rose-400">
													{item.badge}
												</span>
											)}
											<ChevronDown
												className={`h-4 w-4 transition-transform ${
													isActive ? "rotate-180" : ""
												}`}
												strokeWidth={1.75}
											/>
										</button>
									);
								}
								return (
									<a
										key={item.label}
										href={item.href}
										onMouseEnter={() => setHovered(null)}
										className={base}
									>
										<span>{item.label}</span>
										{item.badge && (
											<span className="rounded-full bg-primary/10 px-2 py-0.5 font-bold text-[10px] text-primary uppercase tracking-wider dark:bg-primary/20 dark:text-rose-400">
												{item.badge}
											</span>
										)}
									</a>
								);
							})}
						</nav>

						<div className="flex items-center gap-2">
							<ModeToggle />
							<a
								href="tel:+9779800000000"
								className="hidden items-center gap-2 rounded-md bg-[#1976d2] px-4 py-2 font-medium text-sm text-white transition hover:brightness-110 active:translate-y-px md:inline-flex dark:bg-[#a81c2a]"
							>
								Book a call
								<ArrowRight className="h-4 w-4" strokeWidth={2} />
							</a>
							<button
								type="button"
								aria-label="Open menu"
								aria-expanded={open}
								onClick={(e) => {
									e.stopPropagation();
									setOpen((v) => !v);
								}}
								className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-zinc-200 text-zinc-700 active:scale-95 lg:hidden dark:border-white/10 dark:text-zinc-300"
							>
								{open ? (
									<X className="h-4 w-4" />
								) : (
									<Menu className="h-4 w-4" />
								)}
							</button>
						</div>
					</div>

					{/* Desktop Mega Dropdowns */}
					{nav.map((item) => {
						if (!item.mega || hovered !== item.label) return null;
						const { items, feature } = item.mega;
						return (
							// biome-ignore lint/a11y/noStaticElementInteractions: keeps the mega menu open while hovering the panel
							<div
								key={item.label}
								className="mx-auto mt-2 hidden w-fit max-w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_25px_60px_-25px_rgba(0,0,0,0.25)] lg:block dark:border-white/10 dark:bg-zinc-950"
								onMouseEnter={() => setHovered(item.label)}
							>
								<div className="grid grid-cols-[minmax(0,560px)_300px] gap-4 p-3">
									<ul className="grid grid-cols-2 gap-0.5">
										{items.map(({ label, category, Icon, href }) => (
											<li key={label}>
												<a
													href={href || "/"}
													className="group flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-zinc-100 dark:hover:bg-white/5"
												>
													<span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
														<Icon className="h-5 w-5" strokeWidth={1.75} />
													</span>
													<span className="flex-1">
														<span className="block font-semibold text-[15px] text-zinc-900 dark:text-zinc-100">
															{label}
														</span>
														<span className="block text-xs text-zinc-500 dark:text-zinc-400">
															{category}
														</span>
													</span>
													<ArrowRight
														className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
														strokeWidth={1.75}
													/>
												</a>
											</li>
										))}
									</ul>

									<a
										href={feature.href || "/"}
										className="group relative overflow-hidden rounded-xl"
									>
										<img
											src={feature.image}
											alt={feature.title}
											className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
										<span className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-zinc-900">
											<ArrowUpRight className="h-4 w-4" strokeWidth={2} />
										</span>
										<div className="absolute right-4 bottom-4 left-4 text-white">
											<span className="inline-block rounded bg-white px-2 py-0.5 font-semibold text-[10px] text-zinc-900 uppercase tracking-wider">
												{feature.tag}
											</span>
											<h4 className="mt-2 font-semibold text-base leading-tight">
												{feature.title}
											</h4>
											<p className="mt-1 text-white/80 text-xs leading-relaxed">
												{feature.description}
											</p>
										</div>
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Mobile Backdrop */}
			<button
				type="button"
				aria-label="Close menu"
				tabIndex={open ? 0 : -1}
				onClick={() => setOpen(false)}
				className={`fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
					open
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
			/>

			{/* Mobile Drawer */}
			<div
				aria-hidden={!open}
				className={`fixed inset-x-3 top-3 z-50 overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-2xl transition duration-200 ease-out lg:hidden dark:border-white/10 dark:bg-zinc-950 ${
					open
						? "pointer-events-auto translate-y-0 opacity-100"
						: "pointer-events-none -translate-y-2 opacity-0"
				}`}
				style={{ maxHeight: "calc(100dvh - 1.5rem)" }}
			>
				<div className="flex items-center justify-between border-zinc-200 border-b px-5 py-4 dark:border-white/10">
					<div className="flex items-center gap-2.5 font-bold text-lg text-zinc-900 dark:text-white">
						<img
							src="/images/logo.svg"
							alt="Himal Refrigeration"
							className="size-8 object-contain"
						/>
						HIMAL REFRIGERATION
					</div>
					<button
						type="button"
						aria-label="Close menu"
						onClick={() => setOpen(false)}
						className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
					>
						<X className="h-4 w-4" strokeWidth={2} />
					</button>
				</div>

				<nav className="flex flex-col divide-y divide-zinc-200 px-5 dark:divide-white/10">
					{nav.map((item, i) => {
						const itemStyle = { transitionDelay: open ? `${i * 30}ms` : "0ms" };
						const baseAnim = `transition-all duration-200 ${
							open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
						}`;
						if (item.mega) {
							const isExpanded = expanded === item.label;
							return (
								<div key={item.label} className={baseAnim} style={itemStyle}>
									<button
										type="button"
										onClick={() =>
											setExpanded((v) => (v === item.label ? null : item.label))
										}
										aria-expanded={isExpanded}
										className="flex w-full items-center justify-between py-4 font-medium text-lg text-zinc-900 dark:text-zinc-100"
									>
										<div className="flex items-center gap-2">
											<span>{item.label}</span>
											{item.badge && (
												<span className="rounded-full bg-primary/10 px-2 py-0.5 font-bold text-[10px] text-primary uppercase tracking-wider dark:bg-primary/20 dark:text-rose-400">
													{item.badge}
												</span>
											)}
										</div>
										<ChevronDown
											className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
												isExpanded ? "rotate-180" : ""
											}`}
											strokeWidth={1.75}
										/>
									</button>
									<div
										className={`grid transition-all duration-200 ${
											isExpanded
												? "grid-rows-[1fr] opacity-100"
												: "grid-rows-[0fr] opacity-0"
										}`}
									>
										<ul className="overflow-hidden">
											{item.mega.items.map(
												({ label, category, Icon, href }) => (
													<li key={label}>
														<a
															href={href || "/"}
															onClick={() => setOpen(false)}
															className="flex items-center gap-3 py-2.5 pl-1"
														>
															<span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
																<Icon className="h-4 w-4" strokeWidth={1.75} />
															</span>
															<span>
																<span className="block font-medium text-[15px] text-zinc-900 dark:text-zinc-100">
																	{label}
																</span>
																<span className="block text-xs text-zinc-500 dark:text-zinc-400">
																	{category}
																</span>
															</span>
														</a>
													</li>
												),
											)}
										</ul>
									</div>
								</div>
							);
						}
						return (
							<a
								key={item.label}
								href={item.href}
								onClick={() => setOpen(false)}
								style={itemStyle}
								className={`flex items-center justify-between py-4 font-medium text-lg text-zinc-900 dark:text-zinc-100 ${baseAnim}`}
							>
								<div className="flex items-center gap-2">
									<span>{item.label}</span>
									{item.badge && (
										<span className="rounded-full bg-primary/10 px-2 py-0.5 font-bold text-[10px] text-primary uppercase tracking-wider dark:bg-primary/20 dark:text-rose-400">
											{item.badge}
										</span>
									)}
								</div>
								<ArrowRight
									className="h-4 w-4 text-zinc-400"
									strokeWidth={1.75}
								/>
							</a>
						);
					})}
				</nav>

				<div className="px-5 pt-4 pb-6">
					<a
						href="tel:+9779800000000"
						onClick={() => setOpen(false)}
						className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground text-sm transition active:translate-y-px"
					>
						Book a call
						<ArrowRight className="h-4 w-4" strokeWidth={2} />
					</a>
				</div>
			</div>
		</header>
	);
}
