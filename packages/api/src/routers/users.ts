import { user } from "@himalref/db/schema/auth";
import { count, sql } from "drizzle-orm";

import { protectedProcedure, requirePermission } from "../index";

export const usersRouter = {
	stats: protectedProcedure
		.use(requirePermission({ user: ["list"] }))
		.handler(async ({ context }) => {
			const rows = await context.db
				.select({
					role: sql<string>`coalesce(${user.role}, 'customer')`,
					banned: sql<boolean>`coalesce(${user.banned}, false)`,
					total: count(),
				})
				.from(user)
				.groupBy(sql`1`, sql`2`);

			const byRole: Record<string, number> = {};
			let banned = 0;
			let total = 0;
			for (const row of rows) {
				byRole[row.role] = (byRole[row.role] ?? 0) + row.total;
				if (row.banned) banned += row.total;
				total += row.total;
			}
			return { total, banned, byRole };
		}),
};
