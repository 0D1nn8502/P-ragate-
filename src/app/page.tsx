import Image from "next/image";
import {Fira_Mono} from "next/font/google" 

// That Claude font // 
const firaMono = Fira_Mono({
  subsets: ['latin'], 
  weight: '700', 
  display: 'swap' 
})


export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-4"> 

      <div className="flex flex-col items-center space-y-4">  
        
        <h1 className={`text-white text-xl md:text-3xl lg:text-5xl tracking-wider ${firaMono}`}> 
          Pāragate 
        </h1>

        <img 
          src="/Thangka.JPG"
          alt="gate gate" 
          className="h-32 md:h-55 lg:h-70 w-auto"   
        > 
      
        </img>

      </div> 

    </div> 
  );
}
