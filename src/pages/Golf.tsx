import golfBackground from '@/assets/golf-background.png';
import GolfCourseMap from '@/components/GolfCourseMap';
const Golf = () => {
  return <div className="min-h-screen relative" style={{
    backgroundColor: '#052e16'
  }}>
      {/* Background image section */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{
      backgroundImage: `url(${golfBackground})`
    }}>
        <div className="absolute inset-0 bg-green-950 bg-opacity-40"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-courier tracking-wide">18 Holes, 18 Milestones</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-courier">My life through golf.</p>
        </div>

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