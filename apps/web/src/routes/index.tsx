import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@himalref/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";
import {
	Building2,
	PhoneCall,
	Refrigerator,
	ShieldCheck,
	Snowflake,
	Star,
	Wrench,
} from "lucide-react";
import HeroSection from "@/components/home/hero-section";
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

const SERVICES = [
	{
		title: "Commercial Refrigeration",
		description:
			"Design, installation, and maintenance of walk-in coolers, freezer rooms, and display cases for supermarkets and restaurants.",
		icon: Refrigerator,
	},
	{
		title: "HVAC & Air Conditioning",
		description:
			"Complete climate control solutions including multi-split ACs, VRF systems, and central ventilation for commercial buildings.",
		icon: Snowflake,
	},
	{
		title: "Maintenance Support",
		description:
			"Scheduled servicing, filter replacement, and gas charging to ensure peak efficiency and eliminate unexpected operational downtime.",
		icon: Wrench,
	},
	{
		title: "Industrial Cold Storage",
		description:
			"Custom cold chain infrastructure for pharmaceutical, agricultural, and food processing facilities across Nepal.",
		icon: Building2,
	},
];

function HomeComponent() {
	return (
		<div className="flex min-h-screen flex-col justify-between bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
			<div>
				{/* Navigation Header */}
				<Header />

				{/* Interactive Video Hero Section */}
				<HeroSection />

				{/* Services Section */}
				<section className="border-t bg-muted/40 py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
								Complete Cooling & Climate Control
							</h2>
							<p className="mt-3 text-lg text-muted-foreground">
								High-performance solutions backed by certified technicians and
								original spare parts.
							</p>
						</div>

						<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{SERVICES.map((service) => {
								const Icon = service.icon;
								return (
									<Card
										key={service.title}
										className="rounded-xl shadow-sm ring-border transition-all [--card-spacing:--spacing(6)] hover:shadow-md hover:ring-primary/50"
									>
										<CardHeader>
											<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
												<Icon className="size-6" />
											</div>
											<CardTitle className="text-xl">{service.title}</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-sm leading-relaxed">
												{service.description}
											</CardDescription>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</section>

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
