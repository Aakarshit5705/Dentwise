"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f1a] text-white">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow orb */}
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[140px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-2xl"
      >
        <motion.h1
          animate={{ letterSpacing: ["0.2em", "0.35em", "0.2em"] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-6 text-7xl font-black tracking-[0.3em] text-cyan-400"
        >
          404
        </motion.h1>

        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-zinc-300">
          This location does not exist in the current reality layer. Either the
          coordinates are wrong — or the page never existed.
        </p>

        {/* Home action */}
        <Link href="/" className="group inline-flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40"
          >
            <Home className="h-5 w-5 text-cyan-400" />
          </motion.span>

          <span className="relative text-lg font-semibold text-cyan-300">
            Return Home
            <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
          </span>
        </Link>

        <p className="mt-12 text-xs tracking-widest text-zinc-500">
          ERROR · PAGE_NOT_FOUND
        </p>
      </motion.div>
    </div>
  );
}