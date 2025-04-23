export default function Background() {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
     
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    );
  }
  