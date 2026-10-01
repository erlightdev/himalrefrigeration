import { createFileRoute } from "@tanstack/react-router";
import { PhoneCall, ShieldCheck, Star } from "lucide-react";
import HeroSection from "@/components/home/hero-section";
import { ServicesShowcase } from "@/components/home/services-showcase";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title:
					"Himal Refrigeration - Commercial & Residential Cooling Solutions",
			},
		],
	}),
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="flex min-h-screen flex-col justify-between bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
			<div>
				{/* Navigation Header */}
				<Header />

				{/* Interactive Video Hero Section */}
				<HeroSection />

				<ServicesShowcase />

				{/* Trust Banner */}
				<section className="border-t py-16">
					<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
						<div className="flex flex-col items-center justify-center gap-8 md:flex-row md:justify-around">
							<div className="flex items-center gap-3">
								<ShieldCheck className="size-10 text-primary" />
								<div className="text-left">
									<div className="font-bold text-lg">Guaranteed Quality</div>
									<div className="text-muted-foreground text-sm">
										Certified parts and service warranty
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Star className="size-10 text-primary" />
								<div className="text-left">
									<div className="font-bold text-lg">15+ Years Experience</div>
									<div className="text-muted-foreground text-sm">
										Serving hundreds of businesses in Nepal
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<PhoneCall className="size-10 text-primary" />
								<div className="text-left">
									<div className="font-bold text-lg">Fast On-Site Techs</div>
									<div className="text-muted-foreground text-sm">
										Rapid response team for critical issues
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Site Footer */}
			<Footer />
		</div>
	);
}
