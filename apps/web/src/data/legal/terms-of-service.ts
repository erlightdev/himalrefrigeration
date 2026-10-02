import type { LegalSection } from "./privacy-policy";

export const TERMS_UPDATED = "2026-10-02";

export const TERMS_SECTIONS: LegalSection[] = [
	{
		id: "acceptance",
		heading: "Acceptance of these terms",
		blocks: [
			{
				type: "p",
				text: 'These terms apply to your use of himalrefrigeration.com, operated by Himal Refrigeration & Electrical Industries Pvt. Ltd. ("Himal", "we", "us"), Gushingaal Chowk, Sanepa, Kathmandu / Lalitpur, Nepal. By using the site, you agree to them.',
			},
		],
	},
	{
		id: "the-service",
		heading: "What this site is",
		blocks: [
			{
				type: "p",
				text: "This site describes our HVAC, cold storage and electrical services, lets you submit an enquiry or quote request, and gives signed-in customers a dashboard for their account.",
			},
			{
				type: "p",
				text: "Submitting a form here is an enquiry, not a binding order. A job, quote or appointment is only confirmed once we agree it with you separately — in writing, by phone, or in person.",
			},
		],
	},
	{
		id: "accounts",
		heading: "Your account",
		blocks: [
			{
				type: "p",
				text: "If you create a dashboard account, you're responsible for keeping your password confidential and for anything done under your account. Tell us straight away if you think someone else has access to it.",
			},
			{
				type: "p",
				text: "You agree to give us accurate information when you register or submit a form.",
			},
		],
	},
	{
		id: "acceptable-use",
		heading: "Acceptable use",
		blocks: [
			{
				type: "p",
				text: "You agree not to:",
			},
			{
				type: "ul",
				items: [
					"Use the site for anything unlawful, or to submit false information.",
					"Try to gain unauthorised access to another account, our systems, or data.",
					"Interfere with the site's normal operation or security.",
					"Copy or republish the site's content without permission.",
				],
			},
		],
	},
	{
		id: "intellectual-property",
		heading: "Intellectual property",
		blocks: [
			{
				type: "p",
				text: "The site's text, design and images are owned by Himal or licensed to us, except where credited to their original source. Product and brand names such as DAIKIN, FUJIAIRE, JAKSON, BITZER, DANFOSS and COPELAND are trademarks of their respective owners and are referenced only to describe our authorized partnerships with them.",
			},
		],
	},
	{
		id: "third-party-services",
		heading: "Third-party services",
		blocks: [
			{
				type: "p",
				text: "Some pages embed third-party services, such as the Google Maps location on our Contact page. We aren't responsible for the content or availability of services we don't operate.",
			},
		],
	},
	{
		id: "disclaimer",
		heading: "No warranty",
		blocks: [
			{
				type: "p",
				text: 'We try to keep this site accurate and available, but it\'s provided "as is" without any warranty of uninterrupted or error-free operation. Information on the site (including pricing, specifications and availability) is subject to change and should be confirmed with us directly before you rely on it for a decision.',
			},
		],
	},
	{
		id: "liability",
		heading: "Limitation of liability",
		blocks: [
			{
				type: "p",
				text: "To the extent permitted by law, Himal isn't liable for indirect or consequential loss arising from your use of this site. Nothing here limits any liability that can't be limited under Nepali law.",
			},
		],
	},
	{
		id: "governing-law",
		heading: "Governing law",
		blocks: [
			{
				type: "p",
				text: "These terms are governed by the laws of Nepal, and any dispute will be subject to the jurisdiction of the courts of Nepal.",
			},
		],
	},
	{
		id: "changes",
		heading: "Changes to these terms",
		blocks: [
			{
				type: "p",
				text: "We may update these terms as the site or our services change. We'll update the date at the top when we do.",
			},
		],
	},
];
