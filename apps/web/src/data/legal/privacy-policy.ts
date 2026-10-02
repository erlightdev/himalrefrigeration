export type LegalBlock =
	| { type: "p"; text: string }
	| { type: "ul"; items: string[] };

export type LegalSection = {
	id: string;
	heading: string;
	blocks: LegalBlock[];
};

export const PRIVACY_UPDATED = "2026-10-02";

// Grounded in what this site actually does today: a Better Auth customer
// dashboard (session cookie), a contact form, a Google Maps embed on the
// contact page, and Bunny Fonts for webfonts. No ad trackers, no analytics
// sent to a third party, no newsletter signup. Update this file if any of
// that changes, and have it reviewed by a lawyer before relying on it.
export const PRIVACY_SECTIONS: LegalSection[] = [
	{
		id: "who-we-are",
		heading: "Who we are",
		blocks: [
			{
				type: "p",
				text: 'This policy covers himalrefrigeration.com, operated by Himal Refrigeration & Electrical Industries Pvt. Ltd. ("Himal", "we", "us"), Gushingaal Chowk, Sanepa, Kathmandu / Lalitpur, Nepal.',
			},
			{
				type: "p",
				text: "For anything in this policy, contact us at info@himalref.com.np.",
			},
		],
	},
	{
		id: "information-we-collect",
		heading: "Information we collect",
		blocks: [
			{
				type: "p",
				text: "We collect information in these ways:",
			},
			{
				type: "ul",
				items: [
					"Contact and quote forms — the name, phone number, email and message you choose to submit.",
					"Dashboard accounts — name, email and a securely hashed password when you create a customer account, plus a session cookie that keeps you signed in.",
					"Theme preference — whether you've chosen light or dark mode, stored in your browser only (localStorage), never sent to us.",
				],
			},
			{
				type: "p",
				text: "We don't run advertising pixels or third-party analytics on this site, and we don't use cookies to track you across other sites.",
			},
		],
	},
	{
		id: "how-we-use-it",
		heading: "How we use it",
		blocks: [
			{
				type: "ul",
				items: [
					"To reply to an enquiry or quote request you send us.",
					"To operate your dashboard account — signing you in, showing your service history once that feature is available, and sending account-related notices.",
					"To keep the site secure and working as intended.",
				],
			},
			{
				type: "p",
				text: "A quote or consultation request is an enquiry, not an order — nothing is booked or charged until we confirm it with you separately.",
			},
		],
	},
	{
		id: "cookies-and-third-parties",
		heading: "Cookies and third-party services",
		blocks: [
			{
				type: "p",
				text: "The dashboard sets one strictly-necessary session cookie so you stay signed in; it isn't used for tracking or advertising.",
			},
			{
				type: "p",
				text: "A few pages load resources from other providers, each covered by their own privacy terms:",
			},
			{
				type: "ul",
				items: [
					"Bunny Fonts — serves our webfont; chosen because it doesn't log visitor IP addresses.",
					"Google Maps — the embedded map on our Contact page is subject to Google's privacy policy.",
				],
			},
		],
	},
	{
		id: "sharing",
		heading: "Sharing your information",
		blocks: [
			{
				type: "p",
				text: "We don't sell your personal information. We share it only with the infrastructure providers that host this site and store our database, and only to the extent needed to run the service, or where the law requires it.",
			},
		],
	},
	{
		id: "retention",
		heading: "How long we keep it",
		blocks: [
			{
				type: "p",
				text: "We keep enquiry and account information for as long as needed to respond to you, provide the service, or meet a legal or accounting obligation, then delete or anonymise it.",
			},
		],
	},
	{
		id: "your-rights",
		heading: "Your rights",
		blocks: [
			{
				type: "p",
				text: "You can ask us what information we hold about you, ask us to correct it, or ask us to delete your account and associated data. Email info@himalref.com.np and we'll respond within a reasonable time.",
			},
		],
	},
	{
		id: "children",
		heading: "Children's privacy",
		blocks: [
			{
				type: "p",
				text: "This site isn't directed at children, and we don't knowingly collect information from anyone under 18.",
			},
		],
	},
	{
		id: "security",
		heading: "Security",
		blocks: [
			{
				type: "p",
				text: "We use reasonable technical and organisational measures to protect the information we hold, including hashed passwords and encrypted connections. No method of storage or transmission is completely secure, so we can't guarantee absolute security.",
			},
		],
	},
	{
		id: "changes",
		heading: "Changes to this policy",
		blocks: [
			{
				type: "p",
				text: "We may update this policy as the site changes. We'll update the date at the top when we do; material changes will be noted here.",
			},
		],
	},
];
