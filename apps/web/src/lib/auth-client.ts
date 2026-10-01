import { roles } from "@himalref/auth/permissions";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ENV } from "../env";

// Roles and permissions live in `@himalref/auth/permissions`; the client
// checks them locally through `usePermissions`, the server enforces them.
export const authClient = createAuthClient({
	baseURL: ENV.VITE_SERVER_URL,
	plugins: [adminClient({ roles })],
});
