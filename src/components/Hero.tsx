
// Travel? This is life. // 
interface HeroSectionProps {
    image: string; 
    heading: string; 
    content: string; 
    className?: string; 
}


export default function HeroSection({
  image,
  heading,
  content,
  className = "",
}: HeroSectionProps) {
  return (
    <div className="relative">
      <img
        src={image}
        alt="escape"
        className="w-full h-screen object-cover"
      />
      
      <div className="absolute inset-0 flex items-center justify-center text-white bg-black/20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Feeling stuck?</h1>
          <p className="mt-4 text-xl">Time to get going</p>
        </div>
      </div>

  </div> 
  );
}



// <p className="text-xl md:text-2xl font-bold text-white">{heading}</p>
//         <p className="text-sm md:text-md text-white">{content}</p>
//         <button className="text-white text-sm md:text-md bg-amber-500 cursor-pointer w-28 h-10 rounded">
//           Locations
//         </button>