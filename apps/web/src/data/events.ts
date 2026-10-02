export type EventType = "Expo" | "Seminar" | "Launch";

export interface EventItem {
	id: string;
	slug: string;
	title: string;
	type: EventType;
	/** ISO dates (YYYY-MM-DD). Upcoming vs past is derived from these. */
	start: string;
	end?: string;
	time: string;
	location: string;
	venue: string;
	image: string;
	description: string;
	about: string[];
	highlights: string[];
	featured?: boolean;
}

export const EVENTS: EventItem[] = [
	{
		id: "ev-1",
		slug: "nepal-international-hvac-cold-chain-expo-2024",
		title: "Nepal International HVAC & Cold Chain Expo 2024",
		type: "Expo",
		start: "2024-11-18",
		end: "2024-11-20",
		time: "10:00 AM - 6:00 PM",
		location: "Kathmandu, Nepal",
		venue: "Bhrikuti Mandap Exhibition Hall, Stall #A12",
		image:
			"https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
		description:
			"Join Himal Refrigeration at Nepal’s premier HVAC trade show! Experience live demonstrations of Daikin VRF technology, smart IoT cold room telemetry, and energy-saving industrial chillers.",
		about: [
			"The Nepal International HVAC & Cold Chain Expo is the country's largest gathering of refrigeration and air-conditioning professionals, and Himal Refrigeration has exhibited every year since its inception. Our stall brings together the full breadth of our engineering portfolio under one roof.",
			"Visitors can watch a live Daikin VRF inverter system modulate in real time, explore a working model of our IoT cold-room telemetry dashboard, and quiz our senior engineers on heat-load calculations for their own facilities — free of charge, no appointment needed.",
			"Whether you are a hotel developer planning a central plant, a food processor sizing a blast freezer, or a facility manager comparing AMC contracts, stall #A12 is the place to pressure-test your plans against 25+ years of field experience.",
		],
		highlights: [
			"Live Daikin VRF Inverter Demo",
			"Bitzer & Copeland Condensing Units Display",
			"1-on-1 Consultations with Senior Engineers",
		],
		featured: true,
	},
	{
		id: "ev-2",
		slug: "commercial-cold-storage-puf-insulation-workshop",
		title: "Commercial Cold Storage & PUF Insulation Workshop",
		type: "Seminar",
		start: "2024-12-05",
		time: "11:00 AM - 3:00 PM",
		location: "Lalitpur, Nepal",
		venue: "Himal Training Center, Sanepa Headquarters",
		image:
			"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
		description:
			"Exclusive technical seminar for food processors, pharmaceutical managers, and commercial hotel developers on optimizing walk-in freezer thermal efficiency and AMC maintenance.",
		about: [
			"This half-day workshop at our Sanepa training center is built for the people who own cold-chain outcomes: food-processing plant managers, pharmaceutical warehouse leads, and hotel engineering heads.",
			"Sessions cover PUF panel specification (thickness, closed-cell content, cam-lock joints), defrost-cycle automation, evaporator sizing for door-open pulses, and the maintenance schedule that keeps thermal efficiency from quietly eroding between AMC visits.",
			"Attendance is capped to keep the walkthrough of our live training cold room hands-on. Every participant receives Himal's free technical handbook covering inspection checklists and commissioning baselines.",
		],
		highlights: [
			"PUF Panel Insulation Standards",
			"Defrost Cycle Automation",
			"Free Technical Handbook",
		],
	},
	{
		id: "ev-3",
		slug: "daikin-next-gen-inverter-vrv-system-launch",
		title: "Daikin Next-Gen Inverter VRV System Launch",
		type: "Launch",
		start: "2025-01-15",
		time: "2:00 PM - 5:00 PM",
		location: "Kathmandu, Nepal",
		venue: "Soaltee Hotel Grand Ballroom",
		image:
			"https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
		description:
			"Unveiling Daikin’s latest high-efficiency VRV air conditioning lineup designed specifically for South Asian climatic conditions with ultra-quiet operation and zero ozone depletion R32 refrigerant.",
		about: [
			"Be among the first in Nepal to see Daikin's next-generation VRV lineup, unveiled at the Soaltee Hotel Grand Ballroom by Daikin's regional product team together with Himal Refrigeration, sole authorized distributor for Nepal.",
			"The new series is engineered for South Asian operating conditions: extended cooling ranges for pre-monsoon heat peaks, ultra-quiet indoor units for hospitality suites, and R32 refrigerant with zero ozone-depletion potential across the range.",
			"The program closes with a keynote from Himal's executive management on sizing VRV systems for Nepalese buildings, followed by an open Q&A and product brochure distribution for consultants and contractors.",
		],
		highlights: [
			"R32 Eco-Friendly Refrigerant Lineup",
			"Up to 45% Seasonal Energy Savings",
			"Keynote Address by Executive Management",
		],
	},
	{
		id: "ev-4",
		slug: "nepal-hospitality-restaurant-trade-summit-2024",
		title: "Nepal Hospitality & Restaurant Trade Summit 2024",
		type: "Expo",
		start: "2024-05-10",
		end: "2024-05-12",
		time: "10:00 AM - 5:00 PM",
		location: "Pokhara, Nepal",
		venue: "Pokhara Exhibition Center",
		image:
			"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
		description:
			"Showcasing commercial kitchen display fridges, under-counter coolers, and silent multi-split ACs for hotel developers and resort operators across Gandaki Province.",
		about: [
			"The Pokhara summit brought together hotel developers, resort operators, and restaurant groups from across Gandaki Province for three days of supplier showcases and technical talks.",
			"Himal Refrigeration's display focused on the frontline of hospitality refrigeration: commercial kitchen display fridges, under-counter coolers, bar chillers, and the silent multi-split AC units that keep guest rooms comfortable without intruding on the lakeside calm.",
			"Our team consulted with more than 200 hospitality operators over the three days and signed retrofit assessments for a dozen properties around Phewa Lake and Lakeside Road.",
		],
		highlights: [
			"Hotel Climate Control Retrofits",
			"200+ Hospitality Clients Consulted",
		],
	},
];

export const EVENT_TYPES: Array<{ value: EventType; label: string }> = [
	{ value: "Expo", label: "Expos" },
	{ value: "Seminar", label: "Seminars" },
	{ value: "Launch", label: "Launches" },
];

const toDate = (iso: string) => new Date(`${iso}T00:00:00`);

/** An event counts as upcoming until the end of its last day. */
export function isUpcoming(event: EventItem, now = new Date()) {
	const last = toDate(event.end ?? event.start);
	last.setHours(23, 59, 59, 999);
	return last >= now;
}

const dayMonth = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
});
const full = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

/** "Nov 18 – 20, 2024", "Dec 5, 2024", "Dec 30, 2024 – Jan 2, 2025". */
export function formatEventDate(event: EventItem) {
	const start = toDate(event.start);
	if (!event.end) return full.format(start);
	const end = toDate(event.end);
	if (start.getFullYear() !== end.getFullYear()) {
		return `${full.format(start)} – ${full.format(end)}`;
	}
	if (start.getMonth() === end.getMonth()) {
		return `${dayMonth.format(start)} – ${end.getDate()}, ${end.getFullYear()}`;
	}
	return `${dayMonth.format(start)} – ${dayMonth.format(end)}, ${end.getFullYear()}`;
}

export function eventDateParts(event: EventItem) {
	const start = toDate(event.start);
	return {
		month: start.toLocaleString("en-US", { month: "short" }),
		day: start.getDate(),
		year: start.getFullYear(),
	};
}
