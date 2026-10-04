import {
	Briefcase,
	Building2,
	Film,
	Globe,
	GraduationCap,
	HeartPulse,
	Landmark,
	type LucideIcon,
} from "lucide-react";

export type Project = {
	name: string;
	image: string;
};

export type ProjectCategory = {
	slug: string;
	label: string;
	tagline: string;
	icon: LucideIcon;
	projects: Project[];
};

// Completed installation sites, grouped the same way as the company's
// original project records — real client names and site photography,
// no invented counts or per-site specifics beyond what was on file.
export const PROJECT_CATEGORIES: ProjectCategory[] = [
	{
		slug: "bank-finance",
		label: "Banking & Finance",
		tagline: "Branch HVAC and server-room cooling for Nepal's banks.",
		icon: Landmark,
		projects: [
			{
				name: "Nepal Rastra Bank",
				image: "/images/projects/bank-finance/nepal-rastra-bank.jpg",
			},
			{
				name: "Prabhu Bank",
				image: "/images/projects/bank-finance/prabhu-bank.jpg",
			},
			{
				name: "Himalayan Bank",
				image: "/images/projects/bank-finance/himalayan-bank.jpg",
			},
			{
				name: "Prime Bank",
				image: "/images/projects/bank-finance/prime-bank.jpg",
			},
			{
				name: "Mega Bank",
				image: "/images/projects/bank-finance/mega-bank.jpg",
			},
			{
				name: "Janata Bank",
				image: "/images/projects/bank-finance/janata-bank.jpg",
			},
			{
				name: "Nepal Investment Bank",
				image: "/images/projects/bank-finance/nepal-investment-bank.jpg",
			},
		],
	},
	{
		slug: "corporate",
		label: "Corporate Sectors",
		tagline: "Office, retail and residential HVAC for corporate clients.",
		icon: Briefcase,
		projects: [
			{ name: "Dharahara", image: "/images/projects/corporate/dharahara.jpg" },
			{
				name: "Surya Nepal",
				image: "/images/projects/corporate/surya-nepal.jpg",
			},
			{
				name: "Gorkha Department Store",
				image: "/images/projects/corporate/gorkha-department-store.jpg",
			},
			{
				name: "Wester Properties & Apartments",
				image: "/images/projects/corporate/wester-properties.jpg",
			},
			{
				name: "Raj Bahadur Shah Residence",
				image: "/images/projects/corporate/raj-bahadur-shah-residence.jpg",
			},
		],
	},
	{
		slug: "education",
		label: "Education",
		tagline: "Classroom, lab and campus cooling for schools and universities.",
		icon: GraduationCap,
		projects: [
			{
				name: "Kathmandu World School",
				image: "/images/projects/education/kathmandu-world-school.jpg",
			},
			{
				name: "Kathmandu University",
				image: "/images/projects/education/kathmandu-university.jpg",
			},
			{
				name: "Little Angels School",
				image: "/images/projects/education/little-angels-school.jpg",
			},
		],
	},
	{
		slug: "embassy",
		label: "Embassy",
		tagline: "Secure, reliable HVAC for diplomatic missions.",
		icon: Globe,
		projects: [
			{
				name: "Embassy of Japan",
				image: "/images/projects/embassy/embassy-of-japan.jpg",
			},
			{
				name: "Indian Embassy",
				image: "/images/projects/embassy/indian-embassy.jpg",
			},
			{ name: "US Embassy", image: "/images/projects/embassy/us-embassy.jpg" },
		],
	},
	{
		slug: "health",
		label: "Healthcare",
		tagline: "Precision climate control for hospitals and clinics.",
		icon: HeartPulse,
		projects: [
			{
				name: "Paropakar Hospital",
				image: "/images/projects/health/paropakar-hospital.jpg",
			},
			{
				name: "Bir Hospital",
				image: "/images/projects/health/bir-hospital.jpg",
			},
		],
	},
	{
		slug: "hotel",
		label: "Hotels & Resorts",
		tagline: "Central HVAC and chiller plants for hotels and resorts.",
		icon: Building2,
		projects: [
			{
				name: "Hotel Mechi Crown",
				image: "/images/projects/hotel/hotel-mechi-crown.jpg",
			},
			{
				name: "Hotel Mulberry",
				image: "/images/projects/hotel/hotel-mulberry.jpg",
			},
			{ name: "Hotel Aloft", image: "/images/projects/hotel/hotel-aloft.jpg" },
			{
				name: "Hotel Landmark Pokhara",
				image: "/images/projects/hotel/hotel-landmark-pokhara.jpg",
			},
			{
				name: "Hotel Siraichuli Chitwan",
				image: "/images/projects/hotel/hotel-siraichuli-chitwan.jpg",
			},
			{
				name: "Da Yatra Courtyard Hotel & Resort",
				image: "/images/projects/hotel/da-yatra-courtyard.jpg",
			},
			{
				name: "Kathmandu Guest House",
				image: "/images/projects/hotel/kathmandu-guest-house.jpg",
			},
			{
				name: "Park Village Resort",
				image: "/images/projects/hotel/park-village-resort.webp",
			},
		],
	},
	{
		slug: "entertainment",
		label: "Entertainment",
		tagline: "Large-volume HVAC for cinemas and shopping malls.",
		icon: Film,
		projects: [
			{
				name: "Chitwan Cineplex",
				image: "/images/projects/entertainment/chitwan-cineplex.jpg",
			},
			{
				name: "Labim Mall",
				image: "/images/projects/entertainment/labim-mall.jpg",
			},
			{
				name: "Eyeplex Mall",
				image: "/images/projects/entertainment/eyeplex-mall.jpg",
			},
			{
				name: "QFX Bhaktapur",
				image: "/images/projects/entertainment/qfx-bhaktapur.jpg",
			},
			{
				name: "One Cinema",
				image: "/images/projects/entertainment/one-cinema.jpg",
			},
			{
				name: "QFX Chhaya",
				image: "/images/projects/entertainment/qfx-chhaya.jpg",
			},
			{
				name: "QFX Labim",
				image: "/images/projects/entertainment/qfx-labim.jpg",
			},
		],
	},
];

export function getProjectCategory(slug: string): ProjectCategory | undefined {
	return PROJECT_CATEGORIES.find((category) => category.slug === slug);
}

export function totalProjectCount(): number {
	return PROJECT_CATEGORIES.reduce(
		(total, category) => total + category.projects.length,
		0,
	);
}
