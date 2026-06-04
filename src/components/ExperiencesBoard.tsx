"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Experience } from "@/lib/experiences";

type ExperiencesBoardProps = {
  experiences: Experience[];
};

export default function ExperiencesBoard({
  experiences,
}: ExperiencesBoardProps) {
  const [expandedExperienceId, setExpandedExperienceId] = useState<
    string | null
  >(null);

  return (
    <div className="grid grid-cols-1 gap-8 lg:gap-12 max-w-7xl mx-auto">
      {experiences.map((experience) => {
        const isExpanded = expandedExperienceId === experience.id;

        return (
          <div key={experience.id} className="relative group">
            {isExpanded ? (
              <div
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-8"
                onClick={() => setExpandedExperienceId(null)}
              >
                <div
                  className="relative max-w-6xl w-full"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    onClick={() => setExpandedExperienceId(null)}
                    className="absolute -top-12 right-0 text-amber-400 hover:text-amber-200 text-xl sm:text-2xl font-bold"
                  >
                    Close
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {experience.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="relative">
                        <div className="bg-stone-100 p-3 sm:p-4 shadow-2xl">
                          <img
                            src={image}
                            alt={`${experience.title} ${imageIndex + 1}`}
                            className="w-full h-56 sm:h-64 object-cover"
                          />
                          <div className="h-8 bg-stone-100" />
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg border-2 border-red-900" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="relative bg-gradient-to-br from-stone-900/60 to-black/80 border-2 border-amber-900/40 rounded-3xl p-4 sm:p-6 backdrop-blur-sm hover:border-amber-700/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/30 flex flex-col lg:flex-row gap-6">
              <div
                className="absolute inset-0 opacity-5 rounded-3xl"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }}
              />

              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-amber-800/50 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-amber-800/50 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-amber-800/50 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-amber-800/50 rounded-br-3xl" />

              <button
                type="button"
                className="relative w-full lg:w-44 xl:w-52 flex-shrink-0 cursor-pointer hover:scale-[1.02] transition-transform text-left"
                onClick={() => setExpandedExperienceId(experience.id)}
              >
                {experience.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="relative"
                    style={{
                      transform: `rotate(${imageIndex * 3 - 3}deg) translateY(${imageIndex * -4}px)`,
                      zIndex: experience.images.length - imageIndex,
                      marginBottom:
                        imageIndex === experience.images.length - 1
                          ? "0"
                          : "-84px",
                    }}
                  >
                    <div className="bg-stone-100 p-2 shadow-2xl">
                      <img
                        src={image}
                        alt={`${experience.title} ${imageIndex + 1}`}
                        className="w-full h-28 sm:h-32 object-cover"
                      />
                      <div className="h-3 bg-stone-100" />
                    </div>

                    {imageIndex === experience.images.length - 1 ? (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-50">
                        <div className="relative">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg border-2 border-red-900" />
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1 h-2 bg-gradient-to-b from-gray-600 to-transparent opacity-50 blur-sm" />
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gray-400" />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </button>

              <div className="relative flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-serif text-amber-400">
                    {experience.location}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif mb-3 text-amber-200 group-hover:text-amber-100 transition-colors">
                  {experience.title}
                </h3>

                <p className="text-amber-300/80 mb-5 leading-relaxed font-serif text-sm sm:text-base italic max-w-2xl">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-5 text-xs font-serif">
                  <div className="px-3 py-1 bg-black/50 border border-amber-900/50 rounded-full">
                    Recently added
                  </div>
                  <div className="px-3 py-1 bg-black/50 border border-amber-900/50 rounded-full">
                    {new Date(experience.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-amber-900/30">
                  <p className="text-sm text-amber-500/80">
                    Preview the story here, then continue to connect.
                  </p>
                  <Link
                    href="/connect"
                    className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 border border-amber-700/50 rounded-full text-sm font-serif transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/50"
                  >
                    Inquire now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
