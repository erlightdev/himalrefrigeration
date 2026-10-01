import type {
	ToastInput,
	ToastStatus,
} from "@/components/motion/animated-toast-stack";

type ToastOptions = Omit<ToastInput, "title" | "status">;

type ToastHandlers = {
	show: (input: ToastInput) => string;
	update: (id: string, patch: Partial<ToastInput>) => void;
	dismiss: (id: string) => void;
};

let handlers: ToastHandlers | null = null;
// Toasts fired before <Toaster /> mounts (e.g. from the query client) wait here.
const pending: ToastInput[] = [];
let idSeed = 0;

export function registerToaster(next: ToastHandlers | null) {
	handlers = next;
	if (next) for (const input of pending.splice(0)) next.show(input);
}

function show(
	status: ToastStatus,
	title: ToastInput["title"],
	options?: ToastOptions,
) {
	const input: ToastInput = {
		...options,
		id: options?.id ?? `app-toast-${idSeed++}`,
		title,
		status,
		duration: status === "loading" ? 0 : options?.duration,
	};
	if (handlers) handlers.show(input);
	else pending.push(input);
	return input.id as string;
}

export const toast = Object.assign(
	(title: ToastInput["title"], options?: ToastOptions) =>
		show("neutral", title, options),
	{
		success: (title: ToastInput["title"], options?: ToastOptions) =>
			show("success", title, options),
		error: (title: ToastInput["title"], options?: ToastOptions) =>
			show("error", title, options),
		info: (title: ToastInput["title"], options?: ToastOptions) =>
			show("info", title, options),
		loading: (title: ToastInput["title"], options?: ToastOptions) =>
			show("loading", title, options),
		update: (id: string, patch: Partial<ToastInput>) =>
			handlers?.update(id, patch),
		dismiss: (id: string) => handlers?.dismiss(id),
	},
);
