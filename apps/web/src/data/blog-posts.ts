export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	category:
		| "Energy Efficiency"
		| "Cold Storage"
		| "Indoor Air Quality"
		| "Maintenance"
		| "Product Showcase";
	readTime: string;
	date: string;
	author: string;
	image: string;
	excerpt: string;
	body: string[];
	featured?: boolean;
	topRead?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
	{
		id: "1",
		slug: "hvac-energy-optimization-guide",
		title:
			"HVAC Energy Optimization Guide: Cutting Power Costs by Up to 30% in Nepal",
		category: "Energy Efficiency",
		readTime: "5 min read",
		date: "Jul 15, 2024",
		author: "Himal Refrigeration",
		image:
			"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
		excerpt:
			"Discover practical strategies for commercial VRF systems and cold storage facilities to maintain optimal thermal setpoints while significantly lowering monthly electricity bills in Nepal.",
		body: [
			"Commercial HVAC systems are among the largest consumers of electricity in Nepalese office towers, hotels, and manufacturing plants. Across our 200+ completed installations, we consistently find that a handful of optimization measures cut cooling-related power costs by 20–30% without sacrificing comfort.",
			"Start with setpoint discipline. Every degree below 24°C adds roughly 6–8% to compressor energy draw. Program thermostats to 24–26°C during occupied hours and allow modest setbacks overnight. In VRF systems, zone-level scheduling prevents conditioning empty floors.",
			"Next, keep heat exchangers clean. Fouled condenser coils force compressors to work harder and are the single most common cause of rising bills we see during AMC inspections. Quarterly coil cleaning and annual refrigerant charge verification keep systems at design efficiency.",
			"Finally, invest in inverter technology. Daikin VRF and inverter split systems modulate compressor speed to match the actual heat load, eliminating the on/off cycling losses of fixed-speed units. For most commercial retrofits we see payback periods of two to four years on electricity savings alone.",
		],
		featured: true,
	},
	{
		id: "2",
		slug: "selecting-right-cold-storage-puf-panels",
		title:
			"Selecting the Right Cold Storage & Walk-In Freezer Panels for Food & Pharma",
		category: "Cold Storage",
		readTime: "7 min read",
		date: "Jun 28, 2024",
		author: "Himal Refrigeration",
		image:
			"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
		excerpt:
			"An in-depth look at PUF panel thickness, thermal conductivity, digital temperature telemetry, and Bitzer condensing units for uncompromised food and pharmaceutical cold chain safety.",
		body: [
			"The insulation panel is the backbone of any cold room. PUF (polyurethane) panels are specified by thickness: 80mm is standard for chillers operating at 0 to +8°C, while blast freezers and deep-frozen storage at -18°C and below require 100–150mm to control conductive losses.",
			"Panel quality matters as much as thickness. Look for CFC-free PUF with a closed-cell content above 90% and cam-lock joints that eliminate thermal bridging. Poorly manufactured panels absorb moisture over time, degrading insulation value and driving up defrost cycles.",
			"Pair the envelope with right-sized machinery. Bitzer semi-hermetic condensing units remain our default for Nepalese cold rooms because of their service life and spare-part availability nationwide. Size evaporators for the peak load — including door-open pulses during loading — not just the steady-state load.",
			"For pharmaceutical storage, add continuous temperature logging with SMS alerts, dual redundant refrigeration circuits, and WHO-compliant mapping studies. Himal specializes in turnkey pharma cold rooms built to these standards.",
		],
		topRead: true,
	},
	{
		id: "3",
		slug: "air-quality-ventilation-guidelines-ac",
		title: "Air Quality & Ventilation Guidelines for Commercial AC Systems",
		category: "Indoor Air Quality",
		readTime: "4 min read",
		date: "May 12, 2024",
		author: "Himal Refrigeration",
		image:
			"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
		excerpt:
			"Best practices for fresh air intake, HEPA filtration, relative humidity control (40%-70%), and routine filter servicing in office towers, restaurants, and medical centers.",
		body: [
			"Room air conditioning recirculates indoor air, so a dedicated fresh-air strategy is essential. For offices and public buildings, run kitchen and toilet exhaust fans and open windows periodically to maintain air exchange while holding relative humidity between 40% and 70%.",
			"Filtration should match the space. MERV-8 filters are adequate for commercial offices; hospitals and cleanrooms need HEPA-terminal or fan-filter units with scheduled differential-pressure monitoring. Replace filters at least every three months — sooner during the dusty pre-monsoon season.",
			"Finally, keep condensate systems healthy. Clogged drain lines are the leading cause of humidity problems and microbial growth inside AHUs. Quarterly flushing and biocide treatment keep the system dry and odor-free.",
		],
		topRead: true,
	},
	{
		id: "4",
		slug: "monsoon-hvac-maintenance-checklist",
		title:
			"Monsoon & Seasonal HVAC Maintenance Checklist for Nepalese Businesses",
		category: "Maintenance",
		readTime: "6 min read",
		date: "Apr 05, 2024",
		author: "Himal Refrigeration",
		image:
			"https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
		excerpt:
			"Essential pre-season maintenance steps: gas pressure checks, coil cleaning, drain line flushing, and compressor diagnostic protocols to prevent unexpected operational downtime.",
		body: [
			"Nepal's monsoon is the hardest season on cooling equipment: high humidity loads the coils, voltage fluctuation stresses compressors, and lightning-related surges trip PCBs. A pre-season checklist prevents most emergency breakdown calls we receive between June and August.",
			"Check refrigerant pressures against nameplate values and inspect for oil traces at flare joints — a slow leak found early costs a top-up, found late it costs a compressor. Clean both condenser and evaporator coils and verify full drainage from every drain pan.",
			"Electrically, tighten terminals, test contactors for pitting, and confirm voltage within ±10% of rated supply. For critical facilities, install surge protection and phase-failure relays before the first storm.",
			"An Annual Maintenance Contract (AMC) schedules all of this automatically and guarantees priority dispatch when something does fail. Himal holds OEM spare parts for Daikin, Bitzer, Danfoss, and Copeland systems across all seven provinces.",
		],
		topRead: true,
	},
	{
		id: "5",
		slug: "daikin-inverter-vs-conventional-ac",
		title:
			"Daikin Inverter Technology vs. Conventional ACs: Long-Term ROI Analysis",
		category: "Product Showcase",
		readTime: "5 min read",
		date: "Mar 20, 2024",
		author: "Himal Refrigeration",
		image:
			"https://images.unsplash.com/photo-1527016016190-50d3e9844183?auto=format&fit=crop&w=1200&q=80",
		excerpt:
			"How Daikin variable-refrigerant inverter technology dynamically adapts to fluctuating heat loads, providing stable room temperature control with up to 40% reduced compressor wear.",
		body: [
			"Conventional fixed-speed ACs behave like a light switch: full power until the setpoint is reached, then off, then full power again. Each start draws a surge current and mechanically stresses the compressor. Inverter systems instead ramp smoothly, holding temperature within a fraction of a degree.",
			"The savings compound. In load profiles typical of Kathmandu offices — high midday occupancy, partial evenings — inverter units consume 30–40% less energy at partial load. R32 refrigerant models add lower global-warming potential and improved heat-exchange efficiency.",
			"ROI improves further with Nepalese tariffs. At commercial rates, a 5-ton inverter replacement running 10 hours a day typically pays back its price premium in under three years, then keeps saving for a service life that regularly exceeds a decade with proper AMC care.",
		],
	},
	{
		id: "6",
		slug: "smart-temperature-monitoring-cold-rooms",
		title:
			"Smart IoT Temperature Monitoring for Commercial Cold Rooms in Nepal",
		category: "Cold Storage",
		readTime: "5 min read",
		date: "Feb 14, 2024",
		author: "Himal Refrigeration",
		image:
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
		excerpt:
			"How real-time sensor telemetry and mobile alert triggers prevent stock spoilage in pharmaceuticals, dairy processing, and supermarket chain displays.",
		body: [
			"A single night of undetected freezer failure can destroy inventory worth more than the cold room itself. IoT telemetry closes that gap: wireless sensors log temperature continuously and push SMS or app alerts the moment a reading drifts outside its band.",
			"Deployment is straightforward. Battery-powered sensors mount inside chambers and relay through a gateway to the cloud, so retrofitting an existing cold room takes hours without downtime. Dashboards expose trends that also help tune defrost cycles and door-discipline issues.",
			"For pharma clients, digital logs satisfy WHO and ISO audit requirements automatically — no manual chart recorders. For supermarket chains, multi-site dashboards let one maintenance head watch every display cabinet in the country in real time.",
		],
	},
];

export const BLOG_CATEGORIES = [
	"All",
	"Energy Efficiency",
	"Cold Storage",
	"Indoor Air Quality",
	"Maintenance",
	"Product Showcase",
] as const;

const parse = (post: BlogPost) => new Date(post.date);

const dateFormat = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

export function formatPostDate(post: BlogPost) {
	return dateFormat.format(parse(post));
}

/** Newest first. */
export function postsByDate() {
	return [...BLOG_POSTS].sort((a, b) => +parse(b) - +parse(a));
}

/** YYYY-MM-DD in local time, for <time dateTime>. */
export function postIsoDate(post: BlogPost) {
	const d = parse(post);
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
