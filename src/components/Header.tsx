import React from "react"; 
import {Fira_Mono} from "next/font/google"  
import Link from "next/link"; 


// That Claude font // 
const firaMono = Fira_Mono({
  subsets: ['latin'], 
  weight: '700', 
  display: 'swap' 
})


export default function Header() {
    return (
    <header className="w-full px-2 py-3 sm:px-4 sm:py-4">

    <div className="flex items-center justify-between"> 

      {/* Logo and Name style */}

      <div className="flex flex-col items-center ml-0.5 md:ml-4"> 

        <div className="relative"> 

          <img 
            src="/Thangka.JPG"
            alt="gate gate" 
            className="w-16 h-16 md:w-25 md:h-25 lg:w-30 lg:h-30 rounded-full object-cover object-center"     
          > 
          </img> 

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/100 rounded-full"> 

          </div>

        </div> 

        
        <p className={`text-white text-sm md:text-sm lg:text-lg tracking-wider ${firaMono.className} -mt-3 md:-mt-7 lg:-mt-5 z-10`}> 
          Pāragate 
        </p>


      </div> 

      {/* Logo and Name style ends */} 

      <div className="flex gap-4 sm:gap-5 md:gap-10 mr-2 sm:mr-4 lg:mr-8">
        <Link href="/about" className={`text-white text-sm md:text-sm lg:text-[1.01rem] tracking-wider ${firaMono.className}`}>
            About
        </Link>
        <Link href="/about" className={`text-white text-sm md:text-sm lg:text-[1.01rem] tracking-wider ${firaMono.className}`}>
            Locations
        </Link>
        <Link href="/about" className={`text-white text-sm md:text-sm lg:text-[1.01rem] tracking-wider ${firaMono.className}`}>
            Experiences
        </Link>
      </div>

    </div> 
    </header>
    )
}

