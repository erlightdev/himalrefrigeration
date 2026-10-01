import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import type { Database } from "@himalref/db";
import * as schema from "@himalref/db/schema/auth";
import { betterAuth } from "better-auth";
import {
	APIError,
	createAuthMiddleware,
	getSessionFromCtx,
} from "better-auth/api";
import { admin as adminPlugin } from "better-auth/plugins";

import {
	ac,
	assignableRoles,
	canManage,
	DEFAULT_ROLE,
	isRole,
	roles,
} from "./permissions";

export type AuthConfig = {
	BETTER_AUTH_URL: string;
	BETTER_AUTH_SECRET: string;
	CORS_ORIGIN: string;
};

export function createAuth(
	env: AuthConfig,
	database: Database,
	desktopOrigins: readonly string[] = [],
) {
	return betterAuth({
		database: drizzleAdapter(database, {
			provider: "pg",
			schema,
		}),
		trustedOrigins: [env.CORS_ORIGIN, ...desktopOrigins],
		emailAndPassword: { enabled: true },
		user: {
			changeEmail: {
				enabled: true,
				// No mail provider is wired up yet, so unverified accounts switch
				// immediately. Add `emailVerification.sendVerificationEmail` to
				// require confirming the new address instead.
				updateEmailWithoutVerification: true,
			},
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
		},
		hooks: {
			before: enforceRoleHierarchy,
		},
		plugins: [
			adminPlugin({
				ac,
				roles,
				defaultRole: DEFAULT_ROLE,
				adminRoles: ["owner", "admin"],
			}),
		],
	});
}

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];

/** Admin endpoints that act on another user, identified by `body.userId`. */
const TARGETED_ADMIN_PATHS = new Set([
	"/admin/set-role",
	"/admin/ban-user",
	"/admin/unban-user",
	"/admin/remove-user",
	"/admin/update-user",
	"/admin/set-user-password",
	"/admin/impersonate-user",
	"/admin/revoke-user-sessions",
	"/admin/list-user-sessions",
]);

/** Actions nobody may perform on their own account. */
const NO_SELF_PATHS = new Set([
	"/admin/set-role",
	"/admin/ban-user",
	"/admin/remove-user",
	"/admin/impersonate-user",
]);

/**
 * The access-control map says *what* a role can do; this says *to whom*.
 * An actor may only manage users ranked below them (owners manage anyone),
 * and may only grant roles ranked below their own (owners grant anything).
 * Runs before the admin plugin's own permission check.
 */
const enforceRoleHierarchy = createAuthMiddleware(async (ctx) => {
	const isTargeted = TARGETED_ADMIN_PATHS.has(ctx.path);
	if (!isTargeted && ctx.path !== "/admin/create-user") return;

	const session = await getSessionFromCtx(ctx);
	if (!session) return; // the plugin rejects unauthenticated calls itself
	const actorRole = (session.user as { role?: string | null }).role;

	const requested: unknown = ctx.body?.role;
	if (requested !== undefined) {
		const list = Array.isArray(requested) ? requested : [requested];
		const allowed = assignableRoles(actorRole);
		for (const role of list) {
			if (!isRole(role) || !allowed.includes(role)) {
				throw new APIError("FORBIDDEN", {
					message: `You cannot assign the "${String(role)}" role.`,
				});
			}
		}
	}

	if (!isTargeted) return;
	const targetId: unknown = ctx.body?.userId;
	if (typeof targetId !== "string") return;

	if (NO_SELF_PATHS.has(ctx.path) && targetId === session.user.id) {
		throw new APIError("FORBIDDEN", {
			message: "You cannot do that to your own account.",
		});
	}
	if (targetId === session.user.id) return;

	const target = await ctx.context.internalAdapter.findUserById(targetId);
	if (!target) return;
	const targetRole = (target as { role?: string | null }).role;
	if (!canManage(actorRole, targetRole)) {
		throw new APIError("FORBIDDEN", {
			message: "You cannot manage a user with an equal or higher role.",
		});
	}
});
