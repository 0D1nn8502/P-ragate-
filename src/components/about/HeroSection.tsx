'use client';
import {useRef, useEffect} from 'react';
import { Quicksand, Playfair_Display, Cinzel } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';


export const quicksand = Quicksand({
  subsets: ['latin'], 
  weight: ['500']
})


export const playfair = Playfair_Display({
  subsets: ['latin'], 
  weight: ['500']
})


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

      <AboutSection/>

    </main>
    
  );
}


const AboutSection = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  

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
        { y: -50, opacity: 0, scale: 0.9 },
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

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (

      // Outer div contains a bunch of card divs // 
      
      <div className="flex flex-col justify-center items-center pt-11 min-h-screen mt-10 gap-55">

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
                bg-[#deded5]
              "
            >

              <p
                className={`
                  ${cinzel.className}
                  max-w-2xl
                  text-lg
                  md:text-xl
                  leading-relaxed
                  tracking-widest
                  font-extralight
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
          <div ref={section2Ref} className='flex max-w-screen gap-10'>

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
                bg-[#deded5]
              "
            >

              <p
                className={`
                  ${cinzel.className}
                  mt-10
                  max-w-2xl
                  text-lg
                  md:text-xl
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
            </div>

            <div className='w-[520px] md:w-[520px] lg:w-[400px] image-container'> 
              <img
                src="/logistics.png"
                alt="Why illustration" 
                className='w-full h-auto rounded-2xl px-2'
              /> 
            </div>

          </div>



          {/* Third Section */}
          <div ref={section3Ref} className='flex flex-col max-w-4xl gap-10'>

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
                bg-[#deded5]
              "
            >

              <p
                className={`
                  ${cinzel.className}
                  mt-10
                  max-w-2xl
                  text-lg
                  md:text-xl
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
                  Book Now!
                </button>
              </Link>

            </div>


          </div>

      </div>

  );

}
