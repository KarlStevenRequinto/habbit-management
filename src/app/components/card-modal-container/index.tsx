// Modal.tsx
import React, { useEffect, useRef } from "react";

type CardModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    buttonText?: string;
    children: React.ReactNode;
    lockScroll?: boolean;
};

export default function CardModalContainer({ open, onClose, title, buttonText, children, lockScroll = false }: CardModalProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open || !lockScroll) return;
        const { overflowY } = document.documentElement.style;
        document.documentElement.style.overflowY = "hidden";
        return () => {
            document.documentElement.style.overflowY = overflowY;
        };
    }, [open, lockScroll]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center" aria-modal="true" role="dialog">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20" />
            {/* Panel */}
            <div ref={panelRef} className="relative w-11/12 max-w-5xl bg-[var(--background)] rounded-2xl shadow-xl p-6">
                {title ? <h3 className="font-bold text-lg mb-2">{title}</h3> : null}
                <div className="py-2 flex items-center justify-center">{children}</div>
            </div>
        </div>
    );
}
