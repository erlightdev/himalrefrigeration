import { Snowflake } from "lucide-react";
import { motion } from "motion/react";

const RINGS = [
	{ cx: 185, cy: 190, r: 160, stroke: "#f2a2a7", strokeWidth: 10.5 },
	{ cx: 191, cy: 191, r: 147, stroke: "#eb878d", strokeWidth: 11 },
	{ cx: 197, cy: 192, r: 134, stroke: "#e36c73", strokeWidth: 11.5 },
	{ cx: 203, cy: 193, r: 121, stroke: "#dc5059", strokeWidth: 12 },
	{ cx: 210, cy: 194, r: 108, stroke: "#d4343f", strokeWidth: 12.5 },
	{ cx: 217, cy: 195, r: 95, stroke: "#c81c27", strokeWidth: 13 },
	{ cx: 224, cy: 196, r: 82, stroke: "#b5111c", strokeWidth: 13.5 },
	{ cx: 231, cy: 197, r: 69, stroke: "#a10b14", strokeWidth: 14 },
	{ cx: 238, cy: 198, r: 56, stroke: "#8b070f", strokeWidth: 14.5 },
	{ cx: 245, cy: 199, r: 43, stroke: "#74050c", strokeWidth: 15 },
	{ cx: 251, cy: 200, r: 31, stroke: "#5d0309", strokeWidth: 15 },
];

export function ConcentricTunnel() {
	return (
		<div className="relative flex h-full min-h-[300px] w-full select-none flex-col justify-between overflow-hidden rounded-[20px] bg-[#fbf0f1] p-5 sm:min-h-[360px] md:min-h-[420px]">
			{/* Top-left brand pill */}
			<div className="z-10 inline-flex items-center gap-2 self-start rounded-full border border-black/[0.06] bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
				<img src="/images/logo.svg" alt="Himal" className="h-4 w-auto" />
				<span className="font-semibold text-xs text-zinc-900 tracking-tight">
					Himal Refrigeration
				</span>
				<span className="border-zinc-200 border-l pl-1.5 font-medium text-[10px] text-zinc-400">
					Since 1998
				</span>
			</div>

			{/* SVG Concentric Rings in Himal Red Brand Palette */}
			<div className="absolute inset-0 flex items-center justify-center p-3">
				<svg
					viewBox="0 0 380 380"
					className="h-full max-h-[380px] w-full max-w-[380px]"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<defs>
						<filter
							id="tunnel-glow-red"
							x="-20%"
							y="-20%"
							width="140%"
							height="140%"
						>
							<feDropShadow
								dx="0"
								dy="8"
								stdDeviation="12"
								floodColor="#5d0309"
								floodOpacity="0.25"
							/>
						</filter>
						<radialGradient id="tunnel-bg-red" cx="62%" cy="53%" r="70%">
							<stop offset="0%" stopColor="#fff5f6" />
							<stop offset="100%" stopColor="#fae2e4" />
						</radialGradient>
					</defs>

					<rect width="380" height="380" rx="18" fill="url(#tunnel-bg-red)" />

					{RINGS.map((ring, i) => (
						<circle
							key={i}
							cx={ring.cx}
							cy={ring.cy}
							r={ring.r}
							stroke={ring.stroke}
							strokeWidth={ring.strokeWidth}
							strokeLinecap="round"
						/>
					))}

					{/* Deep focal disc */}
					<circle cx={253} cy={200} r={23} fill="#fff0f1" />
				</svg>

				{/* Floating center snowflake cooling badge */}
				<motion.div
					initial={{ scale: 0.95 }}
					animate={{ scale: [0.97, 1.02, 0.97] }}
					transition={{
						duration: 4,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="absolute top-[52.6%] left-[66.4%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500/10 bg-white shadow-[0_10px_24px_-4px_rgba(180,10,20,0.32)]"
				>
					<Snowflake className="h-6 w-6 text-[#E20A17]" />
				</motion.div>
			</div>
		</div>
	);
}
