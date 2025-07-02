import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-4"> 

      <img 
        src="/Thangka.JPG"
        alt="gate gate" 
        className="h-32 md:h-48 lg:h-64 w-auto"   
      > 
      
      </img>

    </div> 
  );
}
