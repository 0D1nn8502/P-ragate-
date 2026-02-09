import Header from "../../components/Header";
import { HeroSectionAbout } from "@/components/about/HeroSection";


export default function About() {
  return (
    <div className="bg-black min-h-screen">

        <Header/> 
        <HeroSectionAbout/>
    </div>
  );
}