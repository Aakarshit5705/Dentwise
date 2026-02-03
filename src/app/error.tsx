"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow orbs */}
      <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 blur-xl opacity-60" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/60 border border-white/10">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Text */}
          <h1 className="text-3xl font-semibold tracking-tight">
            Well… this is awkward
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Something unexpected just happened.  
            The page couldn’t load, but everything else is still fine.
          </p>

          {/* Dev-only error */}
          {process.env.NODE_ENV === "development" && (
            <pre className="w-full max-h-32 overflow-auto rounded-xl bg-black/50 p-3 text-left text-xs text-red-400 border border-white/10">
              {error.message}
            </pre>
          )}

          {/* Action */}
          <Button
            asChild
            className="group mt-2 rounded-full px-6 py-5 text-sm font-medium"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4 transition group-hover:-translate-x-0.5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
    </div>
  );
}