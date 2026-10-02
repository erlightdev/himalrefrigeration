import { Snowflake } from "lucide-react";

// Decorative stock portraits (see public/images/avatars/README.md).
const HERO_AVATARS = [
	"/images/avatars/avatar-1.webp",
	"/images/avatars/avatar-2.webp",
	"/images/avatars/avatar-3.webp",
];

export default function HeroSection() {
	return (
		<section className="relative bg-background p-2 sm:p-3 lg:p-4">
			<div className="w-full">
				{/* Outer Frame Container */}
				<div className="relative min-h-[460px] overflow-hidden rounded-lg border border-border/60 bg-zinc-950 shadow-2xl sm:min-h-[530px] lg:min-h-[600px]">
					{/* Background Video Player - z-0 to sit above container bg-zinc-950 */}
					<video
						ref={(video) => {
							if (video) {
								video.muted = true;
								video.play().catch(() => {});
							}
						}}
						autoPlay
						loop
						muted
						playsInline
						controls={false}
						disablePictureInPicture
						className="pointer-events-none absolute inset-0 z-0 size-full scale-105 object-cover"
					>
						<source src="/videos/hero-home.mp4" type="video/mp4" />
					</video>

					{/* Atmospheric Overlay - z-10 for guaranteed text legibility */}
					<div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

					{/* Content Wrapper - z-20 to sit above video and overlay */}
					<div className="relative z-20 flex min-h-[460px] flex-col justify-between p-5 pt-24 text-white sm:min-h-[530px] sm:p-8 sm:pt-28 lg:min-h-[600px] lg:p-10 lg:pt-28">
						{/* Centered Content Block */}
						<div className="mx-auto my-auto max-w-4xl py-2 text-center">
							{/* Announcement Badge Just Above Title */}
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 font-medium text-white text-xs shadow-lg backdrop-blur-xl sm:text-sm">
								<span className="flex size-2 animate-pulse rounded-full bg-emerald-400" />
								<span className="font-semibold text-white">
									Nepal's Premier HVAC & Cooling Engineers
								</span>
								<span className="text-white/40">•</span>
								<span className="text-zinc-300">24/7 On-Call Support</span>
							</div>

							<h1 className="font-extrabold text-3xl text-white leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
								Precision{" "}
								<span className="mx-1 inline-flex items-center justify-center rounded-2xl border border-white/20 bg-primary p-1.5 align-middle text-white shadow-primary/40 shadow-xl sm:mx-2 sm:p-2">
									<Snowflake
										className="size-6 sm:size-8 lg:size-9"
										strokeWidth={2.2}
									/>
								</span>{" "}
								Cooling for <br className="hidden sm:inline" />
								<span className="font-black text-primary">
									Mission-Critical
								</span>{" "}
								Businesses.
							</h1>

							<p className="mx-auto mt-3 max-w-2xl text-pretty font-normal text-sm text-zinc-200 leading-relaxed sm:text-base lg:text-lg">
								From residential home ACs to industrial cold storage — Himal
								Refrigeration installs and services reliable cooling solutions
								across Nepal.
							</p>
						</div>

						{/* Floating Bottom Right Glass Badge */}
						<div className="absolute right-8 bottom-5 z-30 hidden max-w-xs items-center gap-3.5 rounded-2xl border border-white/15 bg-black/60 p-3 shadow-2xl backdrop-blur-xl transition-colors hover:border-white/30 lg:flex">
							<div className="flex -space-x-2.5">
								{HERO_AVATARS.map((src) => (
									<img
										key={src}
										src={src}
										alt=""
										width={32}
										height={32}
										loading="lazy"
										className="size-8 rounded-full border-2 border-white/30 object-cover"
									/>
								))}
								<div className="grid size-8 place-items-center rounded-full border-2 border-white/30 bg-primary font-bold text-[10px] text-white">
									+
								</div>
							</div>
							<div>
								<div className="font-extrabold text-sm text-white">
									200+ Units
								</div>
								<div className="text-[11px] text-zinc-300">
									Installed across Nepal
								</div>
							</div>
						</div>

						{/* Trusted Partner Logos Strip */}
						<div className="border-white/15 border-t pt-4 text-center">
							<p className="mb-2.5 font-semibold text-[10px] text-zinc-400 uppercase tracking-wider sm:text-xs">
								Trusted Component Partners & Industrial Standards
							</p>
							<div className="flex flex-wrap items-center justify-center gap-5 font-black font-mono text-xs text-zinc-200 tracking-widest opacity-90 sm:gap-10 sm:text-sm">
								<span>BITZER</span>
								<span>DANFOSS</span>
								<span>COPELAND</span>
								<span>DAIKIN</span>
								<span>MITSUBISHI</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
