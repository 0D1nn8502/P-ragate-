"use client";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const firaMono = { className: "font-mono" };

export default function Header() {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (navRef.current && !isMobileMenuOpen) {
      gsap.set(navRef.current.children, {
        opacity: 0,
        y: 30,
      });

      gsap.to(navRef.current.children, {
        opacity: 1,
        y: 0,
        ease: "power3.in",
        stagger: 0.1,
        duration: 0.4,
      });
    }
  }, [pathname, isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full px-4 py-3 backdrop-blur-sm bg-white/0">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex flex-col items-center cursor-pointer group z-20 ml-2 sm:ml-4 md:ml-20"
        >
          <div className="relative transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logo/Paragate.png"
              alt="Paragate logo"
              className="w-14 sm:w-[3.9rem] md:w-[4.8rem] lg:w-[5.4rem] h-auto object-contain bg-black"
            />
          </div>
        </Link> 

        <nav
          ref={navRef}
          className="hidden md:flex gap-6 lg:gap-10 mr-4 lg:mr-8"
        >
          <Link
            href="/about"
            className={`text-white text-sm lg:text-base tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
          >
            About
          </Link>
          <Link
            href="/experiences"
            className={`text-white text-sm lg:text-base tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
          >
            Experiences
          </Link>
          <Link
            href="/connect"
            className={`text-white text-sm lg:text-base tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
          >
            Connect
          </Link>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white z-20 p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-sm"
          onClick={closeMobileMenu}
        >
          <nav
            id="mobile-menu"
            className="ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto border-l border-white/10 bg-stone-950/95 px-6 pb-8 pt-24 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">
                Navigate
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg text-white ${firaMono.className} hover:border-amber-300/40 hover:bg-amber-100/10 transition-colors`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/experiences"
                className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg text-white ${firaMono.className} hover:border-amber-300/40 hover:bg-amber-100/10 transition-colors`}
                onClick={closeMobileMenu}
              >
                Experiences
              </Link>
              <Link
                href="/connect"
                className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg text-white ${firaMono.className} hover:border-amber-300/40 hover:bg-amber-100/10 transition-colors`}
                onClick={closeMobileMenu}
              >
                Connect
              </Link>
            </div>

            <div className="mt-auto pt-8 text-sm text-stone-400">
              Curated journeys and quieter ways to travel.
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
