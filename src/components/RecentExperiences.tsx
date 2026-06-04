"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import type { Experience } from "@/lib/experiences";

type RecentExperiencesProps = {
  experiences: Experience[];
};

type TabDefinition = {
  key: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  select: (experiences: Experience[]) => Experience[];
};

function sortByPublishedAt(experiences: Experience[]) {
  return [...experiences].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

function matchesPattern(experience: Experience, pattern: RegExp) {
  const haystack = [
    experience.title,
    experience.location,
    experience.description,
  ].join(" ");

  return pattern.test(haystack);
}

function inShelf(experience: Experience, shelf: string) {
  return experience.homepageShelves.includes(shelf);
}

const tabs: TabDefinition[] = [
  {
    key: "fresh-arrivals",
    label: "Fresh arrivals",
    eyebrow: "Newest on Paragate",
    title: "Recently published journeys",
    description:
      "The latest experiences should be the easiest thing to discover on the homepage.",
    select: (experiences) =>
      sortByPublishedAt(experiences)
        .filter((experience) => inShelf(experience, "fresh-arrivals"))
        .slice(0, 3),
  },
  {
    key: "sweet-season",
    label: "Sweet season",
    eyebrow: "Good timing, softer crowds",
    title: "Experiences that are especially well-timed now",
    description:
      "This shelf is for journeys that feel especially rewarding in the current window: good weather, a strong local rhythm, and fewer of the drawbacks that come with peak-season travel.",
    select: (experiences) =>
      sortByPublishedAt(experiences)
        .filter((experience) => inShelf(experience, "sweet-season"))
        .slice(0, 3),
  },
  {
    key: "cultural-encounters",
    label: "Cultural encounters",
    eyebrow: "People, memory, place",
    title: "Journeys rooted in story and community",
    description:
      "These experiences foreground local histories, oral traditions, and meaningful human connection.",
    select: (experiences) =>
      sortByPublishedAt(experiences)
        .filter(
          (experience) =>
            inShelf(experience, "cultural-encounters") ||
            matchesPattern(
              experience,
              /tribal|culture|cultural|history|prehistor|oral|community|memory/i,
            ),
        )
        .slice(0, 3),
  },
  {
    key: "mountain-escapes",
    label: "Mountain escapes",
    eyebrow: "Remote and restorative",
    title: "High-altitude stays and wide landscapes",
    description:
      "A quieter shelf for mountain journeys, slow travel, and places that feel far from routine.",
    select: (experiences) =>
      sortByPublishedAt(experiences)
        .filter(
          (experience) =>
            inShelf(experience, "mountain-escapes") ||
            matchesPattern(
              experience,
              /mountain|himal|simikot|kailash|remote|landscape|high-altitude/i,
            ),
        )
        .slice(0, 3),
  },
];

export default function RecentExperiences({
  experiences,
}: RecentExperiencesProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const currentTab = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const selectedExperiences = currentTab.select(experiences);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors"
          >
            See all experiences
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = tab.key === currentTab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "rounded-full border px-4 py-2.5 text-sm transition-colors",
                  isActive
                    ? "border-amber-200 bg-amber-200 text-black"
                    : "border-white/15 bg-white/5 text-stone-200 hover:border-amber-400/40 hover:text-white",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mb-8 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(120,53,15,0.14),rgba(0,0,0,0.8))] p-6 sm:p-8">
          <p className="text-amber-400 uppercase tracking-[0.3em] text-[11px] sm:text-xs mb-3">
            {currentTab.eyebrow}
          </p>
          <h3 className="text-white text-2xl sm:text-3xl font-serif mb-3">
            {currentTab.title}
          </h3>
          <p className="text-stone-300 text-sm sm:text-base leading-7 max-w-3xl">
            {currentTab.description}
          </p>
        </div>

        {selectedExperiences.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {selectedExperiences.map((experience, index) => (
              <article
                key={`${currentTab.key}-${experience.id}`}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_rgba(0,0,0,0.75)_55%)]"
              >
                <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-amber-200">
                  <Clock3 className="w-3.5 h-3.5" />
                  {currentTab.label} #{index + 1}
                </div>

                <img
                  src={experience.images[0] ?? "/mountainmoon.jpg.avif"}
                  alt={experience.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center gap-2 text-amber-400 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>

                  <h3 className="text-white text-2xl font-serif mb-3">
                    {experience.title}
                  </h3>

                  <p className="text-stone-300 leading-7 text-sm mb-5">
                    {experience.description}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      {new Date(experience.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <Link
                      href="/experiences"
                      className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-4 py-2 text-sm text-amber-100 hover:bg-amber-100 hover:text-black transition-colors"
                    >
                      Explore
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-8 text-stone-300">
            No experiences match this shelf yet. Once you add more varied journeys,
            this tab will start to feel much more alive.
          </div>
        )}
      </div>
    </section>
  );
}
