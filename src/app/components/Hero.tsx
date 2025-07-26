


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
    <div className={`flex md:flex-row items-center gap-7 ${className}`}>
      <div className="flex flex-col gap-5 text-center md:text-left">
        
      </div>
      <img
        src={image}
        alt="escape"
        className="w-full h-[70vh] object-cover"
      />
    </div>
  );
}



// <p className="text-xl md:text-2xl font-bold text-white">{heading}</p>
//         <p className="text-sm md:text-md text-white">{content}</p>
//         <button className="text-white text-sm md:text-md bg-amber-500 cursor-pointer w-28 h-10 rounded">
//           Locations
//         </button>