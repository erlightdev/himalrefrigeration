import { Check, Trash2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/motion/button/base";
import { StatefulButton } from "@/components/motion/button/stateful";
import { MorphingModal } from "@/components/motion/morphing-modal";

type View = "confirm" | "done";

/**
 * Destructive confirmation on the beUI morphing modal: confirm → (pending)
 * → a short "done" view the panel morphs into before closing.
 */
export function ConfirmDeleteModal({
	open,
	onOpenChange,
	title,
	description,
	confirmLabel = "Delete",
	doneLabel = "Deleted",
	onConfirm,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	confirmLabel?: string;
	doneLabel?: string;
	/** Resolve on success, throw to keep the modal open (the caller toasts). */
	onConfirm: () => Promise<unknown>;
}) {
	const titleId = useId();
	const descriptionId = useId();
	const cancelRef = useRef<HTMLButtonElement>(null);
	const [view, setView] = useState<View>("confirm");
	const [pending, setPending] = useState(false);

	useEffect(() => {
		if (open) setView("confirm");
	}, [open]);

	const close = () => {
		if (!pending) onOpenChange(false);
	};
	const closeRef = useRef(close);
	closeRef.current = close;

	// The beUI panel handles motion; keyboard dismissal and initial focus are ours.
	useEffect(() => {
		if (!open) return;
		// Wait out the menu that opened us returning focus to its trigger.
		const timer = window.setTimeout(() => cancelRef.current?.focus(), 60);
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeRef.current();
		};
		// Capture phase: menus and popovers underneath may stop propagation.
		window.addEventListener("keydown", onKey, true);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener("keydown", onKey, true);
		};
	}, [open]);

	const confirm = async () => {
		setPending(true);
		try {
			await onConfirm();
			setView("done");
			window.setTimeout(() => onOpenChange(false), 900);
		} catch {
			// Caller surfaces the error; stay on the confirm view.
		} finally {
			setPending(false);
		}
	};

	// Portalled so it escapes whatever it's declared in (a right-aligned,
	// no-wrap table cell, a transformed row) and inherits nothing from it.
	if (typeof document === "undefined") return null;

	return createPortal(
		<MorphingModal
			viewId={open ? view : null}
			onClose={close}
			placement="center"
			className="text-left"
		>
			{view === "confirm" ? (
				<div
					role="alertdialog"
					aria-modal="true"
					aria-labelledby={titleId}
					aria-describedby={descriptionId}
				>
					<div className="mb-4 grid size-10 place-items-center rounded-full bg-destructive/10 text-destructive">
						<Trash2 className="size-5" aria-hidden="true" />
					</div>
					<h2 id={titleId} className="font-semibold text-base tracking-tight">
						{title}
					</h2>
					<p
						id={descriptionId}
						className="mt-1.5 text-muted-foreground text-sm leading-relaxed"
					>
						{description}
					</p>
					<div className="mt-6 flex justify-end gap-2">
						<Button
							ref={cancelRef}
							variant="ghost"
							onClick={close}
							disabled={pending}
						>
							Cancel
						</Button>
						<StatefulButton
							state={pending ? "loading" : "idle"}
							loadingText="Deleting"
							onClick={confirm}
							className="bg-destructive text-white hover:bg-destructive/90"
						>
							{confirmLabel}
						</StatefulButton>
					</div>
				</div>
			) : (
				<div
					role="status"
					className="flex flex-col items-center py-4 text-center"
				>
					<div className="mb-3 grid size-10 place-items-center rounded-full bg-success/10 text-success">
						<Check className="size-5" aria-hidden="true" />
					</div>
					<p className="font-medium text-sm">{doneLabel}</p>
				</div>
			)}
		</MorphingModal>,
		document.body,
	);
}
