import Header from "../components/Header";
import HeroSection from "../components/Hero";
import RecentExperiences from "../components/RecentExperiences";
import { getRecentExperiences } from "@/lib/experiences";

export default async function Home() {
  const recentExperiences = await getRecentExperiences(3);
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <HeroSection
        heading="Break out of Samsara"
        content="Weekend getaways and immersive stays shaped around presence, culture, and the kind of beauty that lingers after you return home."
        image="./mountainmoon.jpg.avif"
      />

      <RecentExperiences experiences={recentExperiences} />
      
    </div>
  );
}
