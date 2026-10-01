import { useEffect } from "react";

import {
	AnimatedToastStack,
	useAnimatedToastStack,
} from "@/components/motion/animated-toast-stack";
import { registerToaster } from "@/lib/toast";

export function Toaster() {
	const { toasts, showToast, updateToast, dismissToast } =
		useAnimatedToastStack({ limit: 5 });

	useEffect(() => {
		registerToaster({
			show: showToast,
			update: updateToast,
			dismiss: dismissToast,
		});
		return () => registerToaster(null);
	}, [showToast, updateToast, dismissToast]);

	return (
		<AnimatedToastStack
			toasts={toasts}
			onDismiss={dismissToast}
			position="bottom-right"
			fixed
		/>
	);
}
