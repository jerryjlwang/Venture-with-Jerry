import golfBackground from '@/assets/golf-background.png';
import GolfCourseMap from '@/components/GolfCourseMap';
const Golf = () => {
  return <div className="min-h-screen relative" style={{
    backgroundColor: '#052e16'
  }}>
      {/* Background image section */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{
      backgroundImage: `url(${golfBackground})`
    }}>
        <div className="absolute inset-0 bg-green-950 bg-opacity-20"></div>
      </div>
      
      {/* Hero section - centered in viewport */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-4 font-courier tracking-wide font-medium">18 Holes, 18 Milestones</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-courier">My life through golf.</p>
        </div>
      </div>

      {/* Map section - below the fold */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <GolfCourseMap />

        <div className="mt-16 text-center">
          <p className="text-white/60 font-courier text-sm">
            ​
          </p>
        </div>
      </div>
    </div>;
};
export default Golf;