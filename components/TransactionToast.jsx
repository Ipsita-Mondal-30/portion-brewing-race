"use client";

import { motion } from "framer-motion";
import { Loader2, X, CheckCircle2, AlertCircle } from "lucide-react";

export function TransactionToast({ txStatus, onDismiss }) {
  if (!txStatus?.type) return null;

  const isError = txStatus.type === "error";
  const isSuccess = txStatus.type === "success";
  const isPending = txStatus.type === "pending";

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-[70] w-[min(520px,calc(100%-2rem))] -translate-x-1/2"
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 24, opacity: 0 }}
    >
      <div
        className={`relative flex items-start gap-3 border-2 px-4 py-3 shadow-2xl backdrop-blur-xl ${
          isError
            ? "border-red-500/60 bg-red-950/90 text-red-100"
            : isSuccess
              ? "border-emerald-500/60 bg-emerald-950/90 text-emerald-50"
              : "border-cyan-500/60 bg-slate-950/90 text-cyan-50"
        }`}
        style={{
          clipPath:
            "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
          boxShadow: isError
            ? "0 0 32px rgba(239,68,68,0.35)"
            : isSuccess
              ? "0 0 32px rgba(16,185,129,0.35)"
              : "0 0 32px rgba(34,211,238,0.35)",
        }}
      >
        {isPending ? (
          <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" />
        ) : isSuccess ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
        ) : (
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
        )}
        <p className="flex-1 text-sm leading-snug" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {txStatus.message}
        </p>
        {!isPending && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded border border-white/20 p-1 text-white/80 hover:bg-white/10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
