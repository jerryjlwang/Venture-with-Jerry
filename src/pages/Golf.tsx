import golfBackground from '@/assets/golf-background.png';

const Golf = () => {
  return (
    <div className="min-h-screen bg-green-950 relative">
      {/* Background image section */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${golfBackground})`
      }}>
        {/* Dark green overlay on the image */}
        <div className="absolute inset-0 bg-green-950 bg-opacity-60"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Golf
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
            Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Golf;
