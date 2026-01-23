"use client";

import { useEffect, ReactNode } from "react";

interface BaseBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const BaseBottomSheet = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: BaseBottomSheetProps) => {
  // lock background scroll when sheet is open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-center">
          <div className="py-1 w-[100px] bg-gray-1 rounded-full h-px mt-4"></div>
        </div>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--color-border-1)] px-4 py-4 flex items-center justify-between z-10">
          <h2 className="text-[20px] font-bold text-[var(--color-text-strong)]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="relative px-4 py-4 space-y-6 overflow-x-hidden max-w-full">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-white border-t border-[var(--color-border-1)] px-4 py-4 flex gap-3">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default BaseBottomSheet;

