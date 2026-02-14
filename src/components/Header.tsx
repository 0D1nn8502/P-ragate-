"use client";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const firaMono = { className: "font-mono" };

export default function Header() {

  const navRef = useRef <HTMLDivElement> (null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();  // Track route changes // 

  useEffect(() => {
    if (navRef.current && !isMobileMenuOpen) {

      // GSAP animation 
      gsap.set(navRef.current.children, {
        opacity: 0, 
        y:30 
      }); 

      gsap.to(navRef.current.children, {
        opacity: 1, 
        y: 0, 
        ease: 'power3.in', 
        stagger: 0.1, 
        duration: 0.4
      })
    }
  }, [pathname, isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full px-4 py-3 backdrop-blur-sm bg-white/0">
      <div className="flex items-center justify-between">
        {/* Logo and Name */}
        <Link href="/" className="flex flex-col items-center cursor-pointer group z-20">
          <div className="relative transition-transform duration-300 group-hover:scale-105">
            <img
              src="./Thangka.jpeg"
              alt="gate gate"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-full" />
          </div>
          <p className={`text-white text-xs sm:text-sm md:text-base lg:text-lg tracking-wider ${firaMono.className} -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 z-10 transition-opacity duration-300 group-hover:opacity-80`}>
            Pāragate
          </p>
        </Link> 

        {/* Desktop Navigation - Hidden on mobile */}
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
          {/* <Link 
            href="/locations" 
            className={`text-white text-sm lg:text-base tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
          >
            Locations
          </Link> */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white z-20 p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-10 md:hidden"
          onClick={closeMobileMenu}
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            <Link 
              href="/about" 
              className={`text-white text-2xl tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            {/* <Link 
              href="/locations" 
              className={`text-white text-2xl tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
              onClick={closeMobileMenu}
            >
              Locations
            </Link> */}
            <Link 
              href="/experiences" 
              className={`text-white text-2xl tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
              onClick={closeMobileMenu}
            >
              Experiences
            </Link>
            <Link 
              href="/connect" 
              className={`text-white text-2xl tracking-wider ${firaMono.className} hover:text-gray-300 transition-colors`}
              onClick={closeMobileMenu}
            >
              Connect
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}