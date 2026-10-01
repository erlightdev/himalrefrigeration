import { Button } from "@himalref/ui/components/button";
import { cn } from "@himalref/ui/lib/utils";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";

import Loader from "../loader";
import { ConcentricTunnel } from "./concentric-tunnel";
import { StudioBackground } from "./studio-background";

type AuthMode = "sign-in" | "sign-up";

const baseSchema = z.object({
	name: z.string(),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

const signInSchema = baseSchema;

const signUpSchema = baseSchema.extend({
	name: z.string().min(2, "Name must be at least 2 characters"),
});

function fieldError(
	errors: ReadonlyArray<string | { message?: string } | undefined>,
): string | undefined {
	if (!errors.length) return undefined;
	const text = errors
		.map((error) => (typeof error === "string" ? error : error?.message))
		.filter(Boolean)
		.join(", ");
	return text || undefined;
}

function AuthForm({ mode }: { mode: AuthMode }) {
	const navigate = useNavigate({ from: "/login" });
	const [showPassword, setShowPassword] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { name: "", email: "", password: "" },
		onSubmit: async ({ value }) => {
			setServerError(null);
			if (mode === "sign-in") {
				await authClient.signIn.email(
					{
						email: value.email,
						password: value.password,
					},
					{
						onSuccess: () => {
							toast.success("Sign in successful");
							navigate({ to: "/dashboard" });
						},
						onError: (error) => {
							const msg =
								error.error.message ||
								error.error.statusText ||
								"Could not reach the server. Please try again.";
							setServerError(msg);
							toast.error(msg);
						},
					},
				);
				return;
			}

			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name,
				},
				{
					onSuccess: () => {
						toast.success("Sign up successful");
						navigate({ to: "/dashboard" });
					},
					onError: (error) => {
						const msg =
							error.error.message ||
							error.error.statusText ||
							"Could not reach the server. Please try again.";
						setServerError(msg);
						toast.error(msg);
					},
				},
			);
		},
		validators: {
			onSubmit: mode === "sign-in" ? signInSchema : signUpSchema,
		},
	});

	return (
		<form
			noValidate
			style={{ colorScheme: "dark" }}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="mt-5 space-y-3.5"
		>
			{mode === "sign-up" && (
				<form.Field name="name">
					{(field) => {
						const err = fieldError(field.state.meta.errors);
						return (
							<div className="space-y-1">
								<label
									htmlFor={field.name}
									className="block font-medium text-xs text-zinc-300"
								>
									Full name
								</label>
								<input
									id={field.name}
									name={field.name}
									type="text"
									placeholder="Manish Sharma"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									style={{ colorScheme: "dark" }}
									className={cn(
										"h-10 w-full rounded-xl border border-zinc-800/90 bg-[#181113] px-3.5 font-normal text-sm text-white outline-none transition-all placeholder:text-zinc-500",
										err
											? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
											: "focus:border-[#E20A17] focus:ring-1 focus:ring-[#E20A17]/30",
									)}
								/>
								{err && <p className="text-[11px] text-red-400">{err}</p>}
							</div>
						);
					}}
				</form.Field>
			)}

			<form.Field name="email">
				{(field) => {
					const err = fieldError(field.state.meta.errors);
					return (
						<div className="space-y-1">
							<label
								htmlFor={field.name}
								className="block font-medium text-xs text-zinc-300"
							>
								Email address
							</label>
							<input
								id={field.name}
								name={field.name}
								type="email"
								placeholder="contact@himalref.com"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								style={{ colorScheme: "dark" }}
								className={cn(
									"h-10 w-full rounded-xl border border-zinc-800/90 bg-[#181113] px-3.5 font-normal text-sm text-white outline-none transition-all placeholder:text-zinc-500",
									err
										? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
										: "focus:border-[#E20A17] focus:ring-1 focus:ring-[#E20A17]/30",
								)}
							/>
							{err && <p className="text-[11px] text-red-400">{err}</p>}
						</div>
					);
				}}
			</form.Field>

			<form.Field name="password">
				{(field) => {
					const err = fieldError(field.state.meta.errors);
					return (
						<div className="space-y-1">
							<label
								htmlFor={field.name}
								className="block font-medium text-xs text-zinc-300"
							>
								Password
							</label>
							<div className="relative flex items-center">
								<input
									id={field.name}
									name={field.name}
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									style={{ colorScheme: "dark" }}
									className={cn(
										"h-10 w-full rounded-xl border border-zinc-800/90 bg-[#181113] pr-10 pl-3.5 font-normal text-sm text-white outline-none transition-all placeholder:text-zinc-500",
										err
											? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
											: "focus:border-[#E20A17] focus:ring-1 focus:ring-[#E20A17]/30",
									)}
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-3 text-zinc-400 transition hover:text-zinc-200"
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
							{err && <p className="text-[11px] text-red-400">{err}</p>}
						</div>
					);
				}}
			</form.Field>

			{serverError && (
				<div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-red-300 text-xs">
					<XCircle className="h-4 w-4 shrink-0 text-red-400" />
					<span className="truncate">{serverError}</span>
				</div>
			)}

			<form.Subscribe
				selector={(state) => ({
					canSubmit: state.canSubmit,
					isSubmitting: state.isSubmitting,
				})}
			>
				{({ canSubmit, isSubmitting }) => (
					<Button
						type="submit"
						disabled={!canSubmit || isSubmitting}
						className="mt-2 h-10 w-full rounded-xl bg-[#E20A17] font-semibold text-sm text-white shadow-md shadow-red-950/40 transition hover:bg-[#c50813] active:scale-[0.99] disabled:opacity-50"
					>
						{isSubmitting
							? "Please wait..."
							: mode === "sign-in"
								? "Sign in to Portal"
								: "Create account"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}

export default function AuthLandscape() {
	const [mode, setMode] = useState<AuthMode>("sign-in");
	const { isPending } = authClient.useSession();

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#0d0405] p-4 sm:p-6 lg:p-8">
			{/* Ambient animated crimson silk background */}
			<StudioBackground />
			<div
				className="pointer-events-none absolute inset-0 bg-radial from-black/20 via-black/55 to-black/90"
				aria-hidden="true"
			/>

			{/* Back to home fixed at top-left corner */}
			<Link
				to="/"
				className="group fixed top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-4 py-2 font-medium text-xs text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-zinc-800/90 hover:text-white"
			>
				<ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
				<span>Back to home</span>
			</Link>

			{/* Mode toggle fixed at top-right corner */}
			<div className="fixed top-5 right-5 z-20">
				<ModeToggle />
			</div>

			{/* Compact, modern, sleek auth card with brand subtle red glow */}
			<div className="relative z-10 grid w-full max-w-[780px] grid-cols-1 items-stretch overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#120709]/95 p-2.5 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_-15px_rgba(226,10,23,0.18)] backdrop-blur-2xl md:grid-cols-2 md:p-3">
				{/* Left artwork: concentric brand red rings tunnel */}
				<ConcentricTunnel />

				{/* Right auth panel */}
				<div className="flex flex-col justify-center px-4 py-6 sm:px-7 sm:py-7">
					<div className="w-full">
						<p className="font-semibold text-[#ff616b] text-[11px] uppercase tracking-[0.22em]">
							HIMAL WORKSPACE
						</p>
						<h1 className="mt-1 font-bold text-2xl text-white tracking-tight sm:text-[28px]">
							{mode === "sign-in" ? "Welcome back" : "Create account"}
						</h1>
						<p className="mt-1 text-xs text-zinc-400">
							{mode === "sign-in"
								? "Sign in to manage your cooling fleet, warranties, and service."
								: "Register to book service, track installations, and manage units."}
						</p>

						<AuthForm key={mode} mode={mode} />

						<div className="mt-4 text-center text-xs text-zinc-400">
							{mode === "sign-in" ? (
								<span>
									New to Himal?{" "}
									<button
										type="button"
										onClick={() => setMode("sign-up")}
										className="font-medium text-[#ff757e] underline underline-offset-4 transition hover:text-white"
									>
										Create an account
									</button>
								</span>
							) : (
								<span>
									Already have an account?{" "}
									<button
										type="button"
										onClick={() => setMode("sign-in")}
										className="font-medium text-[#ff757e] underline underline-offset-4 transition hover:text-white"
									>
										Sign in
									</button>
								</span>
							)}
						</div>

						<p className="mt-5 text-center text-[11px] text-zinc-500">
							By continuing, you agree to Himal Refrigeration's Terms of
							Service.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
