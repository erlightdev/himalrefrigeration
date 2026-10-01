import { useEffect, useState } from "react";

import type { ButtonState } from "@/components/motion/button/stateful";

/**
 * Map a react-query mutation onto a beUI StatefulButton: spinner while
 * pending, a brief success/error beat, then back to idle.
 */
export function useButtonState(mutation: {
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	submittedAt: number;
}): ButtonState {
	const [flash, setFlash] = useState<"success" | "error" | null>(null);

	useEffect(() => {
		if (mutation.isPending || mutation.submittedAt === 0) return;
		if (!mutation.isSuccess && !mutation.isError) return;
		setFlash(mutation.isSuccess ? "success" : "error");
		const timer = window.setTimeout(() => setFlash(null), 1600);
		return () => window.clearTimeout(timer);
	}, [
		mutation.isPending,
		mutation.isSuccess,
		mutation.isError,
		mutation.submittedAt,
	]);

	if (mutation.isPending) return "loading";
	return flash ?? "idle";
}
