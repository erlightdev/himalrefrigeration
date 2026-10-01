import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";

/**
 * Every resource and the actions that can be granted on it. `user` and
 * `session` are the admin plugin's built-in resources; the rest are Himal's.
 */
export const statement = {
	...defaultStatements,
	serviceRequest: ["read", "create", "update", "assign", "delete"],
	installation: ["read", "create", "update", "delete"],
	warranty: ["read", "update"],
	invoice: ["read", "create", "update"],
	settings: ["read", "update"],
} as const;

export const ac = createAccessControl(statement);

export const owner = ac.newRole({
	user: [
		"create",
		"list",
		"set-role",
		"ban",
		"impersonate",
		"impersonate-admins",
		"delete",
		"set-password",
		"set-email",
		"get",
		"update",
	],
	session: ["list", "revoke", "delete"],
	serviceRequest: ["read", "create", "update", "assign", "delete"],
	installation: ["read", "create", "update", "delete"],
	warranty: ["read", "update"],
	invoice: ["read", "create", "update"],
	settings: ["read", "update"],
});

export const admin = ac.newRole({
	user: [
		"create",
		"list",
		"set-role",
		"ban",
		"delete",
		"set-password",
		"get",
		"update",
	],
	session: ["list", "revoke"],
	serviceRequest: ["read", "create", "update", "assign", "delete"],
	installation: ["read", "create", "update", "delete"],
	warranty: ["read", "update"],
	invoice: ["read", "create", "update"],
	settings: ["read"],
});

export const staff = ac.newRole({
	user: ["list", "get"],
	serviceRequest: ["read", "create", "update"],
	installation: ["read", "update"],
	warranty: ["read"],
	invoice: ["read"],
});

export const customer = ac.newRole({
	serviceRequest: ["create"],
});

export const roles = { owner, admin, staff, customer };

export type Role = keyof typeof roles;
export type Permissions = {
	[K in keyof typeof statement]?: Array<(typeof statement)[K][number]>;
};

export const DEFAULT_ROLE: Role = "customer";

/** Higher rank can manage lower ranks; equal or lower cannot. */
export const ROLE_RANK: Record<Role, number> = {
	customer: 0,
	staff: 1,
	admin: 2,
	owner: 3,
};

export const ROLE_LABELS: Record<Role, string> = {
	owner: "Owner",
	admin: "Admin",
	staff: "Staff",
	customer: "Customer",
};

export function isRole(value: unknown): value is Role {
	return typeof value === "string" && Object.hasOwn(roles, value);
}

/** Users may hold several comma-separated roles; the strongest one counts. */
export function primaryRole(value: string | null | undefined): Role {
	const parsed = (value ?? "")
		.split(",")
		.map((r) => r.trim())
		.filter(isRole);
	if (parsed.length === 0) return DEFAULT_ROLE;
	return parsed.reduce((best, r) =>
		ROLE_RANK[r] > ROLE_RANK[best] ? r : best,
	);
}

export function hasPermission(
	role: string | null | undefined,
	permissions: Permissions,
): boolean {
	const parsed = (role ?? "")
		.split(",")
		.map((r) => r.trim())
		.filter(isRole);
	const held = parsed.length > 0 ? parsed : [DEFAULT_ROLE];
	return held.some(
		(r) =>
			roles[r].authorize(permissions as Parameters<typeof owner.authorize>[0])
				.success,
	);
}

/** Roles an actor may grant: strictly below their own, owners grant anything. */
export function assignableRoles(actorRole: string | null | undefined): Role[] {
	const actor = primaryRole(actorRole);
	return (Object.keys(roles) as Role[]).filter((r) =>
		actor === "owner" ? true : ROLE_RANK[r] < ROLE_RANK[actor],
	);
}

/** Whether an actor may act on a target user at all (edit, ban, delete…). */
export function canManage(
	actorRole: string | null | undefined,
	targetRole: string | null | undefined,
): boolean {
	const actor = primaryRole(actorRole);
	const target = primaryRole(targetRole);
	return actor === "owner" || ROLE_RANK[actor] > ROLE_RANK[target];
}
