import {
	hasPermission,
	primaryRole,
	ROLE_LABELS,
	type Role,
	roles,
	statement,
} from "@himalref/auth/permissions";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@himalref/ui/components/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@himalref/ui/components/dropdown-menu";
import { Skeleton } from "@himalref/ui/components/skeleton";
import { cn } from "@himalref/ui/lib/utils";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {
	Ban,
	Check,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	Search,
	Trash2,
	UserPlus,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import { ConfirmDeleteModal } from "@/features/dashboard/components/confirm-delete-modal";
import { Button } from "@/components/motion/button/base";
import { StatefulButton } from "@/components/motion/button/stateful";
import { Input } from "@/components/motion/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/motion/select";
import { Table as DataTable } from "@/components/motion/table";
import { UserAvatar } from "@/features/dashboard/components/user-avatar";
import { useButtonState } from "@/hooks/use-button-state";
import { usePermissions } from "@/hooks/use-permissions";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/_auth/settings/users")({
	beforeLoad: ({ context }) => {
		const role = (context.session.data?.user as { role?: string | null })?.role;
		if (!hasPermission(role, { user: ["list"] })) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: UsersPage,
});

const PAGE_SIZE = 10;
// The beUI table virtualises inside a fixed-height viewport; size it to the
// rows on screen so short lists don't leave a gap.
const TABLE_HEADER_HEIGHT = 62;
const USER_ROW_HEIGHT = 60;
const MATRIX_ROW_HEIGHT = 48;
const ROLE_ORDER: Role[] = ["owner", "admin", "staff", "customer"];

type ManagedUser = {
	id: string;
	name: string;
	email: string;
	role?: string | null;
	banned?: boolean | null;
	banReason?: string | null;
	image?: string | null;
	createdAt: Date | string;
};

function errorMessage(error: unknown) {
	if (error && typeof error === "object" && "message" in error) {
		return String((error as { message: unknown }).message);
	}
	return "Something went wrong";
}

/** Better Auth returns `{ data, error }`; turn errors into throws for react-query. */
async function unwrap<T>(
	promise: Promise<{ data: T | null; error: unknown }>,
): Promise<T> {
	const { data, error } = await promise;
	if (error) throw new Error(errorMessage(error));
	return data as T;
}

function UsersPage() {
	const permissions = usePermissions();
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
	const [page, setPage] = useState(0);
	const [createOpen, setCreateOpen] = useState(false);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setDebouncedSearch(search.trim());
			setPage(0);
		}, 250);
		return () => window.clearTimeout(timer);
	}, [search]);

	const usersQuery = useQuery({
		queryKey: ["admin-users", debouncedSearch, roleFilter, page],
		placeholderData: keepPreviousData,
		queryFn: () =>
			unwrap(
				authClient.admin.listUsers({
					query: {
						limit: PAGE_SIZE,
						offset: page * PAGE_SIZE,
						sortBy: "createdAt",
						sortDirection: "desc",
						...(debouncedSearch
							? {
									searchValue: debouncedSearch,
									searchField: debouncedSearch.includes("@") ? "email" : "name",
									searchOperator: "contains" as const,
								}
							: {}),
						...(roleFilter !== "all"
							? {
									filterField: "role",
									filterValue: roleFilter,
									filterOperator: "eq" as const,
								}
							: {}),
					},
				}),
			),
	});
	const stats = useQuery(orpc.users.stats.queryOptions());

	const users = (usersQuery.data?.users ?? []) as ManagedUser[];
	const total = usersQuery.data?.total ?? 0;
	const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
	const canCreate = permissions.can({ user: ["create"] });

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
				<div>
					<h2 className="font-medium text-sm">Team members</h2>
					<p className="mt-1 text-muted-foreground text-sm">
						Manage who can sign in and what they can access.
					</p>
				</div>
				{canCreate ? (
					<Button size="sm" onClick={() => setCreateOpen(true)}>
						<UserPlus className="size-3.5" />
						Add user
					</Button>
				) : null}
			</div>
			<dl
				className="grid grid-cols-2 rounded-xl border border-border sm:grid-cols-4"
				aria-label="User summary"
			>
				<Stat label="Total" value={stats.data?.total} />
				<Stat
					label="Team"
					value={
						stats.data
							? (stats.data.byRole.owner ?? 0) +
								(stats.data.byRole.admin ?? 0) +
								(stats.data.byRole.staff ?? 0)
							: undefined
					}
				/>
				<Stat
					label="Customers"
					value={stats.data ? (stats.data.byRole.customer ?? 0) : undefined}
				/>
				<Stat label="Banned" value={stats.data?.banned} />
			</dl>

			<div className="rounded-xl border border-border">
				<div className="flex flex-col gap-3 border-b p-3 sm:flex-row sm:items-center sm:justify-between">
					<Input
						value={search}
						onChange={setSearch}
						placeholder="Search name or email"
						aria-label="Search users"
						leftIcon={<Search className="size-4" />}
						className="w-full sm:max-w-xs"
					/>
					<Select
						value={roleFilter}
						onValueChange={(value) => {
							setRoleFilter(value as "all" | Role);
							setPage(0);
						}}
						className="z-30 w-full sm:w-44"
					>
						<SelectTrigger className="h-8 py-1">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All roles</SelectItem>
							{ROLE_ORDER.map((role) => (
								<SelectItem key={role} value={role}>
									{ROLE_LABELS[role]}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<DataTable<ManagedUser>
					data={users}
					getRowId={(user) => user.id}
					loading={usersQuery.isPending}
					skeletonRows={4}
					rowHeight={USER_ROW_HEIGHT}
					height={
						TABLE_HEADER_HEIGHT +
						Math.max(usersQuery.isPending ? 4 : users.length, 3) *
							USER_ROW_HEIGHT
					}
					className="rounded-none border-0"
					emptyState={
						<p className="py-10 text-center text-muted-foreground text-sm">
							{usersQuery.isError
								? errorMessage(usersQuery.error)
								: "No users match these filters."}
						</p>
					}
					columns={[
						{
							key: "user",
							header: "User",
							cell: (user) => (
								<UserCell user={user} isSelf={user.id === permissions.userId} />
							),
						},
						{
							key: "role",
							header: "Role",
							width: "130px",
							cell: (user) => <RoleBadge role={primaryRole(user.role)} />,
						},
						{
							key: "status",
							header: "Status",
							width: "110px",
							cell: (user) => <StatusCell banned={user.banned} />,
						},
						{
							key: "createdAt",
							header: "Joined",
							width: "130px",
							cell: (user) => (
								<span className="text-muted-foreground text-xs">
									{dateFormat.format(new Date(user.createdAt))}
								</span>
							),
						},
						{
							key: "actions",
							header: <span className="sr-only">Actions</span>,
							width: "64px",
							align: "right",
							cell: (user) => <UserActions user={user} />,
						},
					]}
				/>

				<div className="flex items-center justify-between gap-3 border-t px-4 py-2.5 text-muted-foreground text-xs">
					<span>
						{total === 0
							? "0 users"
							: `${page * PAGE_SIZE + 1}–${Math.min(
									(page + 1) * PAGE_SIZE,
									total,
								)} of ${total}`}
					</span>
					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="icon"
							disabled={page === 0}
							onClick={() => setPage((p) => p - 1)}
							aria-label="Previous page"
						>
							<ChevronLeft className="size-4" />
						</Button>
						<span className="px-2">
							{page + 1} / {pageCount}
						</span>
						<Button
							variant="ghost"
							size="icon"
							disabled={page + 1 >= pageCount}
							onClick={() => setPage((p) => p + 1)}
							aria-label="Next page"
						>
							<ChevronRight className="size-4" />
						</Button>
					</div>
				</div>
			</div>

			<PermissionMatrix />

			{canCreate ? (
				<CreateUserDialog open={createOpen} onOpenChange={setCreateOpen} />
			) : null}
		</div>
	);
}

function Stat({ label, value }: { label: string; value: number | undefined }) {
	return (
		<div className="border-border border-b px-4 py-3.5 odd:border-r sm:border-r sm:border-b-0 sm:last:border-r-0">
			<dt className="text-muted-foreground text-xs">{label}</dt>
			<dd className="mt-1 font-semibold text-xl tabular-nums tracking-tight">
				{value === undefined ? <Skeleton className="h-7 w-10" /> : value}
			</dd>
		</div>
	);
}

const ROLE_DOT: Record<Role, string> = {
	owner: "bg-primary",
	admin: "bg-primary/60",
	staff: "bg-foreground/40",
	customer: "bg-muted-foreground/30",
};

function RoleBadge({ role }: { role: Role }) {
	return (
		<span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-medium text-[11px] text-foreground">
			<span className={cn("size-1.5 rounded-full", ROLE_DOT[role])} />
			{ROLE_LABELS[role]}
		</span>
	);
}

function useInvalidateUsers() {
	const queryClient = useQueryClient();
	return () => {
		queryClient.invalidateQueries({ queryKey: ["admin-users"] });
		queryClient.invalidateQueries({ queryKey: orpc.users.stats.key() });
	};
}

function UserActions({ user }: { user: ManagedUser }) {
	const permissions = usePermissions();
	const invalidate = useInvalidateUsers();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const role = primaryRole(user.role);
	const isSelf = user.id === permissions.userId;
	const manageable = !isSelf && permissions.canManage(user.role);

	const setRole = useMutation({
		mutationFn: (next: Role) =>
			unwrap(authClient.admin.setRole({ userId: user.id, role: next })),
		onSuccess: (_, next) => {
			toast.success(`${user.name} is now ${ROLE_LABELS[next].toLowerCase()}`);
			invalidate();
		},
		onError: (error) => toast.error(errorMessage(error)),
	});

	const toggleBan = useMutation({
		mutationFn: () =>
			user.banned
				? unwrap(authClient.admin.unbanUser({ userId: user.id }))
				: unwrap(authClient.admin.banUser({ userId: user.id })),
		onSuccess: () => {
			toast.success(
				user.banned ? `${user.name} unbanned` : `${user.name} banned`,
			);
			invalidate();
		},
		onError: (error) => toast.error(errorMessage(error)),
	});

	const remove = useMutation({
		mutationFn: () => unwrap(authClient.admin.removeUser({ userId: user.id })),
		onSuccess: () => invalidate(),
		onError: (error) => toast.error(errorMessage(error)),
	});

	const canSetRole = manageable && permissions.can({ user: ["set-role"] });
	const canBan = manageable && permissions.can({ user: ["ban"] });
	const canDelete = manageable && permissions.can({ user: ["delete"] });
	const hasActions = canSetRole || canBan || canDelete;

	return (
		<div className="flex justify-end">
			{/* Non-modal: a modal menu locks page scroll, and the delete modal
			    opening from it would save that lock as the state to restore. */}
			{hasActions ? (
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger
						aria-label={`Actions for ${user.name}`}
						className="inline-grid size-8 place-items-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-expanded:bg-muted"
					>
						<MoreHorizontal className="size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48 bg-card">
						<DropdownMenuGroup>
							<DropdownMenuLabel className="truncate">
								{user.name}
							</DropdownMenuLabel>
							{canSetRole ? (
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
									<DropdownMenuSubContent className="bg-card">
										<DropdownMenuRadioGroup
											value={role}
											onValueChange={(next) => {
												if (next !== role) setRole.mutate(next as Role);
											}}
										>
											{permissions.assignableRoles.map((option) => (
												<DropdownMenuRadioItem key={option} value={option}>
													{ROLE_LABELS[option]}
												</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							) : null}
							{canBan ? (
								<DropdownMenuItem onClick={() => toggleBan.mutate()}>
									<Ban />
									{user.banned ? "Unban user" : "Ban user"}
								</DropdownMenuItem>
							) : null}
						</DropdownMenuGroup>
						{canDelete ? (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									variant="destructive"
									onClick={() => setConfirmDelete(true)}
								>
									<Trash2 />
									Delete user
								</DropdownMenuItem>
							</>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null}

			<ConfirmDeleteModal
				open={confirmDelete}
				onOpenChange={setConfirmDelete}
				title={`Delete ${user.name}?`}
				description={`This permanently removes ${user.email} and signs them out everywhere. It can't be undone.`}
				confirmLabel="Delete user"
				doneLabel={`${user.name} was removed`}
				onConfirm={() => remove.mutateAsync()}
			/>
		</div>
	);
}

function UserCell({ user, isSelf }: { user: ManagedUser; isSelf: boolean }) {
	return (
		<div className="flex min-w-0 items-center gap-3">
			<UserAvatar name={user.name} image={user.image} tone="muted" />
			<div className="min-w-0">
				<p className="truncate font-medium text-sm">
					{user.name}
					{isSelf ? (
						<span className="ml-1.5 font-normal text-muted-foreground text-xs">
							You
						</span>
					) : null}
				</p>
				<p className="truncate text-muted-foreground text-xs">{user.email}</p>
			</div>
		</div>
	);
}

function StatusCell({ banned }: { banned?: boolean | null }) {
	return banned ? (
		<span className="inline-flex items-center gap-1.5 text-destructive text-xs">
			<span className="size-1.5 rounded-full bg-destructive" />
			Banned
		</span>
	) : (
		<span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
			<span className="size-1.5 rounded-full bg-success" />
			Active
		</span>
	);
}

const dateFormat = new Intl.DateTimeFormat(undefined, {
	day: "numeric",
	month: "short",
	year: "numeric",
});

function CreateUserDialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const permissions = usePermissions();
	const invalidate = useInvalidateUsers();
	const defaultRole: Role = permissions.assignableRoles.includes("customer")
		? "customer"
		: (permissions.assignableRoles[0] ?? "customer");
	const [role, setRole] = useState<Role>(defaultRole);

	const create = useMutation({
		mutationFn: (input: {
			name: string;
			email: string;
			password: string;
			role: Role;
		}) => unwrap(authClient.admin.createUser(input)),
		onSuccess: (_, input) => {
			toast.success(
				`${input.name} added as ${ROLE_LABELS[input.role].toLowerCase()}`,
			);
			invalidate();
			onOpenChange(false);
		},
		onError: (error) => toast.error(errorMessage(error)),
	});

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const state = useButtonState(create);

	const errors = {
		name: name.trim() ? undefined : "Enter a name",
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
			? undefined
			: "Enter a valid email",
		password: password.length >= 8 ? undefined : "Use at least 8 characters",
	};
	const show = (field: keyof typeof errors) =>
		submitted ? errors[field] : undefined;

	const reset = () => {
		setName("");
		setEmail("");
		setPassword("");
		setSubmitted(false);
		setRole(defaultRole);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitted(true);
		if (errors.name || errors.email || errors.password) return;
		create.mutate(
			{ name: name.trim(), email: email.trim(), password, role },
			{ onSuccess: reset },
		);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				onOpenChange(next);
				if (!next) reset();
			}}
		>
			<DialogContent className="gap-0 rounded-2xl p-0 sm:max-w-md">
				<form onSubmit={onSubmit} noValidate>
					<DialogHeader className="px-6 pt-6">
						<DialogTitle>Add user</DialogTitle>
						<DialogDescription>
							They can sign in straight away with this password.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 px-6 py-5">
						<Input
							label="Full name"
							value={name}
							onChange={setName}
							autoComplete="off"
							error={show("name")}
						/>
						<Input
							label="Email"
							type="email"
							value={email}
							onChange={setEmail}
							autoComplete="off"
							error={show("email")}
						/>
						<Input
							label="Temporary password"
							type="password"
							value={password}
							onChange={setPassword}
							autoComplete="new-password"
							error={show("password")}
						/>
						<div className="flex flex-col gap-1.5">
							<span className="px-1 font-medium text-sm">Role</span>
							<Select
								value={role}
								onValueChange={(value) => setRole(value as Role)}
								className="z-30"
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{permissions.assignableRoles.map((option) => (
										<SelectItem key={option} value={option}>
											{ROLE_LABELS[option]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter className="mx-0 mb-0 gap-2 rounded-b-2xl border-t px-6 py-4">
						<Button
							type="button"
							variant="ghost"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<StatefulButton
							type="submit"
							state={state}
							loadingText="Adding"
							successText="Added"
						>
							Add user
						</StatefulButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

function GrantCell({
	role,
	resource,
}: {
	role: Role;
	resource: keyof typeof statement;
}) {
	const granted =
		(roles[role].statements as Record<string, readonly string[]>)[resource] ??
		[];
	if (granted.length === 0) {
		return <span className="text-muted-foreground/60 text-xs">—</span>;
	}
	if (granted.length === statement[resource].length) {
		return (
			<span className="inline-flex items-center gap-1 text-xs">
				<Check className="size-3.5 text-success" />
				Full
			</span>
		);
	}
	return (
		<span className="text-muted-foreground text-xs">{granted.join(", ")}</span>
	);
}

const RESOURCE_LABELS: Record<keyof typeof statement, string> = {
	user: "Users",
	session: "Sessions",
	serviceRequest: "Service requests",
	installation: "Installations",
	warranty: "Warranties",
	invoice: "Invoices",
	settings: "Settings",
};

function PermissionMatrix() {
	const resources = Object.keys(statement) as Array<keyof typeof statement>;

	return (
		<section className="rounded-xl border border-border">
			<div className="border-b px-4 py-3.5">
				<h2 className="font-medium text-sm">Roles &amp; permissions</h2>
				<p className="mt-1 text-muted-foreground text-xs">
					Roles only manage people ranked below them. Owners manage everyone.
				</p>
			</div>
			<DataTable<keyof typeof statement>
				data={resources}
				getRowId={(resource) => resource}
				rowHeight={MATRIX_ROW_HEIGHT}
				height={TABLE_HEADER_HEIGHT + resources.length * MATRIX_ROW_HEIGHT}
				className="rounded-none border-0"
				columns={[
					{
						key: "resource",
						header: "Resource",
						width: "170px",
						cell: (resource) => (
							<span className="font-medium text-sm">
								{RESOURCE_LABELS[resource]}
							</span>
						),
					},
					...ROLE_ORDER.map((role) => ({
						key: role,
						header: <RoleBadge role={role} />,
						cell: (resource: keyof typeof statement) => (
							<GrantCell role={role} resource={resource} />
						),
					})),
				]}
			/>
		</section>
	);
}
