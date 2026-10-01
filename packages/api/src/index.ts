import { hasPermission, type Permissions } from "@himalref/auth/permissions";
import { ORPCError, os } from "@orpc/server";

import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}
	return next({
		context: {
			session: context.session,
		},
	});
});

export const protectedProcedure = publicProcedure.use(requireAuth);

/**
 * Gate a procedure on the access-control map in `@himalref/auth/permissions`.
 *
 * @example protectedProcedure.use(requirePermission({ invoice: ["create"] }))
 */
export function requirePermission(permissions: Permissions) {
	return o.middleware(async ({ context, next }) => {
		const role = (context.session?.user as { role?: string | null } | undefined)
			?.role;
		if (!context.session?.user) throw new ORPCError("UNAUTHORIZED");
		if (!hasPermission(role, permissions)) throw new ORPCError("FORBIDDEN");
		return next();
	});
}
