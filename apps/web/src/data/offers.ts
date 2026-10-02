export type Offer = {
	slug: string;
	occasion: string;
	title: string;
	description: string;
	perks: string[];
	/** ISO dates (YYYY-MM-DD), inclusive. */
	start: string;
	end: string;
};

// No percentage discounts here — this site makes no live pricing claim it
// can't stand behind. Each offer is a service perk (free inspection,
// priority slot, extended cover), matching how the header banner already
// advertises the monsoon offer. Add a real discount only once it's confirmed.
export const OFFERS: Offer[] = [
	{
		slug: "dashain",
		occasion: "Dashain",
		title: "Dashain cooling check",
		description:
			"Guests coming home for Dashain shouldn't find a warm fridge or a noisy AC. Book before Ghatasthapana and we'll check your system before the festival starts.",
		perks: [
			"Free system inspection",
			"Priority booking through the festival",
			"Same-week callout if something's off",
		],
		start: "2026-10-11",
		end: "2026-10-21",
	},
	{
		slug: "tihar",
		occasion: "Tihar",
		title: "Tihar home-ready check",
		description:
			"With family visiting over Tihar, book a quick check on your AC or fridge so nothing acts up mid-celebration.",
		perks: [
			"Free system inspection",
			"Priority booking through the festival",
			"Same-week callout if something's off",
		],
		start: "2026-11-07",
		end: "2026-11-11",
	},
	{
		slug: "monsoon",
		occasion: "Pre-monsoon",
		title: "Monsoon servicing",
		description:
			"Humidity and voltage swings are hardest on equipment right before monsoon. Book an inspection ahead of the season and catch problems before the rains do.",
		perks: [
			"Free system inspection",
			"Priority booking before the season starts",
			"Early quote on any parts that need replacing",
		],
		start: monsoonStart(),
		end: monsoonEnd(),
	},
];

// Monsoon dates are fixed on the Gregorian calendar (unlike Dashain/Tihar,
// which shift on the lunar one), so the window can just roll forward a year
// once it's passed — no date needs re-verifying each year.
function monsoonWindow() {
	const now = new Date();
	const year =
		now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 30)
			? now.getFullYear() + 1
			: now.getFullYear();
	return year;
}
function monsoonStart() {
	return `${monsoonWindow()}-03-01`;
}
function monsoonEnd() {
	return `${monsoonWindow()}-06-30`;
}

function toDate(iso: string) {
	return new Date(`${iso}T00:00:00`);
}

export function offerStatus(offer: Offer, now = new Date()) {
	const start = toDate(offer.start);
	const end = toDate(offer.end);
	end.setHours(23, 59, 59, 999);
	if (now >= start && now <= end) return "live" as const;
	if (now < start) return "upcoming" as const;
	return "ended" as const;
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
});
const dateFormatYear = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

export function formatOfferWindow(offer: Offer) {
	const start = toDate(offer.start);
	const end = toDate(offer.end);
	return `${dateFormat.format(start)} – ${dateFormatYear.format(end)}`;
}

/** Live offer if one's running now, otherwise the soonest upcoming one. */
export function currentOrNextOffer(now = new Date()) {
	const withStatus = OFFERS.map((offer) => ({
		offer,
		status: offerStatus(offer, now),
	})).filter((entry) => entry.status !== "ended");
	const live = withStatus.find((entry) => entry.status === "live");
	if (live) return live.offer;
	return withStatus.sort(
		(a, b) => +toDate(a.offer.start) - +toDate(b.offer.start),
	)[0]?.offer;
}
