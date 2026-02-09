"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifySuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after a short pause
    const t = setTimeout(() => {
      router.replace("/");
    }, 2500);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-900 to-black text-white px-6">
      <div className="max-w-md w-full text-center bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-xl">
        
        {/* Check icon */}
        <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-400/20">
          <svg
            className="w-7 h-7 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold mb-2">
          Email verified
        </h1>

        <p className="text-sm text-gray-300 mb-6">
          Your email address has been successfully verified.
        </p>

        <button
          onClick={() => router.push("/")}
          className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 font-medium"
        >
          Continue to home
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Redirecting you automatically…
        </p>
      </div>
    </main>
  );
}
