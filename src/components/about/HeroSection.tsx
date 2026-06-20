'use client';
import {useRef, useEffect} from 'react';
import { Cinzel } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ScrollSparrow } from './ScrollSparrow';


export const cinzel = Cinzel({
  subsets: ['latin'], 
  weight: ['500']
})



gsap.registerPlugin(ScrollTrigger); 

export function HeroSectionAbout() {

  const container = useRef <HTMLDivElement | null> (null);

  useEffect(() => {

    const handleLoad = () => ScrollTrigger.refresh(); 
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };

  }, []);

  return (
    
    <main ref={container} className='h-200vh'>

      <ScrollSparrow />
      <AboutSection/>

    </main>

  );
}


const AboutSection = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for first section (image left, text right)
    if (section1Ref.current) {
      const image1 = section1Ref.current.querySelector('.image-container');
      const text1 = section1Ref.current.querySelector('.text-container');

      gsap.fromTo(
        image1,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        text1,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animation for second section (text left, image right)
    if (section2Ref.current) {
      const text2 = section2Ref.current.querySelector('.text-container');
      const image2 = section2Ref.current.querySelector('.image-container');

      gsap.fromTo(
        text2,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        image2,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animation for third section (image top, text bottom)
    if (section3Ref.current) {
      const image3 = section3Ref.current.querySelector('.image-container');
      const text3 = section3Ref.current.querySelector('.text-container');

      gsap.fromTo(
        image3,
        { y: -30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        text3,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animation for fourth section 
    if (section4Ref.current) {
      const image4 = section4Ref.current.querySelector('.image-container');
      const text4 = section4Ref.current.querySelector('.text-container p'); 

      // Image: rushes in from "distance" — scale up + blur clearing
      gsap.fromTo(
        image4,
        { scale: 0.4, opacity: 0, filter: 'blur(8px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',        // expo.out gives that sudden deceleration
          scrollTrigger: {
            trigger: section4Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text: word-by-word reveal
      if (text4) {
        const original = text4.textContent || '';
        const words    = original.split(' ');

        // Wrap each word in a span
        text4.innerHTML = words
          .map(w => `<span style="opacity:0;display:inline-block">${w}</span>`)
          .join(' ');

        const spans = text4.querySelectorAll('span');

        gsap.fromTo(
          spans,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.07,         // each word follows 70ms after the last
            delay: 0.5,            // starts after image lands
            scrollTrigger: {
              trigger: section4Ref.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      } 
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
      <div className="flex flex-col justify-center items-center pt-11 min-h-screen mt-10 gap-55 sm:gap-45">

          {/* First Section */}
          <div ref={section1Ref} className='flex flex-col max-w-4xl gap-2 max-h-xl'>

            <div className='px-15 image-container'> 
                <img
                  src="/hand.png"
                  alt="Why illustration" 
                  className='rounded-2xl w-full max-w-md'
                /> 
            </div>
          
            <div
              className="
                text-container
                max-w-xl
                w-full
                rounded-2xl
                flex 
                flex-col
                items-center
                text-center
              "
            >

              <p
                className={`
                  ${cinzel.className}
                  max-w-2xl
                  text-sm
                  md:text-xl
                  leading-relaxed
                  tracking-widest
                  font-extralight
                  text-white
                  opacity-90
                  px-10
                  py-10
                `}
              >
                Travel is not an escape—it’s a <b> return </b> to curiosity, presence, and transformation
              </p>

            </div>

          </div>


          {/* Second Section */}
          <div ref={section2Ref} className='flex max-w-screen gap-6 md:gap-10'>

            <div
              className="
                flex text-container items-center
              "
            >

              <p
                className={`
                  ${cinzel.className}
                  mt-10
                  w-full md:w-1/2 
                  text-sm
                  md:text-xl
                  text-white
                  leading-relaxed
                  tracking-widest
                  font-extralight
                  opacity-90
                  px-10
                  py-10
                `}
              >
              We strip away the friction—the logistics, the uncertainty—so all that remains is immersion. Dont visit, <b>Inhabit</b>. 
              </p>

            <div className='w-full md:w-1/2 image-container'> 
              <img
                src="/logistics.png"
                alt="Logistics" 
                className='w-full h-auto rounded-2xl'
              /> 
            </div>
            </div>

          </div>

          {/* Third Section */} 
          <div ref={section4Ref} className='flex max-w-screen gap-6 md:gap-10'>
            <div className="flex text-container items-center"> 
              <div className='w-full md:w-1/2 image-container'> 
                  <img 
                    src='/digital-infrastructure.png'
                    alt="Digital Infrastructure" 
                    className='w-full h-auto rounded-2xl'
                  /> 
              </div>
              

              <p
                className={`
                  ${cinzel.className}
                  mt-10
                  w-full md:w-1/2 
                  text-sm
                  md:text-xl
                  text-white
                  leading-relaxed
                  tracking-widest
                  font-extralight
                  opacity-90
                  px-10
                  py-10
                `}
              >
              We build digital infrastructure for local businesses and communities to help them thrive in the new era of travel. 
              </p>

            </div>

          </div>


          {/* Fourth Section */}
          <div ref={section3Ref} className='flex flex-col max-w-4xl gap-6 md:gap-10'>

            <div className='w-[320px] md:w-[320px] lg:w-[400px] mx-auto image-container'> 
              <img
                src="/exploration.png"
                alt="Why illustration" 
                className='w-full h-auto rounded-2xl'
              /> 
            </div>

            <div
              className="
                text-container
                max-w-xl
                w-full
                rounded-2xl
                max-h-xl
                h-full
                flex flex-col
                items-center
                text-center
              "
            >

              <p
                className={`
                  ${cinzel.className}
                  mt-10
                  max-w-2xl
                  text-sm
                  md:text-xl
                  text-white
                  leading-relaxed
                  tracking-widest
                  font-extralight
                  opacity-90
                  px-10
                  py-10
                `}
              >
               We create immersive journeys for those who seek to live the moment—connecting deeply with local communities, cultures, and meaningful causes.
              </p>

              <Link href="/connect">
                <button
                  className="
                    mt-3
                    mb-5
                    px-8
                    py-3
                    bg-gradient-to-r
                    from-[#f5dc8a]
                    to-[#e8be59]
                    text-[#5a4a2f]
                    font-semibold
                    rounded-xl
                    shadow-md
                    hover:shadow-lg
                    hover:scale-105
                    transition-all
                    duration-300
                    ease-out
                    border
                    border-[#d4a645]/30
                    cursor-pointer
                  "
                >
                  Connect with us
                </button>
              </Link>

            </div>


          </div>

      </div>

  );

}
