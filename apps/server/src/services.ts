import { createAuth } from "@himalref/auth";
import { createDb } from "@himalref/db";

import { ENV } from "./env.server";

export const db = createDb(ENV);
export const auth = createAuth(ENV, db);
