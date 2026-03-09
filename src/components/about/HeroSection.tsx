'use client';
import { useRef, useEffect, useState } from 'react';
import { Quicksand, Playfair_Display, Cinzel } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

export const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['500'],
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500'],
});

export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500'],
});

gsap.registerPlugin(ScrollTrigger);

export function HeroSectionAbout() {
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <main ref={container} className="h-200vh">
      <AboutSection1 />
    </main>
  );
}

const AboutSection1 = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [imagesReady, setImagesReady] = useState(false);

  // Wait for all images to fully load before initialising animations
  useEffect(() => {
    const allImages = document.querySelectorAll<HTMLImageElement>('.about-image');
    const total = allImages.length;
    if (total === 0) {
      setImagesReady(true);
      return;
    }

    let loaded = 0;
    const onLoad = () => {
      loaded += 1;
      if (loaded >= total) setImagesReady(true);
    };

    allImages.forEach((img) => {
      if (img.complete && img.naturalHeight !== 0) {
        onLoad();
      } else {
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onLoad); // still advance on error so we don't hang
      }
    });

    return () => {
      allImages.forEach((img) => {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onLoad);
      });
    };
  }, []);

  // Only register GSAP animations once all images are ready
  useEffect(() => {
    if (!imagesReady) return;

    // Give the browser one extra frame to paint the now-loaded images so
    // ScrollTrigger measures accurate element dimensions.
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const ctx = gsap.context(() => {

        // ── Section 1: image slides in from left, text from right ──
        if (section1Ref.current) {
          const image1 = section1Ref.current.querySelector('.image-container');
          const text1 = section1Ref.current.querySelector('.text-container');

          gsap.fromTo(
            image1,
            { x: -100, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: section1Ref.current,
                start: 'top 80%', end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            text1,
            { x: 100, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
              scrollTrigger: {
                trigger: section1Ref.current,
                start: 'top 80%', end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // ── Section 2: text from left, image from right ──
        if (section2Ref.current) {
          const text2 = section2Ref.current.querySelector('.text-container');
          const image2 = section2Ref.current.querySelector('.image-container');

          gsap.fromTo(
            text2,
            { x: -100, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: section2Ref.current,
                start: 'top 80%', end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            image2,
            { x: 100, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
              scrollTrigger: {
                trigger: section2Ref.current,
                start: 'top 80%', end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // ── Section 3: image from top, text from bottom ──
        if (section3Ref.current) {
          const image3 = section3Ref.current.querySelector('.image-container');
          const text3 = section3Ref.current.querySelector('.text-container');

          gsap.fromTo(
            image3,
            { y: -50, opacity: 0, scale: 0.9 },
            {
              y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: section3Ref.current,
                start: 'top 80%', end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            text3,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
              scrollTrigger: {
                trigger: section3Ref.current,
                start: 'top 80%', end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

      }); // end gsap.context

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, [imagesReady]);

  return (
    <div className="flex flex-col justify-center items-center pt-11 min-h-screen mt-10 gap-55">

      {/* Section 1 */}
      <div ref={section1Ref} className="flex flex-col max-w-4xl gap-2 max-h-xl">
        <div className="px-15 image-container">
          <img
            src="/hand.png"
            alt="Why illustration"
            className="about-image rounded-2xl w-full max-w-md"
          />
        </div>

        <div className="text-container max-w-xl w-full rounded-2xl flex flex-col items-center text-center bg-[#deded5]">
          <p className={`${cinzel.className} max-w-2xl text-lg md:text-xl leading-relaxed tracking-widest font-extralight opacity-90 px-10 py-10`}>
            Travel is not an escape—it's a <b>return</b> to curiosity, presence, and transformation
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div ref={section2Ref} className="flex max-w-screen gap-10">
        <div className="text-container max-w-xl w-full rounded-2xl max-h-xl h-full flex flex-col items-center text-center bg-[#deded5]">
          <p className={`${cinzel.className} mt-10 max-w-2xl text-lg md:text-xl leading-relaxed tracking-widest font-extralight opacity-90 px-10 py-10`}>
            We strip away the friction—the logistics, the uncertainty—so all that remains is immersion. Don't visit, <b>Inhabit</b>.
          </p>
        </div>

        <div className="w-[520px] md:w-[520px] lg:w-[400px] image-container">
          <img
            src="/logistics.png"
            alt="Why illustration"
            className="about-image w-full h-auto rounded-2xl px-2"
          />
        </div>
      </div>

      {/* Section 3 */}
      <div ref={section3Ref} className="flex flex-col max-w-4xl gap-10">
        <div className="w-[320px] md:w-[320px] lg:w-[400px] mx-auto image-container">
          <img
            src="/exploration.png"
            alt="Why illustration"
            className="about-image w-full h-auto rounded-2xl"
          />
        </div>

        <div className="text-container max-w-xl w-full rounded-2xl max-h-xl h-full flex flex-col items-center text-center bg-[#deded5]">
          <p className={`${cinzel.className} mt-10 max-w-2xl text-lg md:text-xl leading-relaxed tracking-widest font-extralight opacity-90 px-10 py-10`}>
            We create immersive journeys for those who seek to live the moment—connecting deeply with local communities, cultures, and meaningful causes.
          </p>

          <Link href="/connect">
            <button className="mt-3 mb-5 px-8 py-3 bg-gradient-to-r from-[#f5dc8a] to-[#e8be59] text-[#5a4a2f] font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out border border-[#d4a645]/30 cursor-pointer">
              Book Now!
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};
