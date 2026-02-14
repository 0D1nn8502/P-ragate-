'use client';

import { useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import Header from '@/components/Header';
import { Castoro_Titling } from 'next/font/google';


const medievalsharp = Castoro_Titling({
  subsets: ['latin'], 
  weight: ['400']
})


export default function ExperiencesPage() {
  const [expandedQuest, setExpandedQuest] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      title: '',
      location: 'Simikot, Nepal',
      category: 'hiking',
      type: 'group/individual',
      images: [
        '/paragate_exp/view2.jpeg',
        '/paragate_exp/house_outer.jpg',
        '/paragate_exp/view.jpeg'
      ],
      rating: 4.9,
      reviews: 234,
      description: 'A remote stay with Mr. Padmajin. Close to kailash and nestled amidst breathtaking mountains.',
      difficulty: 'Moderate',
      duration: '3-5 days'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-amber-100">
      <Header />

      {/* Hero Section */}
      <div className="py-8 sm:py-12 lg:py-16 text-center border-b border-amber-900/20 px-4">
        <h1 className={`
          text-3xl sm:text-4xl lg:text-5xl
          mb-3 sm:mb-4
          text-amber-400
          tracking-wide sm:tracking-widest
          pl-[0.2em] sm:pl-[0.3em]
          ${medievalsharp.className}
        `}>
          Experiences
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-amber-300/80 font-serif italic max-w-2xl mx-auto">
          Unforgettable adventures await thee, brave traveler
        </p>
      </div>

      {/* Quest Board */}
      <div className="px-8 py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent"></div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {experiences.map((quest, index) => (
            <div key={quest.id} className="relative group">
              {/* Expanded Image Preview Modal */}
              {expandedQuest === index && (
                <div
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
                  onClick={() => setExpandedQuest(null)}
                >
                  <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setExpandedQuest(null)}
                      className="absolute -top-12 right-0 text-amber-400 hover:text-amber-200 text-2xl font-bold"
                    >
                      ✕ Close
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {quest.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative group">
                          <div className="bg-stone-100 p-4 shadow-2xl transform hover:scale-105 transition-transform">
                            <img
                              src={image}
                              alt={`${quest.title} ${imgIndex + 1}`}
                              className="w-full h-64 object-cover"
                            />
                            <div className="h-8 bg-stone-100"></div>
                          </div>
                          {/* Pin on each photo in expanded view */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg border-2 border-red-900"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quest Card */}
              <div className="relative bg-gradient-to-br from-stone-900/60 to-black/80 border-2 border-amber-900/40 rounded-lg p-6 backdrop-blur-sm hover:border-amber-700/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/30 flex gap-6">
                {/* Parchment texture overlay */}
                <div
                  className="absolute inset-0 opacity-5 rounded-lg"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-amber-800/50"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-amber-800/50"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-amber-800/50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-amber-800/50"></div>

                {/* Small Stacked Photos with Pin - Clickable */}
                <div
                  className="relative w-40 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedQuest(expandedQuest === index ? null : index);
                  }}
                >
                  {quest.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative"
                      style={{
                        transform: `rotate(${imgIndex * 3 - 3}deg) translateY(${imgIndex * -4}px)`,
                        zIndex: quest.images.length - imgIndex,
                        marginBottom: imgIndex === quest.images.length - 1 ? '0' : '-110px',
                      }}
                    >
                      {/* Polaroid-style photo */}
                      <div className="bg-stone-100 p-2 shadow-2xl">
                        <img
                          src={image}
                          alt={`${quest.title} ${imgIndex + 1}`}
                          className="w-full h-28 object-cover"
                        />
                        <div className="h-3 bg-stone-100"></div>
                      </div>

                      {/* Push pin on the topmost photo */}
                      {imgIndex === quest.images.length - 1 && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-50">
                          <div className="relative">
                            {/* Pin head */}
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg border-2 border-red-900"></div>
                            {/* Pin point shadow */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1 h-2 bg-gradient-to-b from-gray-600 to-transparent opacity-50 blur-sm"></div>
                            {/* Pin point */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-gray-400"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="relative flex-1">
                  {/* Location badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-serif text-amber-400">{quest.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-serif mb-3 text-amber-200 group-hover:text-amber-100 transition-colors">
                    {quest.title}
                  </h3>

                  {/* Description */}
                  <p className="text-amber-300/80 mb-4 leading-relaxed font-serif text-sm italic">
                    {quest.description}
                  </p>

                  {/* Quest details */}
                  <div className="flex flex-wrap gap-4 mb-4 text-xs font-serif">
                    <div className="px-3 py-1 bg-black/50 border border-amber-900/50 rounded">
                      <span className="text-amber-500">Difficulty:</span>
                      <span className="ml-1 text-amber-200">{quest.difficulty}</span>
                    </div>
                    <div className="px-3 py-1 bg-black/50 border border-amber-900/50 rounded">
                      <span className="text-amber-500">Duration:</span>
                      <span className="ml-1 text-amber-200">{quest.duration}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-900/30">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-amber-300 font-serif">{quest.rating}</span>
                      <span className="text-amber-600 text-sm">({quest.reviews} seekers)</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 border border-amber-700/50 rounded text-sm font-serif transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/50">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer decoration */}
      <div className="px-8 py-8 mt-12 border-t border-amber-900/20">
        <div className="flex justify-center items-center gap-4 text-amber-800 text-sm font-serif italic">
          <div className="h-px w-24 bg-amber-900/50"></div>
          <span>May fortune favor thy journey</span>
          <div className="h-px w-24 bg-amber-900/50"></div>
        </div>
      </div>
    </div>
  );
}