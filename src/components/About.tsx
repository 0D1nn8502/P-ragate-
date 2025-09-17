import { Playfair_Display } from "next/font/google"
import { Fira_Mono } from "next/font/google";
import Header from "./Header";

const playFair = Playfair_Display({
  subsets: ['latin'], 
  weight: '600', 
  style: ['italic'], 
  display: 'swap' 
}) 

const firaMono = Fira_Mono({
  subsets: ['latin'], 
  weight: '700', 
  display: 'swap' 
})

interface AboutProp {
    content: string; 

}

export default function AboutSection() {

    return (
        
        

        <div className={`text-white text-s md:text-xs lg:text-sm ${firaMono.className} flex items-center`}> 

            <div className="max-w-4xl text-center"> 
            <p> 
                
                At Paragate, we believe the most profound journeys happen when you step beyond the surface 
                and into the heart of a destination. We craft immersive experiences that connect you with 
                local communities, cultures, and causes that matter. Each trip is meticulously tailored to
                your interests while creating meaningful impact through our partnerships with local organizations and NGOs. 
                
            </p>
            </div> 

        </div>
    );
}