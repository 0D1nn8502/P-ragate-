import Header from "@/components/Header";
import ExperiencesBoard from "@/components/ExperiencesBoard";
import { Castoro_Titling } from "next/font/google";
import { getPublishedExperiences } from "@/lib/experiences";

const medievalsharp = Castoro_Titling({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function ExperiencesPage() {
  const experiences = await getPublishedExperiences();

  return (
    <div className="min-h-screen bg-black text-amber-100">
      <Header />

      <div className="py-8 sm:py-12 lg:py-16 text-center border-b border-amber-900/20 px-4">
        <h1
          className={`
            text-3xl sm:text-4xl lg:text-5xl
            mb-3 sm:mb-4
            text-amber-400
            tracking-wide sm:tracking-widest
            pl-[0.2em] sm:pl-[0.3em]
            ${medievalsharp.className}
          `}
        >
          Experiences
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-amber-300/80 font-serif italic max-w-2xl mx-auto">
          Unforgettable adventures await thee, brave traveler
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center gap-3 max-w-7xl mx-auto">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-500/80">
            Published journeys
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />
        </div>

        <ExperiencesBoard experiences={experiences} />
      </div>

      <div className="px-8 py-8 mt-12 border-t border-amber-900/20">
        <div className="flex justify-center items-center gap-4 text-amber-800 text-sm font-serif italic">
          <div className="h-px w-24 bg-amber-900/50" />
          <span>May fortune favor thy journey</span>
          <div className="h-px w-24 bg-amber-900/50" />
        </div>
      </div>
    </div>
  );
}
