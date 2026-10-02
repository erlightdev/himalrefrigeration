import {
	Beef,
	Building2,
	HeartPulse,
	type LucideIcon,
	Pill,
	ShoppingCart,
	Snowflake,
	Truck,
	Utensils,
} from "lucide-react";

export type ProcessStep = { title: string; description: string };
export type Faq = { question: string; answer: string };

export type Industry = {
	slug: string;
	label: string;
	category: string;
	icon: LucideIcon;
	image: string;
	tagline: string;
	summary: string;
	challenges: string[];
	solutions: { title: string; description: string }[];
	equipment: string[];
	process: [ProcessStep, ProcessStep, ProcessStep];
	faqs: [Faq, Faq, Faq];
};

export const INDUSTRIES: Industry[] = [
	{
		slug: "restaurants-cafes",
		label: "Restaurants & Cafés",
		category: "Hospitality",
		icon: Utensils,
		image: "/images/industries/restaurants-cafes.webp",
		tagline: "Kitchens that keep service moving.",
		summary:
			"Commercial kitchen refrigeration sized for real service hours — walk-ins, under-counter units and display chillers that hold temperature through a dinner rush, not just a quiet afternoon.",
		challenges: [
			"Undersized units that can't recover between peak hours",
			"Condensers clogged by kitchen heat and grease",
			"No backup when a single fridge fails mid-service",
		],
		solutions: [
			{
				title: "Right-sized walk-ins",
				description:
					"Load calculated against your actual kitchen, not a generic chart.",
			},
			{
				title: "Scheduled servicing",
				description:
					"Coil cleaning and gas checks timed around your slow hours.",
			},
			{
				title: "Rapid breakdown response",
				description: "A technician dispatched the same day a unit goes down.",
			},
		],
		equipment: [
			"Walk-in coolers & freezers",
			"Under-counter refrigeration",
			"Display chillers",
			"Kitchen ventilation",
		],
		process: [
			{
				title: "Survey the kitchen",
				description:
					"Service volume, layout and heat loss checked before anything is specified.",
			},
			{
				title: "Install around service hours",
				description:
					"Walk-ins and display units fitted with minimal disruption to opening hours.",
			},
			{
				title: "Service on your schedule",
				description:
					"Coil cleaning and gas checks booked around your slow hours, not ours.",
			},
		],
		faqs: [
			{
				question: "Can you install without closing the kitchen?",
				answer:
					"Most installs are scheduled around your slow hours or a planned closure day, so service isn't interrupted.",
			},
			{
				question: "Do you service equipment you didn't install?",
				answer:
					"Yes — we take on AMC contracts for walk-ins and display units already in place, whoever installed them.",
			},
			{
				question: "What happens if a unit fails during dinner service?",
				answer:
					"Emergency callouts are prioritised for active kitchens, with a technician dispatched the same day.",
			},
		],
	},
	{
		slug: "hotels-resorts",
		label: "Hotels & Resorts",
		category: "Hospitality",
		icon: Building2,
		image: "/images/industries/hotels-resorts.webp",
		tagline: "Comfort guests don't have to think about.",
		summary:
			"Whole-building climate control for guest floors, kitchens and function halls — VRF systems that stay quiet in guest rooms and central plants sized for the whole property.",
		challenges: [
			"Guest complaints about noisy or uneven room AC",
			"Central plants running inefficiently outside peak season",
			"Kitchen and laundry refrigeration on a different standard than guest areas",
		],
		solutions: [
			{
				title: "VRF & multi-split systems",
				description: "Quiet, zone-by-zone control across guest floors.",
			},
			{
				title: "Central plant retrofits",
				description:
					"Chiller upgrades and controls that cut off-season running costs.",
			},
			{
				title: "Property-wide AMC",
				description:
					"One maintenance contract covering rooms, kitchens and BOH.",
			},
		],
		equipment: [
			"VRF / VRV systems",
			"Central chillers",
			"Cold rooms & kitchen refrigeration",
			"Laundry & BOH cooling",
		],
		process: [
			{
				title: "Assess the property",
				description:
					"Room count, floor plan and existing plant reviewed before any system is proposed.",
			},
			{
				title: "Install zone by zone",
				description:
					"VRF and central plant work phased so occupied floors stay comfortable throughout.",
			},
			{
				title: "One contract, whole property",
				description:
					"Rooms, kitchens and back-of-house covered under a single maintenance agreement.",
			},
		],
		faqs: [
			{
				question: "Can you retrofit without disrupting guests?",
				answer:
					"Work is phased floor by floor or wing by wing, scheduled around occupancy.",
			},
			{
				question: "Do you cover both guest rooms and back-of-house?",
				answer:
					"Yes — one AMC can cover guest-room VRF, kitchen refrigeration and laundry cooling.",
			},
			{
				question: "What if we're adding rooms or a new wing later?",
				answer:
					"Systems are sized with headroom, and we can extend an existing plant rather than replace it.",
			},
		],
	},
	{
		slug: "logistics-reefer",
		label: "Logistics & Reefer",
		category: "Transport",
		icon: Truck,
		image: "/images/industries/logistics-reefer.webp",
		tagline: "Cold doesn't stop at the warehouse door.",
		summary:
			"Refrigerated transport units and loading-dock cooling that keep the cold chain intact between storage and delivery, with servicing that fits around a fleet's schedule.",
		challenges: [
			"Temperature excursions during loading and transit",
			"Reefer units serviced only after they fail",
			"No visibility into whether a unit held temperature overnight",
		],
		solutions: [
			{
				title: "Transport refrigeration units",
				description: "Installed and commissioned for the vehicle and the load.",
			},
			{
				title: "Dock & loading-bay cooling",
				description: "Keeps the chain unbroken at the point of transfer.",
			},
			{
				title: "Fleet maintenance contracts",
				description:
					"Servicing scheduled around routes, not around breakdowns.",
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
				title: "Audit the fleet",
				description:
					"Vehicle types, routes and load profiles reviewed before specifying units.",
			},
			{
				title: "Fit for the vehicle and the load",
				description:
					"Transport refrigeration units installed and commissioned per vehicle.",
			},
			{
				title: "Maintain around your routes",
				description:
					"Servicing scheduled between runs, not pulled off the road unexpectedly.",
			},
		],
		faqs: [
			{
				question:
					"Can you service vehicles without pulling them off active routes?",
				answer:
					"Maintenance is scheduled around your route calendar so vehicles are only down when planned.",
			},
			{
				question: "Do you monitor temperature during transit?",
				answer:
					"We can fit data loggers so you have a record of whether a load held temperature end to end.",
			},
			{
				question: "What's your response time for a reefer breakdown mid-route?",
				answer:
					"Emergency dispatch is prioritised for loaded vehicles — call the hotline and we triage by cargo risk.",
			},
		],
	},
	{
		slug: "cold-storage",
		label: "Cold Storage",
		category: "Industrial",
		icon: Snowflake,
		image: "/images/projects/frozen-storage.webp",
		tagline: "Built for what can't get warm.",
		summary:
			"Walk-in blast freezers, PUF-panel cold rooms and multi-zone storage, engineered around the product — not a one-size system squeezed to fit.",
		challenges: [
			"Door-open pulses that let temperature drift",
			"Defrost cycles that eat into usable storage time",
			"Facilities outgrowing their original cold room design",
		],
		solutions: [
			{
				title: "PUF panel cold rooms",
				description: "Insulation specified for the product and the climate.",
			},
			{
				title: "Automated defrost cycles",
				description: "Tuned to minimise downtime and temperature swing.",
			},
			{
				title: "24/7 AMC emergency support",
				description: "A technician on call when a facility can't wait.",
			},
		],
		equipment: [
			"Walk-in freezer rooms",
			"Blast freezers",
			"PUF panel insulation",
			"Condensing units",
		],
		process: [
			{
				title: "Calculate the load",
				description:
					"Product type, turnover and climate used to size the room, not a standard chart.",
			},
			{
				title: "Build to spec",
				description:
					"PUF panels, defrost cycles and condensing units installed to the calculated load.",
			},
			{
				title: "24/7 AMC support",
				description:
					"Scheduled servicing plus emergency response for facilities that can't wait.",
			},
		],
		faqs: [
			{
				question: "How do you decide on panel thickness and insulation?",
				answer:
					"It's calculated from your product's required range and the local climate, not a fixed default.",
			},
			{
				question:
					"Can you upgrade an existing cold room instead of rebuilding?",
				answer:
					"Often, yes — insulation, defrost control or condensing units can be retrofitted individually.",
			},
			{
				question: "What's covered under the AMC?",
				answer:
					"Scheduled coil cleaning, gas checks and defrost calibration, plus priority emergency callout.",
			},
		],
	},
	{
		slug: "supermarkets",
		label: "Supermarkets",
		category: "Retail",
		icon: ShoppingCart,
		image: "/images/projects/dairy-display.webp",
		tagline: "Display cases that hold all day.",
		summary:
			"Refrigerated display cases and back-of-store cold rooms designed to run reliably through full trading hours, with servicing that minimises shelf downtime.",
		challenges: [
			"Display cases losing temperature during busy trading hours",
			"Stock loss from a single case failure",
			"Servicing that interrupts the shop floor",
		],
		solutions: [
			{
				title: "Display case installation",
				description: "Sized and sited for the actual footfall and layout.",
			},
			{
				title: "Back-of-store cold rooms",
				description: "Storage that keeps pace with delivery schedules.",
			},
			{
				title: "After-hours servicing",
				description: "Maintenance scheduled outside trading hours.",
			},
		],
		equipment: [
			"Open & glass-door display cases",
			"Back-of-store cold rooms",
			"Condensing units",
			"Temperature alarms",
		],
		process: [
			{
				title: "Walk the floor",
				description:
					"Footfall, layout and delivery schedule reviewed before sizing display cases.",
			},
			{
				title: "Install without closing",
				description:
					"Cases and back-of-store rooms fitted around trading hours.",
			},
			{
				title: "Service after hours",
				description:
					"Maintenance scheduled outside trading hours to avoid shelf downtime.",
			},
		],
		faqs: [
			{
				question: "Can you service display cases without closing the store?",
				answer:
					"Routine servicing is scheduled after hours; only major repairs need a case taken offline during trade.",
			},
			{
				question: "What happens if a display case fails during trading?",
				answer:
					"Emergency callouts are prioritised to limit stock loss, with a technician dispatched the same day.",
			},
			{
				question: "Do you work with our existing refrigeration brand?",
				answer:
					"We service most major display-case and condensing-unit brands, not only equipment we installed.",
			},
		],
	},
	{
		slug: "pharmaceuticals",
		label: "Pharmaceuticals",
		category: "Healthcare",
		icon: Pill,
		image: "/images/industries/pharmaceuticals.webp",
		tagline: "A cold chain that can't drift.",
		summary:
			"Validated cold storage for vaccines and temperature-sensitive medicine, held within a tight range and monitored continuously — not checked once a shift.",
		challenges: [
			"Products requiring a narrow, validated temperature range",
			"No continuous record of temperature for compliance",
			"A single excursion risking an entire batch",
		],
		solutions: [
			{
				title: "Validated cold rooms",
				description: "Built and commissioned to hold a specified range.",
			},
			{
				title: "Continuous monitoring",
				description: "Temperature logged around the clock, not spot-checked.",
			},
			{
				title: "Priority emergency response",
				description: "Fastest dispatch tier for facilities storing medicine.",
			},
		],
		equipment: [
			"Pharmaceutical cold rooms",
			"Vaccine refrigerators",
			"Temperature data loggers",
			"Backup power integration",
		],
		process: [
			{
				title: "Define the range",
				description:
					"Required temperature range and compliance standard confirmed before design.",
			},
			{
				title: "Build and validate",
				description:
					"Cold rooms commissioned and validated to hold the specified range.",
			},
			{
				title: "Monitor continuously",
				description:
					"Temperature logged around the clock, with priority emergency response.",
			},
		],
		faqs: [
			{
				question: "Can you provide validation documentation?",
				answer:
					"Yes — commissioning includes a validation record showing the room holds its specified range.",
			},
			{
				question: "What happens if there's a power cut?",
				answer:
					"We can integrate backup power and alerting so an outage doesn't become a temperature excursion.",
			},
			{
				question: "How fast is your emergency response for medicine storage?",
				answer:
					"Facilities storing medicine sit in our priority dispatch tier, ahead of standard callouts.",
			},
		],
	},
	{
		slug: "dairy-meat",
		label: "Dairy & Meat",
		category: "Food processing",
		icon: Beef,
		image: "/images/industries/dairy-meat.webp",
		tagline: "From intake to dispatch, held cold.",
		summary:
			"Processing-line refrigeration for dairy and meat facilities, from intake chilling through to dispatch — sized for continuous throughput, not intermittent use.",
		challenges: [
			"Intake chilling that can't keep up with delivery volume",
			"Processing areas running warmer than storage",
			"Equipment running continuously with little tolerance for downtime",
		],
		solutions: [
			{
				title: "Intake & processing chillers",
				description: "Matched to throughput, not just storage volume.",
			},
			{
				title: "Dispatch cold rooms",
				description: "Keeps product at temperature until it leaves the dock.",
			},
			{
				title: "Continuous-duty maintenance",
				description: "Servicing planned around a line that rarely stops.",
			},
		],
		equipment: [
			"Processing line chillers",
			"Blast freezers",
			"Dispatch cold rooms",
			"Ammonia & industrial systems",
		],
		process: [
			{
				title: "Map the line",
				description:
					"Intake, processing and dispatch points reviewed against your throughput.",
			},
			{
				title: "Fit for continuous duty",
				description:
					"Chillers and cold rooms sized for a line that runs most of the day.",
			},
			{
				title: "Service around the line",
				description:
					"Maintenance planned around your production schedule, not against it.",
			},
		],
		faqs: [
			{
				question: "Can you service equipment without stopping the line?",
				answer:
					"Maintenance is planned around your production schedule where possible, otherwise during planned downtime.",
			},
			{
				question: "Do you handle ammonia or other industrial refrigerants?",
				answer:
					"Yes — our technicians are trained on ammonia and other industrial systems, not only standard gases.",
			},
			{
				question: "What if intake volume increases seasonally?",
				answer:
					"Systems are sized with your peak volume in mind, not just average throughput.",
			},
		],
	},
	{
		slug: "hospitals",
		label: "Hospitals",
		category: "Medical",
		icon: HeartPulse,
		image: "/images/industries/hospitals.webp",
		tagline: "Critical areas that can't go down.",
		summary:
			"Climate control for operating theatres, wards and pharmacy storage, built around redundancy — because a cooling failure in a hospital isn't just an inconvenience.",
		challenges: [
			"Operating theatres needing precise, stable conditions",
			"No redundancy if a single unit fails",
			"Pharmacy and lab storage held to a stricter standard than wards",
		],
		solutions: [
			{
				title: "Theatre & ward HVAC",
				description: "Precision control where patient safety depends on it.",
			},
			{
				title: "Redundant system design",
				description: "A backup path built in, not added after a failure.",
			},
			{
				title: "24/7 emergency response",
				description:
					"The fastest dispatch tier, for facilities that can't wait.",
			},
		],
		equipment: [
			"Operating theatre HVAC",
			"Pharmacy & lab cold storage",
			"Redundant chiller plant",
			"Backup power integration",
		],
		process: [
			{
				title: "Assess critical areas",
				description:
					"Theatres, wards and pharmacy storage reviewed for the standard each requires.",
			},
			{
				title: "Build in redundancy",
				description:
					"A backup path designed into critical systems from the start, not added after a failure.",
			},
			{
				title: "24/7 emergency response",
				description:
					"The fastest dispatch tier, for facilities that can't be without cooling.",
			},
		],
		faqs: [
			{
				question: "What redundancy do you build into theatre HVAC?",
				answer:
					"A backup unit or circuit is part of the original design, so a single failure doesn't take a theatre offline.",
			},
			{
				question:
					"How is hospital servicing prioritised against other callouts?",
				answer:
					"Hospitals sit in our fastest-response tier, ahead of standard commercial callouts.",
			},
			{
				question: "Can you work around live wards and theatres?",
				answer:
					"Yes — non-critical work is scheduled around ward and theatre usage, agreed with your facilities team beforehand.",
			},
		],
	},
];

export function getIndustry(slug: string) {
	return INDUSTRIES.find((industry) => industry.slug === slug);
}
