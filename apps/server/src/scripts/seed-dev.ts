/**
 * Local development seed: one account per role so permissions can be tried
 * end to end. Safe to rerun — existing emails are skipped.
 *
 *   bun run db:seed:dev
 *
 * Every account uses DEV_SEED_PASSWORD (default below). Never runs in production.
 */
import { user } from "@himalref/db/schema/auth";
import { eq } from "drizzle-orm";

import { auth, db } from "../services";

if (process.env.NODE_ENV === "production") {
	console.error("Refusing to seed development users in production.");
	process.exit(1);
}

const password = process.env.DEV_SEED_PASSWORD ?? "himal-dev-password";

const accounts = [
	{ name: "Dev Owner", email: "owner@himalref.test", role: "owner" },
	{ name: "Dev Admin", email: "admin@himalref.test", role: "admin" },
	{ name: "Dev Staff", email: "staff@himalref.test", role: "staff" },
	{ name: "Dev Customer", email: "customer@himalref.test", role: "customer" },
] as const;

for (const account of accounts) {
	const [existing] = await db
		.select({ id: user.id })
		.from(user)
		.where(eq(user.email, account.email));
	if (!existing) {
		await auth.api.signUpEmail({
			body: { name: account.name, email: account.email, password },
		});
	}
	await db
		.update(user)
		.set({ role: account.role })
		.where(eq(user.email, account.email));
	console.log(
		`${existing ? "kept" : "created"} ${account.role.padEnd(8)} ${account.email}`,
	);
}

process.exit(0);
