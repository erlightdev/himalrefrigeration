import { buttonVariants } from "@himalref/ui/components/button";
import { Card } from "@himalref/ui/components/card";
import { cn } from "@himalref/ui/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Briefcase,
	PhoneCall,
	Search,
	Sparkles,
	Users,
} from "lucide-react";
import { useState } from "react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export const Route = createFileRoute("/team")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "Our Team - Himal Refrigeration & Electrical Engineers" }],
	}),
});

interface TeamMember {
	id: string;
	name: string;
	role: string;
	department:
		| "Management"
		| "HVAC Engineering"
		| "Cold Storage"
		| "Service & AMC"
		| "MEP & Projects";
	image: string;
}

const EXECUTIVE_LEADERSHIP = [
	{
		name: "Kamal Chaudhary",
		title: "Managing Director",
		image: "/images/about/kamal.png",
	},
	{
		name: "Vijay Kr. Chaudhary",
		title: "Executive Director",
		image: "/images/about/bijay.png",
	},
];

const ENGINEERING_TEAM: TeamMember[] = [
	{
		id: "eng-1",
		name: "Er. Anish Sharma",
		role: "Chief HVAC Systems Engineer",
		department: "HVAC Engineering",
		image:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "eng-2",
		name: "Er. Sunita Adhikari",
		role: "Head of Cold Chain & PUF Design",
		department: "Cold Storage",
		image:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "eng-3",
		name: "Ramesh K. Shrestha",
		role: "Senior Service & After-Sales Manager",
		department: "Service & AMC",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "eng-4",
		name: "Er. Bikash Thapa",
		role: "MEP & Firefighting Project Lead",
		department: "MEP & Projects",
		image:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "eng-5",
		name: "Deepak P. Gurung",
		role: "Industrial Chiller Specialist",
		department: "HVAC Engineering",
		image:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "eng-6",
		name: "Sita Kumari Bista",
		role: "Dispatch Operations Lead",
		department: "Service & AMC",
		image:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "eng-7",
		name: "Er. Prashant Karki",
		role: "VRF Thermal Design Engineer",
		department: "HVAC Engineering",
		image:
			"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "eng-8",
		name: "Pooja R. Mahato",
		role: "Customer Care Lead",
		department: "Service & AMC",
		image:
			"https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
	},
];

const DEPARTMENTS = [
	"View all",
	"HVAC Engineering",
	"Cold Storage",
	"Service & AMC",
	"MEP & Projects",
];

const PARTNERS = [
	{ name: "DAIKIN", detail: "Japan (Sole Partner)", primary: true },
	{ name: "FUJIAIRE", detail: "Malaysia (Authorized)", primary: false },
	{ name: "JAKSON", detail: "India (Generators)", primary: false },
	{ name: "BITZER", detail: "Germany (Compressors)", primary: false },
	{ name: "DANFOSS", detail: "Denmark (Controls)", primary: false },
	{ name: "COPELAND", detail: "USA (Scroll Tech)", primary: false },
];

function RouteComponent() {
	const [selectedDept, setSelectedDept] = useState<string>("View all");
	const [searchQuery, setSearchQuery] = useState<string>("");

	const filteredEngineers = ENGINEERING_TEAM.filter((member) => {
		const matchesDept =
			selectedDept === "View all" || member.department === selectedDept;
		const matchesSearch =
			member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			member.role.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesDept && matchesSearch;
	});

	return (
		<div className="flex min-h-screen flex-col justify-between bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
			<div>
				<Header />

				{/* Team Page Title Header Banner */}
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-12 sm:pt-36 lg:pt-40">
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

					<div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs shadow-xs sm:text-sm">
							<Users className="size-4 text-primary" />
							Certified Refrigeration & HVAC Engineering Team
						</div>

						<h1 className="mx-auto max-w-4xl text-balance font-extrabold text-3xl text-zinc-900 leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl dark:text-white">
							Meet the Engineers & Pioneers <br className="hidden sm:inline" />
							<span className="font-black text-primary">
								Behind Himal Refrigeration
							</span>
							.
						</h1>

						<p className="mx-auto mt-4 max-w-3xl text-pretty font-normal text-base text-zinc-700 leading-relaxed sm:text-lg dark:text-zinc-300">
							Our strength lies in our people. From senior Daikin-certified VRF
							designers to on-call cold storage specialists, our team brings
							over 25 years of technical expertise across Nepal.
						</p>

						{/* Stats Bar */}
						<div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
							<div className="rounded-xl border border-zinc-200/80 bg-card p-4 shadow-xs dark:border-zinc-800">
								<div className="font-black font-mono text-3xl text-primary tracking-tight">
									50+
								</div>
								<div className="mt-1 font-semibold text-xs text-zinc-600 dark:text-zinc-400">
									Certified Techs
								</div>
							</div>
							<div className="rounded-xl border border-zinc-200/80 bg-card p-4 shadow-xs dark:border-zinc-800">
								<div className="font-black font-mono text-3xl text-zinc-900 tracking-tight dark:text-white">
									25+
								</div>
								<div className="mt-1 font-semibold text-xs text-zinc-600 dark:text-zinc-400">
									Years Experience
								</div>
							</div>
							<div className="rounded-xl border border-zinc-200/80 bg-card p-4 shadow-xs dark:border-zinc-800">
								<div className="font-black font-mono text-3xl text-zinc-900 tracking-tight dark:text-white">
									2 Hours
								</div>
								<div className="mt-1 font-semibold text-xs text-zinc-600 dark:text-zinc-400">
									Emergency Dispatch
								</div>
							</div>
							<div className="rounded-xl border border-zinc-200/80 bg-card p-4 shadow-xs dark:border-zinc-800">
								<div className="font-black font-mono text-3xl text-zinc-900 tracking-tight dark:text-white">
									100%
								</div>
								<div className="mt-1 font-semibold text-xs text-zinc-600 dark:text-zinc-400">
									In-House Experts
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Executive Leadership Banner Section */}
				<section className="border-border/60 border-b bg-background py-16">
					<div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
						{/* 3-Column Banner Card */}
						<div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-2xl lg:grid-cols-12">
							{/* Left Text Column */}
							<div className="flex flex-col justify-between space-y-8 bg-primary p-8 sm:p-12 lg:col-span-4">
								<span className="font-bold text-white/80 text-xs uppercase tracking-widest">
									LEADERSHIP & VISION
								</span>

								<h2 className="font-extrabold text-2xl text-white leading-snug tracking-tight sm:text-3xl lg:text-4xl">
									Our ability to engineer precision cooling from multiple angles
									is built on 25+ years of dedicated experience.
								</h2>

								<div>
									<a
										href="#team-grid"
										className="inline-flex items-center gap-2 font-extrabold text-sm text-white underline underline-offset-8 transition-colors hover:text-white/80"
									>
										Meet our engineering team
										<ArrowRight className="size-4" />
									</a>
								</div>
							</div>

							{/* Middle Column: Managing Director Card */}
							<div className="bg-primary/95 p-3 lg:col-span-4">
								<div className="group relative h-80 overflow-hidden rounded-2xl border border-white/20 bg-zinc-900 shadow-md sm:h-96 lg:h-[480px]">
									<img
										src={EXECUTIVE_LEADERSHIP[0].image}
										alt={EXECUTIVE_LEADERSHIP[0].name}
										className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-x-3 bottom-3 space-y-0.5 rounded-xl bg-black/60 p-4 text-white backdrop-blur-md">
										<div className="font-extrabold text-lg text-white">
											{EXECUTIVE_LEADERSHIP[0].name}
										</div>
										<div className="font-semibold text-xs text-zinc-300">
											{EXECUTIVE_LEADERSHIP[0].title}
										</div>
									</div>
								</div>
							</div>

							{/* Right Column: Executive Director Card */}
							<div className="bg-primary/95 p-3 lg:col-span-4">
								<div className="group relative h-80 overflow-hidden rounded-2xl border border-white/20 bg-zinc-900 shadow-md sm:h-96 lg:h-[480px]">
									<img
										src={EXECUTIVE_LEADERSHIP[1].image}
										alt={EXECUTIVE_LEADERSHIP[1].name}
										className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-x-3 bottom-3 space-y-0.5 rounded-xl bg-black/60 p-4 text-white backdrop-blur-md">
										<div className="font-extrabold text-lg text-white">
											{EXECUTIVE_LEADERSHIP[1].name}
										</div>
										<div className="font-semibold text-xs text-zinc-300">
											{EXECUTIVE_LEADERSHIP[1].title}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Clean Minimalist Team Section */}
				<section id="team-grid" className="py-16 lg:py-24">
					<div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
						{/* Section Title */}
						<div className="mx-auto max-w-2xl space-y-3 text-center">
							<h2 className="font-normal font-serif text-3xl text-zinc-900 tracking-tight sm:text-5xl dark:text-white">
								Meet the team that makes the{" "}
								<em className="font-normal text-primary italic">
									magic happen
								</em>
							</h2>
							<p className="font-normal text-sm text-zinc-600 sm:text-base dark:text-zinc-300">
								Meet our diverse team of world-class engineers, technicians, and
								cooling specialists.
							</p>
						</div>

						{/* Department Filter Tabs & Search Bar */}
						<div className="flex flex-col items-center justify-between gap-4 border-border/60 border-b pb-6 sm:flex-row">
							<div className="flex w-full items-center gap-1.5 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
								{DEPARTMENTS.map((dept) => {
									const isActive = selectedDept === dept;
									return (
										<button
											key={dept}
											type="button"
											onClick={() => setSelectedDept(dept)}
											className={`whitespace-nowrap rounded-full px-4 py-1.5 font-bold text-xs transition-all ${
												isActive
													? "bg-primary text-primary-foreground shadow-xs"
													: "bg-muted/50 text-zinc-600 hover:bg-muted hover:text-foreground dark:text-zinc-400"
											}`}
										>
											{dept}
										</button>
									);
								})}
							</div>

							<div className="relative w-full shrink-0 sm:w-64">
								<Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-zinc-400" />
								<input
									type="text"
									placeholder="Search team member..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full rounded-full border border-input bg-card py-1.5 pr-4 pl-8 text-foreground text-xs shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
						</div>

						{/* 4-Column Minimalist Team Cards */}
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{filteredEngineers.map((engineer) => (
								<Card
									key={engineer.id}
									className="group overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border transition-all hover:shadow-md"
								>
									<div className="relative flex h-72 items-center justify-center overflow-hidden bg-zinc-100 p-2 dark:bg-zinc-900">
										<img
											src={engineer.image}
											alt={engineer.name}
											className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>
									<div className="bg-card p-3.5 text-center">
										<div className="rounded-2xl border border-border/40 bg-muted/40 p-3">
											<h3 className="font-extrabold text-base text-zinc-900 leading-tight dark:text-white">
												{engineer.name}
											</h3>
											<p className="mt-1 font-semibold text-xs text-zinc-500 dark:text-zinc-400">
												{engineer.role}
											</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Our Global Partners & Authorized OEM Brands */}
				<section className="border-border/60 border-y bg-zinc-50/50 py-16 dark:bg-zinc-950/40">
					<div className="mx-auto max-w-7xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
						<div className="mx-auto max-w-2xl space-y-2">
							<span className="font-bold text-primary text-xs uppercase tracking-wider">
								AUTHORIZED OEM PARTNERS
							</span>
							<h2 className="font-extrabold text-2xl text-zinc-900 tracking-tight sm:text-3xl dark:text-white">
								Global Manufacturing & Distribution Partners
							</h2>
							<p className="font-normal text-xs text-zinc-600 sm:text-sm dark:text-zinc-300">
								Authorized distribution and engineering partnerships with the
								world's leading HVAC, refrigeration, and power equipment
								manufacturers.
							</p>
						</div>

						{/* Partners Grid */}
						<div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-6">
							{PARTNERS.map((partner) => (
								<div
									key={partner.name}
									className="flex flex-col items-center justify-center space-y-1 rounded-2xl border border-zinc-200/80 bg-card p-5 shadow-xs transition-all hover:border-primary/40 dark:border-zinc-800"
								>
									<span className="font-black font-mono text-lg text-zinc-900 tracking-wider dark:text-white">
										{partner.name}
									</span>
									<span
										className={cn(
											"font-bold text-[10px] uppercase",
											partner.primary ? "text-primary" : "text-zinc-500",
										)}
									>
										{partner.detail}
									</span>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Join Team / Careers CTA Banner */}
				<section className="bg-primary py-16 text-primary-foreground">
					<div className="mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
						<div className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/10 text-white">
							<Briefcase className="size-6" />
						</div>
						<h2 className="font-extrabold text-3xl tracking-tight sm:text-4xl">
							Want to Join Nepal's Leading HVAC Family?
						</h2>
						<p className="mx-auto max-w-2xl font-normal text-primary-foreground/90 text-sm leading-relaxed sm:text-base">
							We are always looking for passionate HVAC engineers, cold storage
							specialists, and certified service technicians to join our growing
							team across Nepal.
						</p>
						<div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
							<a
								href="/contact"
								className={cn(
									buttonVariants({ size: "lg" }),
									"gap-2 border-0 bg-white font-bold text-primary shadow-xl hover:bg-white/90",
								)}
							>
								<Sparkles className="size-4 text-primary" />
								Submit Career Inquiry
							</a>
							<a
								href="tel:+9779800000000"
								className={cn(
									buttonVariants({ size: "lg" }),
									"gap-2 border border-white/50 bg-transparent font-bold text-white hover:bg-white/10",
								)}
							>
								<PhoneCall className="size-4" />
								Call HR Hotline: +977 980-0000000
							</a>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</div>
	);
}
