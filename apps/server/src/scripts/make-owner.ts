/**
 * Promote an existing account to owner — the bootstrap for a fresh database,
 * since only owners can create other owners from the dashboard.
 *
 *   bun run auth:make-owner -- someone@example.com
 */
import { user } from "@himalref/db/schema/auth";
import { eq } from "drizzle-orm";

import { db } from "../services";

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
	console.error("Usage: bun run auth:make-owner -- <email>");
	process.exit(1);
}

const [updated] = await db
	.update(user)
	.set({ role: "owner" })
	.where(eq(user.email, email))
	.returning({ id: user.id, name: user.name });

if (!updated) {
	console.error(`No user with email ${email}. Sign up first, then rerun.`);
	process.exit(1);
}

console.log(`${updated.name} <${email}> is now an owner.`);
process.exit(0);
