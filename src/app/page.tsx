import Image from "next/image";
import {Fira_Mono} from "next/font/google" 
import { Playfair_Display } from "next/font/google";
import Link from "next/link"; 

import Header from "./components/Header";
import HeroSection from "./components/Hero";


const playFair = Playfair_Display({
  subsets: ['latin'], 
  weight: '600', 
  style: ['italic'], 
  display: 'swap' 
})


export default function Home() {
  return (

    <div className="min-h-screen bg-gray-900"> 
      <Header/> 
      
      <HeroSection heading="Break out of Samsārā" content="Weekend getaways to immersive local experiences"  
      image="./himalayas.avif"/>  

    </div> 
  );
}

