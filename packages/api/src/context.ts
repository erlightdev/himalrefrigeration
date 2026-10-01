import type { Session } from "@himalref/auth";
import type { Database } from "@himalref/db";

export type Context = {
	session: Session | null;
	db: Database;
};
