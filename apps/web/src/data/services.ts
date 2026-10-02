import {
	Activity,
	AirVent,
	Building,
	Building2,
	CalendarCheck,
	CalendarClock,
	ChefHat,
	ClipboardCheck,
	Clock,
	Cog,
	Cpu,
	Fan,
	FileText,
	Gauge,
	HardHat,
	type LucideIcon,
	PackageCheck,
	Radio,
	Refrigerator,
	Ruler,
	SearchCheck,
	ShieldCheck,
	Siren,
	SlidersHorizontal,
	Snowflake,
	Store,
	Thermometer,
	Timer,
	TrendingDown,
	Truck,
	Utensils,
	Wallet,
	Wind,
	Wrench,
} from "lucide-react";

import type { Faq } from "@/data/industries";

export type ServiceProcessStep = {
	phase: string;
	title: string;
	description: string;
};

export type ServiceStat = { value: number; suffix: string; label: string };

export type ServiceFeature = {
	icon: LucideIcon;
	title: string;
	description: string;
	points: string[];
};

export type Service = {
	slug: string;
	label: string;
	category: string;
	icon: LucideIcon;
	image: string;
	tagline: string;
	summary: string;
	stats: [ServiceStat, ServiceStat, ServiceStat];
	features: [ServiceFeature, ServiceFeature, ServiceFeature, ServiceFeature];
	equipment: string[];
	process: [ServiceProcessStep, ServiceProcessStep, ServiceProcessStep];
	faqs: [Faq, Faq, Faq];
};

export const SERVICES: Service[] = [
	{
		slug: "cooling-systems",
		label: "Cooling Systems",
		category: "Design & install",
		icon: Snowflake,
		image: "/images/projects/condenser-bank.webp",
		tagline: "Sized right, installed once.",
		summary:
			"Commercial refrigeration designed, installed and commissioned around your actual load — not a generic chart.",
		stats: [
			{ value: 200, suffix: "+", label: "Systems installed" },
			{ value: 15, suffix: "yr", label: "Average lifespan" },
			{ value: 48, suffix: "h", label: "Typical install time" },
		],
		features: [
			{
				icon: Ruler,
				points: [
					"Sized to your product and climate",
					"Headroom for peak demand",
					"Assumptions documented",
				],
				title: "Load calculation",
				description: "Sized against your product and climate, with headroom.",
			},
			{
				icon: HardHat,
				points: [
					"Pipework and electrics included",
					"Pressure and leak tested",
					"One accountable crew",
				],
				title: "Turnkey installation",
				description: "Pipework, electrics and commissioning by one team.",
			},
			{
				icon: Cog,
				points: [
					"Bitzer & Danfoss as standard",
					"Copeland compressors",
					"Genuine parts only",
				],
				title: "Premium components",
				description: "Bitzer, Danfoss and Copeland as standard.",
			},
			{
				icon: ClipboardCheck,
				points: [
					"Commissioning data recorded",
					"Set points documented",
					"Warranty pack included",
				],
				title: "Handover documentation",
				description:
					"Commissioning data and set points recorded and handed over.",
			},
		],
		equipment: [
			"Condensing units",
			"Evaporator coils",
			"Display cases",
			"Controls & thermostats",
		],
		process: [
			{
				phase: "Survey",
				title: "Site survey",
				description:
					"Load, layout and existing plant assessed before anything is specified.",
			},
			{
				phase: "Install",
				title: "Install & commission",
				description: "Fitted, piped, charged and tuned to the calculated load.",
			},
			{
				phase: "Support",
				title: "Monitor & support",
				description:
					"Post-install checks and a service plan that keeps it at spec.",
			},
		],
		faqs: [
			{
				question: "How long does a commercial installation take?",
				answer:
					"Most single-system installs complete in two to three days; larger multi-unit projects are phased to keep you operating.",
			},
			{
				question: "Do you handle both design and installation?",
				answer:
					"Yes — one team surveys, specifies, installs and commissions, so nothing is lost between contractor handoffs.",
			},
			{
				question: "Which brands do you work with?",
				answer:
					"We install Bitzer, Danfoss, Copeland, Daikin and Mitsubishi components, matched to your budget and duty.",
			},
		],
	},
	{
		slug: "maintenance-support",
		label: "Maintenance Support",
		category: "Service plans",
		icon: Wrench,
		image: "/images/projects/rooftop-inspection.webp",
		tagline: "No surprises. No downtime.",
		summary:
			"Scheduled servicing that keeps systems at peak efficiency — and catches failures before they happen.",
		stats: [
			{ value: 40, suffix: "%", label: "Fewer breakdowns" },
			{ value: 6, suffix: "+", label: "Visits per year" },
			{ value: 98, suffix: "%", label: "Contract retention" },
		],
		features: [
			{
				icon: CalendarCheck,
				points: [
					"Coil cleaning on a cadence",
					"Gas and filter checks",
					"Around your operating hours",
				],
				title: "Planned visit schedule",
				description:
					"Coil cleaning, gas checks and filters on a fixed calendar.",
			},
			{
				icon: Siren,
				points: [
					"AMC clients jump the queue",
					"Same-day urban response",
					"Direct engineer line",
				],
				title: "Priority dispatch",
				description: "AMC clients jump the queue when something does go wrong.",
			},
			{
				icon: FileText,
				points: [
					"Written system health record",
					"Issues flagged before failure",
					"Photos on every visit",
				],
				title: "Condition reports",
				description: "Every visit leaves a written record of system health.",
			},
			{
				icon: Wallet,
				points: [
					"One predictable contract",
					"No surprise repair bills",
					"Transparent part pricing",
				],
				title: "Fixed annual cost",
				description:
					"One predictable contract instead of unpredictable repairs.",
			},
		],
		equipment: [
			"AMC contracts",
			"Coil & filter service",
			"Gas top-ups",
			"Controls calibration",
		],
		process: [
			{
				phase: "Assess",
				title: "System audit",
				description: "First visit maps every unit, its age and its condition.",
			},
			{
				phase: "Schedule",
				title: "Service calendar",
				description: "Visits scheduled around your operating hours.",
			},
			{
				phase: "Maintain",
				title: "Report & adjust",
				description:
					"Each visit ends with a health report and tuned set points.",
			},
		],
		faqs: [
			{
				question: "What does an AMC cover?",
				answer:
					"Scheduled servicing, gas checks, calibration and priority emergency callout. Parts are quoted transparently when needed.",
			},
			{
				question: "Do you service equipment you didn't install?",
				answer:
					"Yes — we take on maintenance contracts for existing systems of most major brands.",
			},
			{
				question: "Can visits happen outside business hours?",
				answer:
					"Routine servicing is routinely scheduled after hours or around your slow periods.",
			},
		],
	},
	{
		slug: "cold-storage",
		label: "Cold Storage",
		category: "Industrial",
		icon: Building2,
		image: "/images/projects/cold-store-loading.webp",
		tagline: "Built for what can't get warm.",
		summary:
			"Blast freezers, PUF-panel cold rooms and multi-zone storage engineered around the product.",
		stats: [
			{ value: 40, suffix: "ft", label: "Largest rooms built" },
			{ value: 30, suffix: "°C", label: "Blast freeze capability" },
			{ value: 24, suffix: "/7", label: "AMC monitoring" },
		],
		features: [
			{
				icon: Building,
				points: [
					"Thickness per product and climate",
					"Airtight, food-grade finishes",
					"Vapour-sealed joints",
				],
				title: "PUF panel construction",
				description: "Insulation thickness specified per product and climate.",
			},
			{
				icon: Thermometer,
				points: [
					"Chill, freeze and blast zones",
					"Independent set points",
					"One structure, lower cost",
				],
				title: "Multi-zone rooms",
				description: "Chill, freeze and blast zones under one structure.",
			},
			{
				icon: Timer,
				points: [
					"Off-peak defrost cycles",
					"Stock-safe coil temperatures",
					"Shorter defrost windows",
				],
				title: "Automated defrost",
				description: "Cycles tuned to protect stock and uptime.",
			},
			{
				icon: Activity,
				points: [
					"Logged around the clock",
					"Instant excursion alerts",
					"Exportable compliance records",
				],
				title: "Continuous monitoring",
				description: "Temperature logged around the clock with alerting.",
			},
		],
		equipment: [
			"Walk-in freezer rooms",
			"Blast freezers",
			"Condensing units",
			"Data loggers",
		],
		process: [
			{
				phase: "Design",
				title: "Calculate the load",
				description: "Product, turnover and climate drive the room design.",
			},
			{
				phase: "Build",
				title: "Build to spec",
				description:
					"Panels, refrigeration and controls installed to the calculation.",
			},
			{
				phase: "Monitor",
				title: "Validate & monitor",
				description: "Commissioning data recorded, then watched 24/7.",
			},
		],
		faqs: [
			{
				question: "Can you upgrade an existing cold room?",
				answer:
					"Often, yes — insulation, defrost control and condensing units can be retrofitted individually.",
			},
			{
				question: "How is panel thickness decided?",
				answer:
					"From your product's required range and local climate — not a fixed default.",
			},
			{
				question: "What if a room fails overnight?",
				answer:
					"Monitored rooms alert us automatically, and AMC facilities get priority emergency response.",
			},
		],
	},
	{
		slug: "commercial-kitchens",
		label: "Commercial Kitchens",
		category: "Hospitality",
		icon: Utensils,
		image: "/images/services/commercial-kitchens.webp",
		tagline: "Cold that survives the rush.",
		summary:
			"Walk-ins, under-counter units and display chillers that hold temperature through a dinner service.",
		stats: [
			{ value: 120, suffix: "+", label: "Kitchens equipped" },
			{ value: 0, suffix: "h", label: "Service interruption" },
			{ value: 4, suffix: "hr", label: "Emergency response" },
		],
		features: [
			{
				icon: Refrigerator,
				points: [
					"Load matched to service volume",
					"Fast-recovery evaporators",
					"Night blinds included",
				],
				title: "Right-sized walk-ins",
				description: "Load calculated for your real service volume.",
			},
			{
				icon: ChefHat,
				points: [
					"Fits the line, not the reverse",
					"Stainless tops that take pans",
					"Built for tight spaces",
				],
				title: "Under-counter units",
				description: "Line refrigeration that fits the layout and the heat.",
			},
			{
				icon: Store,
				points: [
					"Holds through full trading",
					"LED-lit merchandising",
					"Low-emissivity glass",
				],
				title: "Display chillers",
				description: "Front-of-house cases that hold through full trading.",
			},
			{
				icon: Clock,
				points: [
					"Booked around your slow hours",
					"Zero service interruption",
					"Weekend slots available",
				],
				title: "After-hours servicing",
				description: "Maintenance booked around your slow hours.",
			},
		],
		equipment: [
			"Walk-in coolers",
			"Under-counter refrigeration",
			"Display chillers",
			"Kitchen ventilation",
		],
		process: [
			{
				phase: "Survey",
				title: "Survey the kitchen",
				description: "Service volume and layout checked before specifying.",
			},
			{
				phase: "Install",
				title: "Install around service",
				description: "Fitted with minimal disruption to opening hours.",
			},
			{
				phase: "Support",
				title: "Service on your schedule",
				description: "Maintenance timed around your quiet hours.",
			},
		],
		faqs: [
			{
				question: "Can you install without closing the kitchen?",
				answer:
					"Most installs are scheduled around your slow hours or a planned closure day.",
			},
			{
				question: "What if a fridge fails mid-service?",
				answer:
					"Emergency callouts for active kitchens are prioritised — a technician the same day.",
			},
			{
				question: "Do you cover ventilation too?",
				answer:
					"Yes — kitchen extraction and make-up air can be part of the same contract.",
			},
		],
	},
	{
		slug: "hvac-ventilation",
		label: "HVAC & Ventilation",
		category: "Air systems",
		icon: Wind,
		image: "/images/services/hvac-ventilation.webp",
		tagline: "The right climate in every room.",
		summary:
			"VRF, multi-split and central ventilation — whole-building climate control sized floor by floor.",
		stats: [
			{ value: 60, suffix: "+", label: "Buildings served" },
			{ value: 30, suffix: "%", label: "Energy saved avg" },
			{ value: 12, suffix: "yr", label: "VRF service life" },
		],
		features: [
			{
				icon: Wind,
				points: [
					"Zone-by-zone control",
					"Quiet indoor units",
					"Heat-recovery options",
				],
				title: "VRF & multi-split",
				description: "Zone-by-zone control with quiet indoor units.",
			},
			{
				icon: AirVent,
				points: [
					"Balanced fresh air",
					"Heat-recovery units",
					"Ducting designed, not improvised",
				],
				title: "Central ventilation",
				description: "Fresh-air systems balanced for the whole building.",
			},
			{
				icon: SlidersHorizontal,
				points: [
					"Per-area set points",
					"One interface for the team",
					"BMS-ready",
				],
				title: "Zoned controls",
				description: "Each area its own climate, one interface.",
			},
			{
				icon: Building,
				points: [
					"Phased floor by floor",
					"Occupied floors stay live",
					"As-built documentation",
				],
				title: "Retrofit expertise",
				description: "Upgrades phased so occupied floors stay live.",
			},
		],
		equipment: [
			"VRF / VRV systems",
			"Multi-split ACs",
			"AHU & ducting",
			"BMS integration",
		],
		process: [
			{
				phase: "Assess",
				title: "Assess the building",
				description: "Floor plans, occupancy and heat loads mapped.",
			},
			{
				phase: "Install",
				title: "Zone & install",
				description: "Systems phased floor by floor, ducting and all.",
			},
			{
				phase: "Commission",
				title: "Balance & handover",
				description: "Airflow balanced, controls explained, zones proven.",
			},
		],
		faqs: [
			{
				question: "Can you retrofit an occupied building?",
				answer:
					"Yes — work is phased wing by wing or floor by floor around occupancy.",
			},
			{
				question: "Do you integrate with building management systems?",
				answer:
					"We install BMS-ready controls and can integrate with existing building systems.",
			},
			{
				question: "How often does HVAC need servicing?",
				answer:
					"Twice a year for most commercial systems; kitchens and dusty sites need quarterly attention.",
			},
		],
	},
	{
		slug: "reefer-transport",
		label: "Reefer & Transport",
		category: "Cold chain",
		icon: Truck,
		image: "/images/services/reefer-transport.webp",
		tagline: "Cold doesn't stop at the door.",
		summary:
			"Transport refrigeration installed and serviced for fleets — from reefer trucks to last-mile vans.",
		stats: [
			{ value: 80, suffix: "+", label: "Vehicles fitted" },
			{ value: 100, suffix: "%", label: "Cold-chain hold rate" },
			{ value: 12, suffix: "mo", label: "Service intervals" },
		],
		features: [
			{
				icon: Truck,
				points: [
					"Matched to vehicle and load",
					"Electric standby options",
					"Commissioned per unit",
				],
				title: "TRU installation",
				description: "Units matched to the vehicle and the load.",
			},
			{
				icon: PackageCheck,
				points: [
					"Cold loading bays",
					"Strip curtains and airlocks",
					"Dock-sealed doors",
				],
				title: "Dock cooling",
				description: "Loading bays kept cold at the point of transfer.",
			},
			{
				icon: Radio,
				points: [
					"Trip-by-trip temperature records",
					"Live excursion alerts",
					"Audit-ready exports",
				],
				title: "Data loggers",
				description: "A temperature record for every trip, end to end.",
			},
			{
				icon: CalendarClock,
				points: [
					"Scheduled around routes",
					"Genuine TRU spares",
					"One fleet-wide contract",
				],
				title: "Fleet servicing",
				description: "Maintenance scheduled around routes, not breakdowns.",
			},
		],
		equipment: [
			"Transport refrigeration units",
			"Loading dock coolers",
			"Temperature monitoring",
			"Spare parts & gas",
		],
		process: [
			{
				phase: "Audit",
				title: "Audit the fleet",
				description: "Vehicle types, routes and load profiles reviewed.",
			},
			{
				phase: "Fit",
				title: "Fit & commission",
				description: "Units installed and proven per vehicle.",
			},
			{
				phase: "Maintain",
				title: "Maintain between runs",
				description: "Servicing slotted into the route calendar.",
			},
		],
		faqs: [
			{
				question: "Can vehicles be serviced off-route?",
				answer:
					"Yes — maintenance is scheduled around your route calendar so vehicles are only down when planned.",
			},
			{
				question: "Do you provide temperature records?",
				answer:
					"Fitted data loggers give you a trip-by-trip record of whether a load held temperature.",
			},
			{
				question: "What about a breakdown mid-route?",
				answer:
					"Loaded vehicles are triaged by cargo risk — call the hotline and the nearest technician is dispatched.",
			},
		],
	},
	{
		slug: "energy-audits",
		label: "Energy Audits",
		category: "Optimization",
		icon: Gauge,
		image: "/images/services/energy-audits.webp",
		tagline: "Pay less to stay cold.",
		summary:
			"Metered audits of your cooling plant that find the waste — then fix it with controls, retrofits and tuning.",
		stats: [
			{ value: 30, suffix: "%", label: "Average energy saved" },
			{ value: 18, suffix: "mo", label: "Typical payback" },
			{ value: 45, suffix: "+", label: "Plants audited" },
		],
		features: [
			{
				icon: Cpu,
				points: [
					"Real consumption logged",
					"Full duty cycles captured",
					"Not estimated from bills",
				],
				title: "Metered measurement",
				description: "Real consumption logged, not estimated from bills.",
			},
			{
				icon: SearchCheck,
				points: [
					"Gas leak detection",
					"Door and infiltration losses",
					"Oversized units flagged",
				],
				title: "Leak & load findings",
				description: "Gas leaks, door losses and oversized units identified.",
			},
			{
				icon: SlidersHorizontal,
				points: [
					"Scheduling and set-backs",
					"Floating head pressure",
					"VFDs where they pay back",
				],
				title: "Controls retrofits",
				description:
					"Scheduling, floating head pressure and VFDs where they pay back.",
			},
			{
				icon: TrendingDown,
				points: [
					"Post-fix metering",
					"Before-and-after report",
					"Payback you can see",
				],
				title: "Savings verified",
				description: "Post-fix metering proves the numbers, not a promise.",
			},
		],
		equipment: [
			"Power metering",
			"Thermal imaging",
			"VFD retrofits",
			"Controls upgrades",
		],
		process: [
			{
				phase: "Measure",
				title: "Meter the plant",
				description: "Consumption and duty cycles logged over a full cycle.",
			},
			{
				phase: "Report",
				title: "Report the waste",
				description: "Findings ranked by cost and payback, in plain terms.",
			},
			{
				phase: "Verify",
				title: "Fix & verify",
				description: "Retrofits installed, then re-metered to prove savings.",
			},
		],
		faqs: [
			{
				question: "How long does an audit take?",
				answer:
					"One to two weeks on site including metering, with the report delivered shortly after.",
			},
			{
				question: "Is the audit charged?",
				answer:
					"Audits are quoted up front; the fee is credited against any retrofit work we carry out.",
			},
			{
				question: "What savings are realistic?",
				answer:
					"Most plants find 20–30% through controls and tuning alone; the metering will show you before you commit.",
			},
		],
	},
	{
		slug: "emergency-repair",
		label: "Emergency Repair",
		category: "24/7 support",
		icon: ShieldCheck,
		image: "/images/services/emergency-repair.webp",
		tagline: "Down today. Fixed today.",
		summary:
			"A stocked service fleet and on-call engineers across Nepal — because a failed compressor can't wait until Monday.",
		stats: [
			{ value: 24, suffix: "/7", label: "Hotline coverage" },
			{ value: 4, suffix: "hr", label: "Urban response time" },
			{ value: 92, suffix: "%", label: "Fixed on first visit" },
		],
		features: [
			{
				icon: Siren,
				points: [
					"Triage by cargo risk",
					"Critical sites first",
					"Engineers on call 24/7",
				],
				title: "Same-day dispatch",
				description: "Triage by cargo risk, prioritised for critical sites.",
			},
			{
				icon: PackageCheck,
				points: [
					"Common parts carried",
					"Refrigerant gases on board",
					"Fewer return visits",
				],
				title: "Stocked vans",
				description: "Common parts and gases carried, not ordered.",
			},
			{
				icon: Wrench,
				points: [
					"Not just our installs",
					"Obsolete units handled",
					"Repair-or-replace advice",
				],
				title: "All brands serviced",
				description: "We repair systems we didn't install, too.",
			},
			{
				icon: Fan,
				points: [
					"Portable units deployed",
					"Stock stays safe mid-repair",
					"Sized to the space",
				],
				title: "Temporary cooling",
				description: "Portable units deployed if a longer repair is needed.",
			},
		],
		equipment: [
			"24/7 hotline",
			"Mobile service fleet",
			"Spare parts inventory",
			"Portable cooling",
		],
		process: [
			{
				phase: "Report",
				title: "Call the hotline",
				description:
					"A triage engineer assesses risk and dispatches immediately.",
			},
			{
				phase: "Repair",
				title: "Repair on site",
				description: "First-visit fix rate of 92% from stocked vans.",
			},
			{
				phase: "Review",
				title: "Stabilise & review",
				description: "Temporary cooling if needed, then a follow-up plan.",
			},
		],
		faqs: [
			{
				question: "How fast can you get here?",
				answer:
					"Urban areas typically see a technician within four hours; remote sites are dispatched same day.",
			},
			{
				question: "Do you repair other brands?",
				answer:
					"Yes — our vans carry parts and gases for most major refrigeration brands.",
			},
			{
				question: "What if the part isn't on the van?",
				answer:
					"We source from our Kathmandu inventory overnight and deploy temporary cooling in the meantime.",
			},
		],
	},
];

export function getService(slug: string) {
	return SERVICES.find((service) => service.slug === slug);
}
