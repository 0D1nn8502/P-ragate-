"use client"; // needed in Next.js App Router for GSAP
import React, { useEffect, useRef } from "react";
import { Fira_Mono } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// That Claude font //
const firaMono = Fira_Mono({
  subsets: ['latin'],
  weight: '700',
  display: 'swap'
});

export default function Header() {
  // 🔹 1. Ref to target nav container
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Track route changes

  // 🔹 2. Reset and animate on route change
  useEffect(() => {
    if (navRef.current) {
      // First, reset the elements to their initial state
      gsap.set(navRef.current.children, {
        opacity: 0,
        y: 30
      });

      // Then animate them in
      gsap.to(navRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2, // delay each child by 0.2s
      });
    }
  }, [pathname]); // Run whenever the pathname changes

  return (
    <header className="w-full px-2 py-3 sm:px-4 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Name style */}
        <Link href="/" className="flex flex-col items-center ml-0.5 md:ml-4 cursor-pointer group">
          <div className="relative transition-transform duration-300 group-hover:scale-105">
            <img
              src="/Thangka.JPG"
              alt="gate gate"
              className="w-16 h-16 md:w-25 md:h-25 lg:w-30 lg:h-30 rounded-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/100 rounded-full" />
          </div>
          <p className={`text-white text-sm md:text-sm lg:text-lg tracking-wider ${firaMono.className} -mt-3 md:-mt-7 lg:-mt-5 z-10 transition-opacity duration-300 group-hover:opacity-80`}>
            Pāragate
          </p>
        </Link>
        {/* Logo and Name style ends */}

        {/* 🔹 3. Attach ref here so GSAP can target children */}
        <div ref={navRef} className="flex gap-2 xs:gap-3 sm:gap-4 md:gap-10 mr-1 sm:mr-4 lg:mr-8">
          <Link href="/about" className={`text-white text-sm md:text-sm lg:text-[1.01rem] tracking-wider ${firaMono.className}`}>
            About
          </Link>
          <Link href="/locations" className={`text-white text-sm md:text-sm lg:text-[1.01rem] tracking-wider ${firaMono.className}`}>
            Locations
          </Link>
          <Link href="/experiences" className={`text-white text-sm md:text-sm lg:text-[1.01rem] tracking-wider ${firaMono.className}`}>
            Experiences
          </Link>
          <Link href="/connect" className={`text-white text-sm md:text-sm lg:text-[1.01rem] tracking-wider ${firaMono.className}`}>
            Connect
          </Link>
        </div>
      </div>
    </header>
  );
}