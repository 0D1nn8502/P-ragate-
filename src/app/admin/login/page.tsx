import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { hasAdminSession } from "@/lib/admin-auth";
import { loginAction } from "./actions";
import { redirect } from "next/navigation";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const errorCopy: Record<string, string> = {
  missing: "Enter the admin password to continue.",
  invalid: "That password did not match the admin access key.",
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  const { error } = await searchParams;
  const errorMessage = error ? errorCopy[error] ?? errorCopy.invalid : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.22),_rgba(12,10,9,1)_42%)] text-stone-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
        <div className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <section className="rounded-[1.5rem] border border-amber-300/10 bg-[linear-gradient(180deg,rgba(120,53,15,0.28),rgba(28,25,23,0.28))] p-6 sm:p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-100/10 text-amber-100">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">
              Private workspace
            </p>
            <h1 className="mt-4 text-3xl font-serif text-white sm:text-4xl">
              Admin access for experience editing
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300 sm:text-base">
              This area is only for managing wording and content details behind
              the scenes. Nothing here is linked from the public site.
            </p>
            <div className="mt-8 space-y-3 text-sm text-stone-300">
              <p>Use this login to reach the internal experience editor.</p>
              <p>
                Once inside, we can add forms for your friend to update
                descriptions without touching code or SQL.
              </p>
            </div>
            <Link
              href="/"
              className="mt-8 inline-flex text-sm text-amber-200 hover:text-white transition-colors"
            >
              Back to site
            </Link>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-100">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Sign in to admin
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Enter the shared admin password. The session stays on this device
              until you sign out or it expires.
            </p>

            <form action={loginAction} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400"
                >
                  Admin password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-200/20"
                  placeholder="Enter password"
                />
              </div>

              {errorMessage ? (
                <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-200 px-5 py-3 text-sm font-medium text-black transition hover:bg-white"
              >
                Continue to admin
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
