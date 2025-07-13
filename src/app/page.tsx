import Image from "next/image";
import {Fira_Mono} from "next/font/google" 
import { Playfair_Display } from "next/font/google";

import Link from "next/link"; 

// That Claude font // 
const firaMono = Fira_Mono({
  subsets: ['latin'], 
  weight: '700', 
  display: 'swap' 
})

const playFair = Playfair_Display({
  subsets: ['latin'], 
  weight: '600', 
  style: ['italic'], 
  display: 'swap' 
})


export default function Home() {
  return (

    <div className="min-h-screen bg-gray-900"> 
    
    <header className="w-ful px-4 py-4">  

    <div className="flex items-center gap-7"> 

      {/* Logo and Name style */}

      <div className="flex flex-col items-center"> 

        <div className="relative"> 

          <img 
            src="/Thangka.JPG"
            alt="gate gate" 
            className="w-16 h-16 md:w-20 md:h-20 lg:w-25 lg:h-25 rounded-full object-cover object-center"     
          > 
          </img> 

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/100 rounded-full"> 

          </div>

        </div> 

        
        <p className={`text-white text-xs md:text-xs lg:text-sm tracking-wider ${firaMono.className} -mt-3 md:-mt-7 lg:-mt-5 z-10`}> 
          Pāragate 
        </p>


      </div> 

      {/* Logo and Name style ends */} 

      <Link href="/about" className={`text-white text-xs md:text-xs lg:text-sm tracking-wider ${firaMono.className}`}> 
        About 
      </Link> 

    </div> 
    </header> 
    </div> 
  );
}

