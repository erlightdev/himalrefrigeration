import {
	assignableRoles,
	canManage,
	hasPermission,
	type Permissions,
	primaryRole,
} from "@himalref/auth/permissions";
import { useMemo } from "react";

import { authClient } from "@/lib/auth-client";

/**
 * UI-side view of the signed-in user's role. Only for showing and hiding
 * controls — the server re-checks every action.
 */
export function usePermissions() {
	const { data: session, isPending } = authClient.useSession();
	const roleValue = (session?.user as { role?: string | null } | undefined)
		?.role;

	return useMemo(
		() => ({
			isPending,
			userId: session?.user.id,
			role: primaryRole(roleValue),
			can: (permissions: Permissions) => hasPermission(roleValue, permissions),
			canManage: (targetRole: string | null | undefined) =>
				canManage(roleValue, targetRole),
			assignableRoles: assignableRoles(roleValue),
		}),
		[isPending, roleValue, session?.user.id],
	);
}
