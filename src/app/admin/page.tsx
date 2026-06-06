import { logoutAction } from "@/app/admin/login/actions";
import ExperienceEditor from "@/app/admin/ExperienceEditor";
import { requireAdminSession } from "@/lib/admin-auth";
import { getPublishedExperiences } from "@/lib/experiences";

export default async function AdminPage() {
  await requireAdminSession();
  const experiences = await getPublishedExperiences();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0c0a09_0%,#1c1917_100%)] px-4 py-8 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-serif text-white sm:text-4xl">
              Experience workspace
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
              This is the private side of the site. Your friend can update
              wording, image paths, and homepage shelf placement here without
              touching code.
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:bg-white hover:text-black"
            >
              Sign out
            </button>
          </form>
        </div>

        <section className="mt-8 grid gap-4">
          {experiences.map((experience) => (
            <ExperienceEditor key={experience.id} experience={experience} />
          ))}
        </section>
      </div>
    </main>
  );
}
