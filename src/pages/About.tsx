import LogoCarousel from '../components/LogoCarousel';

const About = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://i.natgeofe.com/n/6e6d2eea-06d3-4ac4-94ca-2aba6f7f8757/mountain-pine-trees.jpg')`
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get to know the person behind the posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Profile Image and Let's Connect */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-8 text-center shadow-xl">
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/e8f225ff-547a-4bc3-8df5-2aa0b80a5a82.png" 
                  alt="Jerry Wang"
                  className="w-full max-w-xs mx-auto rounded-lg shadow-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Jerry Wang</h3>
              <p className="text-blue-300">Developer & Writer</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Let's Connect</h2>
              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:wang.jerryjl@gmail.com" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Email Me
                </a>
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/jerry-wang-21a282368/" 
                  className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all text-center"
                >
                  LinkedIn
                </a>
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jerryjlwang" 
                  className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all text-center"
                >
                  GitHub
                </a>
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/jerr_yw08/" 
                  className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all text-center"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">My Background</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  My name is Jerry Wang and I’m a junior at Interlake High School in Bellevue. My areas of
                  interest lie in the intersection of AI and finance, and venture capital is one field that
                  encapsulates it all. I want to learn more about the evolution of AI and how it will break
                  the finance industry, so over the past few months I’ve been learning as much as I can and
                  conducting interviews with venture capital professionals to start building my network.
                </p>
                <p>
                  Some of my hobbies include golfing, where I’m working towards being a single-digit 
                  handicapper, and pursuing business ideas. I like to think I’m a curious individual, 
                  so I always chase what I want.
                </p>
                <p>
                  This blog serves as a medium for documenting my learnings throughout my venture capital
                  journey and also sharing personal insights which I find interesting. Be sure to connect
                  with me on any platform below and feel free to ask for advice or help!
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Skills & Interests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Technical Skills</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Math</li>
                    <li>• Python</li>
                    <li>• Financial Analysis</li>
                    <li>• Excel Modelling</li>
                    <li>• Experimental Design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Interests</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Open Source Projects</li>
                    <li>• VC Writing</li>
                    <li>• Golf Course Design</li>
                    <li>• Problem Solving</li>
                    <li>• Community Building</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Logo Carousel */}
          <div className="lg:col-span-1">
            <LogoCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
