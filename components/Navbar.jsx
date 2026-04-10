"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, LogOut, Wallet } from "lucide-react";

const clip =
  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

function shortenAddress(addr) {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

const nav = [
  { href: "/", label: "Welcome" },
  { href: "/game", label: "Arena" },
  { href: "/form", label: "Form" },
];

export default function Navbar({
  address,
  loadingConnect,
  onConnect,
  onDisconnect,
}) {
  const connected = Boolean(address);
  const pathname = usePathname();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[60] border-b border-white/10 bg-black/50 backdrop-blur-xl"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:flex-initial">
          <Link href="/" className="flex min-w-0 items-center gap-3 hover:opacity-90">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-purple-500/60 bg-gradient-to-br from-purple-600/40 to-pink-600/40 text-lg shadow-[0_0_20px_rgba(168,85,247,0.45)]"
              style={{ clipPath: clip, fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}
            >
              P
            </div>
            <div className="min-w-0">
              <div
                className="text-[10px] tracking-[0.2em] text-purple-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                WEB3 ARCADE
              </div>
              <div
                className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-sm font-bold text-transparent"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Potion Brewing Race
              </div>
            </div>
          </Link>
        </div>

        <div className="order-last flex w-full items-center justify-center gap-1 border-t border-white/5 pt-3 sm:order-none sm:flex-1 sm:border-t-0 sm:pt-0 md:justify-center">
          {nav.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded px-3 py-1.5 text-[11px] font-bold tracking-wide transition-colors sm:text-xs ${
                  active
                    ? "bg-purple-600/40 text-white shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:shrink-0">
          {connected && (
            <div
              className="hidden items-center gap-2 border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 sm:flex"
              style={{ clipPath: clip }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              <span
                className="font-mono text-xs text-cyan-100"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {shortenAddress(address)}
              </span>
            </div>
          )}

          {connected && onDisconnect ? (
            <motion.button
              type="button"
              onClick={onDisconnect}
              className="relative flex items-center gap-2 overflow-hidden border border-rose-500/50 bg-rose-950/40 px-5 py-3 text-sm font-bold text-rose-100"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                clipPath: clip,
                boxShadow: "0 0 20px rgba(244,63,94,0.35), inset 0 0 12px rgba(255,255,255,0.06)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <LogOut className="h-5 w-5" />
              Disconnect
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={onConnect}
              disabled={loadingConnect}
              className="relative flex items-center gap-2 overflow-hidden px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                clipPath: clip,
                boxShadow: "0 0 28px rgba(168,85,247,0.55), inset 0 0 18px rgba(255,255,255,0.08)",
              }}
              whileHover={{ scale: loadingConnect ? 1 : 1.03 }}
              whileTap={{ scale: loadingConnect ? 1 : 0.97 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
              <span
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.45) 4px, rgba(255,255,255,0.45) 5px),
                    repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.45) 4px, rgba(255,255,255,0.45) 5px)`,
                }}
              />
              <span className="relative flex items-center gap-2">
                {loadingConnect ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wallet className="h-5 w-5" />}
                {loadingConnect ? "Connecting…" : "Connect wallet"}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
