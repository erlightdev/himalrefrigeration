import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal/legal-page";
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from "@/data/legal/privacy-policy";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
	head: () => ({
		meta: [
			{ title: "Privacy Policy — Himal Refrigeration" },
			{
				name: "description",
				content:
					"What information Himal Refrigeration collects through this site, how it's used, and your rights.",
			},
		],
	}),
});

function PrivacyPage() {
	return (
		<LegalPage
			title="Privacy Policy"
			updated={PRIVACY_UPDATED}
			sections={PRIVACY_SECTIONS}
		/>
	);
}
