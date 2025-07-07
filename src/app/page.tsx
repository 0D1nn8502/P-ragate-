import Image from "next/image";
import {Fira_Mono} from "next/font/google" 
import { Playfair_Display } from "next/font/google";

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
    
    <header className="w-full bg-gray-900 border-b border-gray-700 px-4 py-4">  

    <div className="min-h-screen flex items-center justify-center py-4"> 

      <div className="flex flex-col items-center space-y-4">  
        
        <h1 className={`text-white text-xl md:text-4xl lg:text-6xl tracking-wider ${firaMono.className}`}> 
          Paragate 
        </h1>

        <img 
          src="/Thangka.JPG"
          alt="gate gate" 
          className="h-32 md:h-55 lg:h-70 w-auto"   
        > 
      
        </img>

      </div> 

    </div> 
    </header> 
  );
}
