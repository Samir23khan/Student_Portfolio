import bgImage from "../assets/background.jpg";

export default function LandingPage() {
  return (
    <div 
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-4xl font-bold relative"
      style={{ backgroundImage: `url(${bgImage})` }} 
    >
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="relative z-10 text-center p-4">
        Believe in yourself 💡
        Take action 🚀 
        Achieve greatness 🌟
      </div>
    </div>
  );
}