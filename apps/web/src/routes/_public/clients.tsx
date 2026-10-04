import { cn } from "@himalref/ui/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
	Briefcase,
	Building2,
	Check,
	Film,
	Globe,
	GraduationCap,
	HeartPulse,
	Landmark,
	type LucideIcon,
	Search,
	ShieldCheck,
} from "lucide-react";
import { type ComponentType, useMemo, useState } from "react";

import { Input } from "@/components/motion/input";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";

export const Route = createFileRoute("/_public/clients")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Our Clients & Sector Portfolio - Himal Refrigeration" },
			{
				content:
					"Explore Himal Refrigeration's sector-wise client portfolio across Hotels, Banks, Embassies, Hospitals, Education, Entertainment & Industrial Giants in Nepal.",
				name: "description",
			},
		],
	}),
});

type ClientItem = {
	name: string;
	location?: string;
	highlight?: boolean;
};

type FeaturedProject = {
	title: string;
	image: string;
	subtitle?: string;
	tags?: string[];
};

type SectorData = {
	id: string;
	title: string;
	tagline: string;
	icon: LucideIcon;
	description: string;
	badge: string;
	featured: FeaturedProject[];
	clients: ClientItem[];
};

const sectors: SectorData[] = [
	{
		id: "hotel",
		title: "Hotel & Hospitality",
		tagline: "5-Star Luxury, Resorts & Boutique Hotels",
		icon: Building2,
		badge: "45+ Projects",
		description:
			"Precision climate control, silent HVAC, and central water chilling for luxury hotels, boutique resorts, and multi-cuisine kitchens across Kathmandu, Pokhara, Chitwan, and Itahari.",
		featured: [
			{
				title: "Hotel Aloft Kathmandu",
				subtitle: "Thamel, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
				tags: ["Central HVAC", "VRF Systems", "Cold Rooms"],
			},
			{
				title: "Hotel Mechi Crown",
				subtitle: "Jhapa, Eastern Nepal",
				image:
					"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
				tags: ["5-Star Resort", "Chiller Plant", "Commercial Kitchen"],
			},
			{
				title: "Hotel Mulberry",
				subtitle: "Thamel, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
				tags: ["Rooftop AC", "Boutique HVAC"],
			},
			{
				title: "Park Village Resort",
				subtitle: "Budhanilkantha, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
				tags: ["Resort Cooling", "Eco VRF"],
			},
		],
		clients: [
			{ name: "Hotel Aloft Kathmandu Thamel", highlight: true },
			{ name: "Hotel Mechi Crown (5-Star)", highlight: true },
			{ name: "Hotel Yak & Yeti", highlight: true },
			{ name: "Radisson Hotel Kathmandu", highlight: true },
			{ name: "Hotel Mulberry Thamel", highlight: true },
			{ name: "Park Village Resort Budhanilkantha", highlight: true },
			{ name: "Kathmandu Guest House Thamel", highlight: true },
			{ name: "Hotel Siraichuli Chitwan", highlight: true },
			{ name: "Da Yatra Courtyard Hotel & Resort Pokhara" },
			{ name: "Hotel Landmark Pokhara" },
			{ name: "Akama Hotel Private Ltd." },
			{ name: "Heritage Hotel Pokhara" },
			{ name: "Hotel Garima Itahari" },
			{ name: "Maya Manor Boutique Hotel" },
			{ name: "The Surya's Heritage Hotel" },
			{ name: "Hotel Diyalo" },
			{ name: "Hotel Vishwa" },
			{ name: "Hotel Rama Inn" },
			{ name: "Buddha Maya Hotel" },
			{ name: "Hotel Happy Hour" },
			{ name: "Hotel Annapurna" },
			{ name: "Hotel Woodland" },
			{ name: "Dalima Caterers & Resorts" },
			{ name: "Nanglo Bakery & Food Outlets" },
		],
	},
	{
		id: "bank",
		title: "Banking & Financial Institutions",
		tagline: "Central Banks, Commercial Banks & Financial Hubs",
		icon: Landmark,
		badge: "30+ Banks",
		description:
			"Uninterrupted 24/7 server room cooling, precision temperature regulation, and branch HVAC installations for Nepal’s major commercial banks and the Central Bank.",
		featured: [
			{
				title: "Nepal Rastra Bank",
				subtitle: "Central Bank HQ, Baluwatar",
				image:
					"https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=800&q=80",
				tags: ["Central Bank", "24/7 Data Center Cooling"],
			},
			{
				title: "Prabhu Bank Headquarters",
				subtitle: "Kathmandu, Nepal",
				image:
					"https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80",
				tags: ["Multi-Floor VRF", "Corporate HVAC"],
			},
			{
				title: "Himalayan Bank Limited",
				subtitle: "Central Corporate Tower",
				image:
					"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
				tags: ["Precision Cooling", "Branch Network"],
			},
			{
				title: "Prime Commercial Bank",
				subtitle: "Kathmandu Branches",
				image:
					"https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
				tags: ["VRF Multi-Split", "Energy Efficient"],
			},
		],
		clients: [
			{ name: "Nepal Rastra Bank (Central Bank)", highlight: true },
			{ name: "Standard Chartered Bank Nepal", highlight: true },
			{ name: "Himalayan Bank Limited", highlight: true },
			{ name: "Nepal Investment Mega Bank (NIMB)", highlight: true },
			{ name: "Prabhu Bank Limited", highlight: true },
			{ name: "Prime Commercial Bank Limited", highlight: true },
			{ name: "NIC Asia Bank Limited", highlight: true },
			{ name: "Nabil Bank Limited", highlight: true },
			{ name: "Everest Bank Limited" },
			{ name: "Nepal SBI Bank" },
			{ name: "Nepal Bangladesh Bank" },
			{ name: "Citizens Bank International" },
			{ name: "Sunrise Bank Limited" },
			{ name: "Kumari Bank Limited" },
			{ name: "Global IME Bank" },
			{ name: "Asian Development Bank (ADB Nepal)" },
			{ name: "Siddhartha Development Bank" },
			{ name: "Synergy Finance Limited" },
			{ name: "Sumeru Saving & Credit Cooperative" },
		],
	},
	{
		id: "health",
		title: "Healthcare & Research Hospitals",
		tagline: "Hospitals, Operation Theatres & Clean Rooms",
		icon: HeartPulse,
		badge: "20+ Hospitals",
		description:
			"HEPA-filtered cleanroom HVAC systems, sterile surgical airflow, and low-temperature morgue and medical refrigeration for top public & private hospitals.",
		featured: [
			{
				title: "Bir Hospital",
				subtitle: "Mahabouddha, Kathmandu",
				image: "/images/clients/bir-hospital.webp",
				tags: ["National Government Hospital", "Surgical HVAC"],
			},
			{
				title: "Paropakar Maternity & Women Hospital",
				subtitle: "Thapathali, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
				tags: ["Maternity Care", "Clean Room Ventilation"],
			},
			{
				title: "Tilganga Institute of Ophthalmology",
				subtitle: "Gaushala, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
				tags: ["Sterile Eye Surgery Rooms", "HEPA Filtration"],
			},
			{
				title: "Norvic International Hospital",
				subtitle: "Thapathali, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
				tags: ["ICU Climate Control", "Precision Air"],
			},
		],
		clients: [
			{ name: "Bir Hospital (Central Block)", highlight: true },
			{ name: "Paropakar Maternity & Women Hospital", highlight: true },
			{ name: "B&C Hospital Birtamod", highlight: true },
			{ name: "Tilganga Institute of Ophthalmology", highlight: true },
			{ name: "Manmohan Cardiovascular Transplant Centre", highlight: true },
			{ name: "Norvic International Hospital", highlight: true },
			{ name: "Bharatpur Hospital Chitwan" },
			{ name: "Sumeru Hospital Lalitpur" },
			{ name: "Sooriya Hospital" },
			{ name: "Ear Care Centre (Impact Nepal)" },
			{ name: "Eastern Regional Eye Care Center" },
			{ name: "Swastik Laser Clinic" },
			{ name: "Kantipur Hospital" },
			{ name: "Pashubibhag Research Lab" },
			{ name: "Spinal Injury Rehabilitation Center, Sanga" },
			{ name: "Lele Hospital" },
		],
	},
	{
		id: "embassy",
		title: "Embassies & International Missions",
		tagline: "Diplomatic Missions, UN Agencies & INGO Headquarters",
		icon: Globe,
		badge: "18+ Missions",
		description:
			"High-security embassy standard HVAC design, strict noise criteria, clean air filtration, and reliable emergency cooling for foreign diplomatic missions and UN facilities.",
		featured: [
			{
				title: "Embassy of Japan",
				subtitle: "Panipokhari, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
				tags: ["Diplomatic Mission", "High-Efficiency VRF"],
			},
			{
				title: "Embassy of the United States",
				subtitle: "Maharajgunj, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
				tags: ["US Diplomatic Complex", "Secure HVAC"],
			},
			{
				title: "Embassy of India",
				subtitle: "Lainchaur, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
				tags: ["Embassy Grounds", "Central Cooling"],
			},
			{
				title: "UNDP UN House",
				subtitle: "Pulchowk, Lalitpur",
				image:
					"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
				tags: ["United Nations", "Eco Friendly Climate"],
			},
		],
		clients: [
			{ name: "Embassy of Japan in Nepal", highlight: true },
			{ name: "Embassy of the United States (US Embassy)", highlight: true },
			{ name: "Embassy of India", highlight: true },
			{
				name: "Embassy of the United Kingdom (British Embassy)",
				highlight: true,
			},
			{ name: "Embassy of Norway", highlight: true },
			{ name: "Embassy of Malaysia" },
			{ name: "Residence of Japanese Ambassador" },
			{ name: "Residence of Thai Ambassador" },
			{ name: "UNDP - UN House Lalitpur", highlight: true },
			{ name: "UNHCR Nepal Regional Office" },
			{ name: "SAARC Secretariat Headquarters" },
			{ name: "ICIMOD Headquarters Pulchowk" },
			{ name: "Melamchi Water Supply Project HQ" },
			{ name: "United Mission to Nepal (UMN)" },
			{ name: "Middle Marsyangdi Hydro Electric Project" },
		],
	},
	{
		id: "education",
		title: "Education & University Campuses",
		tagline: "Universities, Schools & Technical Academies",
		icon: GraduationCap,
		badge: "25+ Educational Hubs",
		description:
			"Quiet, energy-efficient air conditioning for auditoriums, computer science labs, research libraries, and administrative buildings across Nepalese universities and colleges.",
		featured: [
			{
				title: "Kathmandu University (KU)",
				subtitle: "Dhulikhel, Kavre",
				image: "/images/clients/kathmandu-university.webp",
				tags: ["University Campus", "Auditorium & Lab AC"],
			},
			{
				title: "Kathmandu World School",
				subtitle: "Surjabinayak, Bhaktapur",
				image:
					"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
				tags: ["International School", "Central Airing"],
			},
			{
				title: "Little Angels School Complex",
				subtitle: "Hattiban, Lalitpur",
				image:
					"https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
				tags: ["Multi-Block Campus", "Energy Efficient"],
			},
			{
				title: "Himalayan White House College",
				subtitle: "Subidhanagar, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
				tags: ["Higher Education", "VRF Climate"],
			},
		],
		clients: [
			{ name: "Kathmandu University (KU Dhulikhel)", highlight: true },
			{ name: "Kathmandu World School Bhaktapur", highlight: true },
			{ name: "Little Angels School & College Complex", highlight: true },
			{ name: "Himalayan White House College", highlight: true },
			{ name: "Advanced College of Engineering & Management" },
			{ name: "Purwanchal University Science & Technology Campus" },
			{ name: "Kantipur City College (KCC)" },
			{ name: "College of Software Engineering" },
			{ name: "Alpha Beta Institute" },
			{ name: "NIIT Computer Institute" },
			{ name: "Emerald Academy" },
			{ name: "Raniban Gumba Educational Monastery" },
			{ name: "Institution of Info Tech (P) Ltd" },
		],
	},
	{
		id: "corporate",
		title: "Corporate Sectors & Industrial Giants",
		tagline: "Multinational Factories, FMCG, Apartments & Towers",
		icon: Briefcase,
		badge: "60+ Factories & Offices",
		description:
			"Heavy-duty industrial refrigeration, process cooling, central ducting, and luxury apartment air conditioning for Nepal’s leading manufacturers, distilleries, and real estate developers.",
		featured: [
			{
				title: "Surya Nepal Manufacturing",
				subtitle: "Simra, Biratnagar, Kathmandu, Birgunj",
				image:
					"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
				tags: ["Industrial Factory", "Process Cooling"],
			},
			{
				title: "Dharahara Landmark Tower",
				subtitle: "Sundhara, Kathmandu",
				image: "/images/clients/dharahara-tower.webp",
				tags: ["National Heritage Landmark", "HVAC System"],
			},
			{
				title: "Gorkha Department Store Chain",
				subtitle: "Pathari, Damak, Dharan",
				image:
					"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
				tags: ["Retail Superstore", "Central Air Conditioning"],
			},
			{
				title: "Coca-Cola Bottlers Nepal",
				subtitle: "Balaju & Bharatpur Plants",
				image:
					"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
				tags: ["Global Beverage Giant", "Industrial Chillers"],
			},
		],
		clients: [
			{
				name: "Surya Nepal (Simra, Biratnagar, KTM, Birgunj)",
				highlight: true,
			},
			{ name: "Dharahara Landmark Complex", highlight: true },
			{
				name: "Gorkha Department Store (Pathari, Damak, Dharan)",
				highlight: true,
			},
			{ name: "Coca-Cola Bottlers Nepal", highlight: true },
			{ name: "Unilever Nepal Limited", highlight: true },
			{ name: "Shivam Cement & Maruti Cement", highlight: true },
			{ name: "Himal Power Limited (Khimti Hydropower)", highlight: true },
			{
				name: "Rastriya Sabha Griha (SAARC Summit 2014 Venue)",
				highlight: true,
			},
			{ name: "Himalayan Distillery Corporate Building" },
			{ name: "UNOPS Nepal Complete Facilities" },
			{ name: "Sagarmatha Television Network" },
			{ name: "Vijay Distillery" },
			{ name: "Rijal Polytank & MM Plastic" },
			{ name: "Wester Properties & Apartments" },
			{ name: "KL Dugar Showrooms & Apartments" },
			{ name: "Lalitpur Bishal Bazaar Multi Complex" },
			{ name: "Deepak Tiberewal Office Building" },
			{ name: "Raj Bahadur Shah Residence" },
			{ name: "Sahil Agarwal Residence" },
			{ name: "Jhanak Khanal Residence" },
		],
	},
	{
		id: "entertainment",
		title: "Entertainment, Malls & Cinema Chains",
		tagline: "Multiplexes, Shopping Malls & Recreational Hubs",
		icon: Film,
		badge: "15+ Malls & Multiplexes",
		description:
			"High-capacity theater ducting, ultra-quiet noise suppression, and climate management for large crowd gatherings at Nepal’s top QFX cinemas and retail malls.",
		featured: [
			{
				title: "QFX Cinemas Network",
				subtitle: "Chhaya Center, Labim Mall, Bhaktapur",
				image:
					"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
				tags: ["National Cinema Chain", "Acoustic HVAC Ducting"],
			},
			{
				title: "Labim Mall Lalitpur",
				subtitle: "Pulchowk, Lalitpur",
				image:
					"https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
				tags: ["Shopping Mall", "Central VRF System"],
			},
			{
				title: "Eyeplex Mall",
				subtitle: "New Baneshwor, Kathmandu",
				image:
					"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
				tags: ["Multiplex & Retail Hub", "Chiller Units"],
			},
			{
				title: "Chitwan Cineplex",
				subtitle: "Bharatpur, Chitwan",
				image:
					"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
				tags: ["Regional Cineplex", "High CFM Ventilation"],
			},
		],
		clients: [
			{ name: "QFX Cinemas (Chhaya Center Thamel)", highlight: true },
			{ name: "QFX Labim Mall Lalitpur", highlight: true },
			{ name: "QFX Bhaktapur Multiplex", highlight: true },
			{ name: "Labim Mall Commercial Complex", highlight: true },
			{ name: "Eyeplex Mall Baneshwor", highlight: true },
			{ name: "Chitwan Cineplex Bharatpur", highlight: true },
			{ name: "One Cinema Eyeplex", highlight: true },
			{ name: "Redfox Showroom Outlets" },
			{ name: "Damash Jewelers Flagship Store" },
			{ name: "KL Dugar Retail Outlets" },
		],
	},
];

type SectorIconComponent = ComponentType<{ className?: string }>;

function RouteComponent() {
	const [activeTab, setActiveTab] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState<string>("");

	const filteredSectors = useMemo(() => {
		return sectors
			.map((sector) => {
				if (activeTab !== "all" && sector.id !== activeTab) {
					return null;
				}

				if (!searchQuery.trim()) {
					return sector;
				}

				const query = searchQuery.toLowerCase();
				const matchingClients = sector.clients.filter((client) =>
					client.name.toLowerCase().includes(query),
				);
				const matchingFeatured = sector.featured.filter(
					(f) =>
						f.title.toLowerCase().includes(query) ||
						f.subtitle?.toLowerCase().includes(query),
				);

				const matchesSectorMeta =
					sector.title.toLowerCase().includes(query) ||
					sector.tagline.toLowerCase().includes(query);

				if (
					matchesSectorMeta ||
					matchingClients.length > 0 ||
					matchingFeatured.length > 0
				) {
					return {
						...sector,
						clients: matchesSectorMeta ? sector.clients : matchingClients,
					};
				}

				return null;
			})
			.filter((sector): sector is SectorData => sector !== null);
	}, [activeTab, searchQuery]);

	const totalClientsCount = useMemo(
		() => sectors.reduce((acc, sector) => acc + sector.clients.length, 0),
		[],
	);
	const years = new Date().getFullYear() - 1998;

	return (
		<>
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<ShieldCheck className="size-4 text-primary" aria-hidden="true" />
							Clients
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Trusted across <span className="text-primary">every sector</span>.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							Hotels, banks, embassies, hospitals and industry — the
							institutions we keep running.
						</p>

						<dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
							<div className="flex flex-col-reverse bg-background px-5 py-5">
								<dt className="mt-1 text-muted-foreground text-sm">
									Years in HVAC
								</dt>
								<dd className="font-semibold text-2xl tabular-nums tracking-tight sm:text-3xl">
									{years}+
								</dd>
							</div>
							<div className="flex flex-col-reverse bg-background px-5 py-5">
								<dt className="mt-1 text-muted-foreground text-sm">Clients</dt>
								<dd className="font-semibold text-2xl tabular-nums tracking-tight sm:text-3xl">
									{totalClientsCount}+
								</dd>
							</div>
							<div className="flex flex-col-reverse bg-background px-5 py-5">
								<dt className="mt-1 text-muted-foreground text-sm">Sectors</dt>
								<dd className="font-semibold text-2xl tabular-nums tracking-tight sm:text-3xl">
									{sectors.length}
								</dd>
							</div>
						</dl>
					</ScrollReveal>
				</section>

				<div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<Tabs
							variant="pill"
							value={activeTab}
							onValueChange={setActiveTab}
							className="min-w-0"
						>
							<TabsList className="flex-nowrap overflow-x-auto border border-border [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
								<TabsTrigger value="all">All sectors</TabsTrigger>
								{sectors.map((sector) => (
									<TabsTrigger key={sector.id} value={sector.id}>
										{sector.title.split(/[\s,]/)[0]}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<Input
							value={searchQuery}
							onChange={setSearchQuery}
							placeholder="Search client or sector"
							aria-label="Search client or sector"
							leftIcon={<Search className="size-4" />}
							className="w-full md:w-64"
						/>
					</div>

					{filteredSectors.length === 0 ? (
						<div className="mt-10 rounded-2xl border border-border border-dashed p-10 text-center">
							<p className="font-medium">No clients match that</p>
							<p className="mt-1 text-muted-foreground text-sm">
								Try another name or sector.
							</p>
							<button
								type="button"
								onClick={() => {
									setSearchQuery("");
									setActiveTab("all");
								}}
								className="mt-4 text-primary text-sm underline-offset-4 hover:underline"
							>
								Clear filters
							</button>
						</div>
					) : (
						<div className="mt-10 space-y-16">
							{filteredSectors.map((sector) => {
								const SectorIcon: SectorIconComponent = sector.icon;
								return (
									<section
										key={sector.id}
										id={sector.id}
										aria-labelledby={`${sector.id}-heading`}
										className="scroll-mt-28"
									>
										<div className="flex flex-col justify-between gap-3 border-border border-b pb-6 sm:flex-row sm:items-end">
											<div className="flex items-start gap-3">
												<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
													<SectorIcon className="size-5" aria-hidden="true" />
												</span>
												<div>
													<h2
														id={`${sector.id}-heading`}
														className="font-semibold text-xl tracking-tight"
													>
														{sector.title}
													</h2>
													<p className="mt-0.5 text-primary text-sm">
														{sector.tagline}
													</p>
												</div>
											</div>
											<p className="max-w-md text-muted-foreground text-sm leading-relaxed">
												{sector.description}
											</p>
										</div>

										{sector.featured.length > 0 ? (
											<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
												{sector.featured.map((item) => (
													<ScrollReveal
														key={item.title}
														className="group overflow-hidden rounded-2xl border border-border bg-card"
													>
														<div className="relative aspect-[4/3] overflow-hidden bg-muted">
															<img
																src={item.image}
																alt=""
																loading="lazy"
																className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
															/>
															<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
															{item.subtitle ? (
																<span className="absolute bottom-2.5 left-3 font-medium text-white/90 text-xs">
																	{item.subtitle}
																</span>
															) : null}
														</div>
														<div className="p-4">
															<p className="line-clamp-1 font-medium text-sm">
																{item.title}
															</p>
															{item.tags ? (
																<div className="mt-2 flex flex-wrap gap-1.5">
																	{item.tags.map((tag) => (
																		<span
																			key={tag}
																			className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground text-xs"
																		>
																			{tag}
																		</span>
																	))}
																</div>
															) : null}
														</div>
													</ScrollReveal>
												))}
											</div>
										) : null}

										<div className="mt-8 flex flex-wrap gap-2">
											{sector.clients.map((client) => (
												<span
													key={client.name}
													className={cn(
														"inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm",
														client.highlight
															? "border-primary/30 bg-accent text-accent-foreground"
															: "border-border text-muted-foreground",
													)}
												>
													{client.highlight ? (
														<Check
															className="size-3.5 shrink-0 text-primary"
															aria-hidden="true"
														/>
													) : null}
													{client.name}
												</span>
											))}
										</div>
									</section>
								);
							})}
						</div>
					)}
				</div>
			</>
	);
}
