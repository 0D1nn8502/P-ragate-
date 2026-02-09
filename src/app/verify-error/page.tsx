"use client";

import { useRouter } from "next/navigation";

export default function VerifyErrorPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-white px-6">
      <div className="max-w-md w-full text-center bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-lg">
        <h1 className="text-2xl font-semibold mb-3">
          Verification failed
        </h1>

        <p className="text-sm text-gray-300 mb-6">
          This verification link is invalid, expired, or has already been used.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/connect")}
            className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 font-medium"
          >
            Resend verification email
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full rounded-xl border border-white/15 hover:bg-white/5 transition px-4 py-2 text-sm"
          >
            Go to home
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          If the problem persists, please contact support.
        </p>
      </div>
    </main>
  );
}
