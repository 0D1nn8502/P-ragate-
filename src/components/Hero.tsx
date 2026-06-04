import Link from "next/link";

interface HeroSectionProps {
  image: string;
  heading: string;
  content: string;
  className?: string;
}

export default function HeroSection({
  image,
  heading,
  content,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <img
        src={image}
        alt="escape"
        className="w-full min-h-[72vh] sm:min-h-[80vh] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_35%)]" />

      <div className="absolute inset-0 flex items-end">
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <div className="max-w-3xl text-white">
            <p className="text-amber-300 uppercase tracking-[0.35em] text-xs sm:text-sm mb-4">
              Curated mindful travel
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif leading-tight">
              {heading}
            </h1>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-stone-200 max-w-2xl leading-8">
              {content}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/experiences"
                className="inline-flex items-center justify-center rounded-full bg-amber-200 px-6 py-3 text-sm font-medium text-black hover:bg-white transition-colors"
              >
                Browse experiences
              </Link>
              <Link
                href="/connect"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Plan with us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
