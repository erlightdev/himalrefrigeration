import { primaryRole, ROLE_LABELS } from "@himalref/auth/permissions";
import { Skeleton } from "@himalref/ui/components/skeleton";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import { Button } from "@/components/motion/button/base";
import { StatefulButton } from "@/components/motion/button/stateful";
import { Input } from "@/components/motion/input";
import { Switch } from "@/components/motion/switch";
import { SettingsSection } from "@/components/settings/section";
import { UserAvatar } from "@/components/user-avatar";
import { useButtonState } from "@/hooks/use-button-state";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";

export const Route = createFileRoute("/_auth/settings/profile")({
	component: ProfileSettings,
});

const AVATAR_SIZE = 160;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const MIN_PASSWORD = 8;

async function unwrap<T>(
	promise: Promise<{ data: T | null; error: { message?: string } | null }>,
): Promise<T> {
	const { data, error } = await promise;
	if (error) throw new Error(error.message ?? "Something went wrong");
	return data as T;
}

/**
 * Crop to a centred square and downscale before saving. There is no file
 * storage yet, so the avatar lives on the user row as a small WebP data URL
 * (a few KB) rather than the original upload.
 */
function resizeAvatar(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			const side = Math.min(img.naturalWidth, img.naturalHeight);
			const canvas = document.createElement("canvas");
			canvas.width = AVATAR_SIZE;
			canvas.height = AVATAR_SIZE;
			const ctx = canvas.getContext("2d");
			if (!ctx) return reject(new Error("Could not process image"));
			ctx.imageSmoothingQuality = "high";
			ctx.drawImage(
				img,
				(img.naturalWidth - side) / 2,
				(img.naturalHeight - side) / 2,
				side,
				side,
				0,
				0,
				AVATAR_SIZE,
				AVATAR_SIZE,
			);
			resolve(canvas.toDataURL("image/webp", 0.85));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error("That file isn't a readable image"));
		};
		img.src = url;
	});
}

function ProfileSettings() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending || !session) {
		return (
			<div className="grid gap-8 py-2">
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
			</div>
		);
	}

	const user = session.user as typeof session.user & { role?: string | null };

	return (
		<div>
			<PhotoSection
				name={user.name}
				image={user.image ?? null}
				role={user.role}
			/>
			<NameSection name={user.name} />
			<EmailSection email={user.email} />
			<PasswordSection />
		</div>
	);
}

function PhotoSection({
	name,
	image,
	role,
}: {
	name: string;
	image: string | null;
	role?: string | null;
}) {
	const inputRef = useRef<HTMLInputElement>(null);

	const save = useMutation({
		mutationFn: (next: string | null) =>
			unwrap(authClient.updateUser({ image: next })),
		onSuccess: (_, next) =>
			toast.success(next ? "Photo updated" : "Photo removed"),
		onError: (error) => toast.error(error.message),
	});

	const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Choose an image file");
			return;
		}
		if (file.size > MAX_UPLOAD_BYTES) {
			toast.error("Image must be under 5 MB");
			return;
		}
		try {
			save.mutate(await resizeAvatar(file));
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	return (
		<SettingsSection
			title="Photo"
			description="Shown in the sidebar and to your team."
		>
			<div className="flex items-center gap-4">
				<UserAvatar name={name} image={image} className="size-14 text-base" />
				<div className="min-w-0 flex-1">
					<p className="truncate font-medium text-sm">{name}</p>
					<p className="text-muted-foreground text-xs">
						{ROLE_LABELS[primaryRole(role)]}
					</p>
				</div>
				<input
					ref={inputRef}
					type="file"
					accept="image/png,image/jpeg,image/webp,image/gif"
					className="sr-only"
					onChange={onFile}
					tabIndex={-1}
					aria-hidden="true"
				/>
				<div className="flex items-center gap-1">
					{image ? (
						<Button
							variant="ghost"
							size="sm"
							disabled={save.isPending}
							onClick={() => save.mutate(null)}
						>
							Remove
						</Button>
					) : null}
					<Button
						variant="secondary"
						size="sm"
						disabled={save.isPending}
						onClick={() => inputRef.current?.click()}
					>
						<Camera className="size-3.5" />
						{image ? "Change" : "Upload"}
					</Button>
				</div>
			</div>
		</SettingsSection>
	);
}

function NameSection({ name }: { name: string }) {
	const [value, setValue] = useState(name);
	const trimmed = value.trim();

	const save = useMutation({
		mutationFn: () => unwrap(authClient.updateUser({ name: trimmed })),
		onError: (error) => toast.error(error.message),
	});
	const state = useButtonState(save);
	const dirty = trimmed.length > 0 && trimmed !== name;

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (dirty) save.mutate();
	};

	return (
		<SettingsSection title="Name" description="How you appear across Himal.">
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-3 sm:flex-row sm:items-start"
			>
				<Input
					aria-label="Full name"
					value={value}
					onChange={setValue}
					maxLength={80}
					autoComplete="name"
					className="flex-1"
					error={
						value.length > 0 && !trimmed ? "Name can't be blank" : undefined
					}
				/>
				<StatefulButton
					type="submit"
					size="md"
					variant={dirty || state !== "idle" ? "primary" : "secondary"}
					state={state}
					disabled={!dirty && state === "idle"}
					loadingText="Saving"
					successText="Saved"
				>
					Save
				</StatefulButton>
			</form>
		</SettingsSection>
	);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailSection({ email }: { email: string }) {
	const [value, setValue] = useState(email);
	const [touched, setTouched] = useState(false);
	const next = value.trim().toLowerCase();
	const valid = EMAIL_PATTERN.test(next);

	const save = useMutation({
		mutationFn: () => unwrap(authClient.changeEmail({ newEmail: next })),
		onSuccess: () =>
			toast.success("Email updated", {
				description: `Sign in with ${next} from now on.`,
			}),
		onError: (error) => toast.error(error.message),
	});
	const state = useButtonState(save);
	const dirty = valid && next !== email.toLowerCase();

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setTouched(true);
		if (dirty) save.mutate();
	};

	return (
		<SettingsSection
			title="Email"
			description="Used to sign in and for service updates."
		>
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-3 sm:flex-row sm:items-start"
			>
				<Input
					aria-label="Email address"
					type="email"
					value={value}
					onChange={setValue}
					onBlur={() => setTouched(true)}
					autoComplete="email"
					className="flex-1"
					error={touched && !valid ? "Enter a valid email" : undefined}
				/>
				<StatefulButton
					type="submit"
					size="md"
					variant={dirty || state !== "idle" ? "primary" : "secondary"}
					state={state}
					disabled={!dirty && state === "idle"}
					loadingText="Saving"
					successText="Saved"
				>
					Update
				</StatefulButton>
			</form>
		</SettingsSection>
	);
}

function PasswordSection() {
	const [current, setCurrent] = useState("");
	const [next, setNext] = useState("");
	const [confirm, setConfirm] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [revokeOthers, setRevokeOthers] = useState(true);

	const errors = {
		current: !current ? "Enter your current password" : undefined,
		next:
			next.length < MIN_PASSWORD
				? `Use at least ${MIN_PASSWORD} characters`
				: next === current
					? "Pick a new password"
					: undefined,
		confirm: confirm !== next ? "Passwords don't match" : undefined,
	};
	const valid = !errors.current && !errors.next && !errors.confirm;

	const save = useMutation({
		mutationFn: () =>
			unwrap(
				authClient.changePassword({
					currentPassword: current,
					newPassword: next,
					revokeOtherSessions: revokeOthers,
				}),
			),
		onSuccess: () => {
			toast.success("Password changed", {
				description: revokeOthers
					? "Other devices have been signed out."
					: undefined,
			});
			setCurrent("");
			setNext("");
			setConfirm("");
			setSubmitted(false);
		},
		onError: (error) => toast.error(error.message),
	});
	const state = useButtonState(save);

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setSubmitted(true);
		if (valid) save.mutate();
	};

	const show = (field: keyof typeof errors) =>
		submitted ? errors[field] : undefined;

	return (
		<SettingsSection
			title="Password"
			description="You'll need your current password to set a new one."
		>
			<form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
				<Input
					label="Current password"
					type="password"
					value={current}
					onChange={setCurrent}
					autoComplete="current-password"
					error={show("current")}
				/>
				<Input
					label="New password"
					type="password"
					value={next}
					onChange={setNext}
					autoComplete="new-password"
					error={show("next")}
				/>
				<Input
					label="Confirm new password"
					type="password"
					value={confirm}
					onChange={setConfirm}
					autoComplete="new-password"
					error={show("confirm")}
				/>
				<div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
					<Switch
						checked={revokeOthers}
						onCheckedChange={setRevokeOthers}
						label="Sign out other devices"
					/>
					<StatefulButton
						type="submit"
						size="md"
						state={state}
						loadingText="Updating"
						successText="Updated"
					>
						Change password
					</StatefulButton>
				</div>
			</form>
		</SettingsSection>
	);
}
