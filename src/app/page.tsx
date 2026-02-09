import Header from "../components/Header";
import HeroSection from "../components/Hero";


export default function Home() {
  return (

    <div className="min-h-screen bg-black"> 
      <Header/> 
      
      <HeroSection heading="Break out of Samsārā" content="Weekend getaways to immersive local experiences"  
      image="./mountainmoon.jpg.avif"/>  

    </div> 
  );
}

