import { createFileRoute } from "@tanstack/react-router";
import { Building2, Check, Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { type FormEvent, useState } from "react";

import { StatefulButton } from "@/components/motion/button/stateful";
import { Input } from "@/components/motion/input";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/motion/select";

export const Route = createFileRoute("/_public/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Contact — Himal Refrigeration" },
			{
				name: "description",
				content:
					"Reach Himal Refrigeration's engineering team for cold storage, HVAC and maintenance enquiries.",
			},
		],
	}),
});

const CONTACT_PHONES = [
	"+977-01-5520123",
	"+977-01-5520260",
	"+977-01-5521123",
];
const SUPPORT_PHONES = [
	{ label: "Customer support", number: "+977-01-5013190" },
	{ label: "Emergency hotline", number: "+977 980-0000000" },
];

const SERVICE_OPTIONS = [
	"HVAC & air conditioning",
	"Walk-in cold storage rooms",
	"Supermarket display refrigeration",
	"Industrial process chillers",
	"Annual maintenance contract",
	"Electrical, plumbing & firefighting",
] as const;

const telHref = (number: string) => `tel:${number.replace(/[^0-9+]/g, "")}`;

function ContactPage() {
	return (
		<>
				<section className="relative overflow-hidden border-border/60 border-b bg-gradient-to-b from-primary/5 via-background to-background">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
					/>
					<ScrollReveal className="relative mx-auto max-w-5xl px-5 pt-32 pb-14 text-center sm:px-8 lg:pt-40 lg:pb-20">
						<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 font-semibold text-accent-foreground text-xs sm:text-sm">
							<Building2 className="size-4 text-primary" aria-hidden="true" />
							Contact
						</p>
						<h1 className="mx-auto mt-5 max-w-3xl text-balance font-extrabold text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Talk to a <span className="text-primary">cooling engineer</span>.
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
							Cold rooms, HVAC, or a maintenance contract — tell us what you
							need and an engineer will get back to you.
						</p>
					</ScrollReveal>
				</section>

				<div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
					<div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
						<ContactDetails />
						<ContactForm />
					</div>
				</div>
			</>
	);
}

function ContactDetails() {
	return (
		<ScrollReveal className="space-y-6">
			<div className="divide-y divide-border rounded-2xl border border-border">
				<div className="flex items-start gap-3 p-5">
					<MapPin
						className="mt-0.5 size-4 shrink-0 text-primary"
						aria-hidden="true"
					/>
					<div className="text-sm">
						<p className="font-medium">Gushingaal Chowk, Sanepa</p>
						<p className="mt-0.5 text-muted-foreground">
							Kathmandu / Lalitpur, Nepal · P.O. Box 13417
						</p>
					</div>
				</div>

				<div className="flex items-start gap-3 p-5">
					<Clock
						className="mt-0.5 size-4 shrink-0 text-primary"
						aria-hidden="true"
					/>
					<div className="text-sm">
						<p className="font-medium">Sun – Fri, 10 AM – 5 PM</p>
						<p className="mt-0.5 text-muted-foreground">
							Office hours · emergency line runs 24/7
						</p>
					</div>
				</div>

				<div className="flex items-start gap-3 p-5">
					<Mail
						className="mt-0.5 size-4 shrink-0 text-primary"
						aria-hidden="true"
					/>
					<a
						href="mailto:info@himalref.com.np"
						className="text-sm transition-colors hover:text-primary"
					>
						info@himalref.com.np
					</a>
				</div>

				<div className="flex items-start gap-3 p-5">
					<PhoneCall
						className="mt-0.5 size-4 shrink-0 text-primary"
						aria-hidden="true"
					/>
					<div className="min-w-0 flex-1 text-sm">
						<p className="font-medium">Office line</p>
						<div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
							{CONTACT_PHONES.map((number) => (
								<a
									key={number}
									href={telHref(number)}
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									{number}
								</a>
							))}
						</div>
					</div>
				</div>

				{SUPPORT_PHONES.map((phone) => (
					<a
						key={phone.number}
						href={telHref(phone.number)}
						className="flex items-center justify-between gap-3 p-5 text-sm transition-colors hover:bg-muted/50"
					>
						<span className="text-muted-foreground">{phone.label}</span>
						<span className="font-medium text-primary">{phone.number}</span>
					</a>
				))}
			</div>

			<div className="overflow-hidden rounded-2xl border border-border">
				<iframe
					title="Himal Refrigeration & Electrical Industries, Gushingaal Chowk"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.882024287201!2d85.30663853278816!3d27.690040965207903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb184c222f9d03%3A0x339c38afd84e384c!2sHimal%20Refrigeration%20and%20Electrical%20Industries%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1785404850756!5m2!1sen!2snp"
					width="100%"
					height="220"
					style={{ border: 0 }}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="grayscale transition-all duration-500 hover:grayscale-0"
				/>
			</div>
		</ScrollReveal>
	);
}

type Status = "idle" | "sending" | "sent";

function ContactForm() {
	const [status, setStatus] = useState<Status>("idle");
	const [service, setService] = useState<string>(SERVICE_OPTIONS[0]);
	const [touched, setTouched] = useState(false);
	const [values, setValues] = useState({
		name: "",
		phone: "",
		email: "",
		message: "",
	});

	const set = (key: keyof typeof values) => (value: string) =>
		setValues((current) => ({ ...current, [key]: value }));

	const errors = {
		name: values.name.trim() ? undefined : "Enter your name",
		phone: values.phone.trim() ? undefined : "Enter a phone number",
		message:
			values.message.trim().length >= 10
				? undefined
				: "A few more details would help",
	};
	const valid = !errors.name && !errors.phone && !errors.message;

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setTouched(true);
		if (!valid) return;
		setStatus("sending");
		// No backend wired up yet — this mimics a submit; replace with a real
		// request before launch.
		window.setTimeout(() => setStatus("sent"), 900);
	};

	if (status === "sent") {
		return (
			<ScrollReveal className="flex flex-col items-center justify-center rounded-2xl border border-border p-12 text-center">
				<span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
					<Check className="size-6" aria-hidden="true" />
				</span>
				<p className="mt-4 font-medium text-lg">Message sent</p>
				<p className="mt-1 max-w-sm text-muted-foreground text-sm">
					An engineer will get back to you, usually within a day.
				</p>
				<button
					type="button"
					onClick={() => {
						setStatus("idle");
						setTouched(false);
						setValues({ name: "", phone: "", email: "", message: "" });
					}}
					className="mt-6 text-primary text-sm underline-offset-4 hover:underline"
				>
					Send another message
				</button>
			</ScrollReveal>
		);
	}

	const show = (field: keyof typeof errors) =>
		touched ? errors[field] : undefined;

	return (
		<ScrollReveal>
			<form
				onSubmit={onSubmit}
				noValidate
				className="rounded-2xl border border-border p-6 sm:p-8"
			>
				<div className="grid gap-4 sm:grid-cols-2">
					<Input
						label="Full name"
						value={values.name}
						onChange={set("name")}
						autoComplete="name"
						error={show("name")}
					/>
					<Input
						label="Phone number"
						type="tel"
						value={values.phone}
						onChange={set("phone")}
						autoComplete="tel"
						error={show("phone")}
					/>
				</div>

				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					<Input
						label="Email (optional)"
						type="email"
						value={values.email}
						onChange={set("email")}
						autoComplete="email"
					/>
					<div className="flex flex-col gap-1.5">
						<span className="px-1 font-medium text-foreground text-sm">
							Service
						</span>
						<Select value={service} onValueChange={setService} className="z-30">
							<SelectTrigger className="h-10 py-2">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{SERVICE_OPTIONS.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="mt-4">
					<label
						htmlFor="contact-message"
						className="px-1 font-medium text-foreground text-sm"
					>
						Message
					</label>
					<textarea
						id="contact-message"
						rows={4}
						placeholder="Room size, location, or what you need help with…"
						value={values.message}
						onChange={(event) => set("message")(event.target.value)}
						className="mt-1.5 w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
					/>
					{show("message") ? (
						<p className="mt-1.5 px-1 text-destructive text-xs">
							{show("message")}
						</p>
					) : null}
				</div>

				<StatefulButton
					type="submit"
					size="lg"
					state={status === "sending" ? "loading" : "idle"}
					loadingText="Sending"
					className="mt-6 w-full"
				>
					Send message
				</StatefulButton>
			</form>
		</ScrollReveal>
	);
}
