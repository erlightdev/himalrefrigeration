import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/features/marketing/components/legal/legal-page";
import { TERMS_SECTIONS, TERMS_UPDATED } from "@/data/legal/terms-of-service";

export const Route = createFileRoute("/_public/terms")({
	component: TermsPage,
	head: () => ({
		meta: [
			{ title: "Terms of Service — Himal Refrigeration" },
			{
				name: "description",
				content:
					"The terms that apply to using Himal Refrigeration's website and customer dashboard.",
			},
		],
	}),
});

function TermsPage() {
	return (
		<LegalPage
			title="Terms of Service"
			updated={TERMS_UPDATED}
			sections={TERMS_SECTIONS}
		/>
	);
}
