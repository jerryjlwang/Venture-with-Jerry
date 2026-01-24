import ScrollTypewriterText from '../components/ScrollTypewriterText';
const About = () => {
  return <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{
    backgroundImage: `url('https://i.natgeofe.com/n/6e6d2eea-06d3-4ac4-94ca-2aba6f7f8757/mountain-pine-trees.jpg')`
  }}>
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white mb-6 font-courier tracking-wide font-medium">
            <ScrollTypewriterText text="About Me" speed={80} />
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-courier tracking-wide">
            Get to know the person behind the posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Image and Let's Connect */}
          <div className="lg:col-span-1 space-y-8">
            <div className="text-center">
              <div className="mb-4">
                <img alt="Jerry Wang" className="w-full max-w-xs mx-auto rounded-lg shadow-lg object-cover" src="/lovable-uploads/jerry-profile-new.jpeg" />
              </div>
              <h3 className="text-xl text-white mb-2 font-courier font-normal">Jerry Wang</h3>
              <p className="font-courier text-primary-foreground">Interviewer and Managing Editor</p>
            </div>

            <div>
              <h2 className="text-2xl text-white mb-4 font-courier tracking-wide font-medium">Let's Connect</h2>
              <div className="flex flex-col gap-4">
                <a href="mailto:wang.jerryjl@gmail.com" className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all text-center font-courier shadow-lg hover:shadow-blue-500/25">
                  Email Me
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jerry-wang-21a282368/" className="relative px-6 py-3 rounded-lg text-center font-courier text-blue-400 border-2 border-blue-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 hover:text-white">
                  LinkedIn
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/jerryjlwang" className="relative px-6 py-3 rounded-lg text-center font-courier text-blue-400 border-2 border-blue-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 hover:text-white">
                  GitHub
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/jerr_yw08/" className="relative px-6 py-3 rounded-lg text-center font-courier text-blue-400 border-2 border-blue-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl text-white mb-4 font-courier tracking-wide font-medium">My Background</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p className="font-courier">
                  My name is Jerry Wang and I’m a senior at Interlake High School in Bellevue. My areas of
                  interest lie in the intersection of AI and finance, and venture capital is one field that
                  encapsulates it all. I want to learn more about the evolution of AI and how it will break
                  the finance industry, so over the last year I’ve been learning as much as I can and
                  conducting interviews with venture capital professionals to start building my network.
                </p>
                <p className="font-courier">
                  Some of my hobbies include golfing, where I’m working towards being a single-digit 
                  handicapper, and pursuing business ideas. I like to think I’m a curious individual, 
                  so I always chase what I want.
                </p>
                <p className="font-courier">
                  This blog serves as a medium for documenting my learnings throughout my venture capital
                  journey and also sharing personal insights which I find interesting. Be sure to connect
                  with me on any platform below and feel free to ask for advice or help!
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl text-white mb-4 font-courier tracking-wide font-medium">Skills & Interests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg text-blue-400 mb-3 font-courier tracking-wide font-medium">Technical Skills</h3>
                  <ul className="text-gray-300 space-y-2 font-courier">
                    <li>• Math</li>
                    <li>• Python</li>
                    <li>• Financial Analysis</li>
                    <li>• Excel Modelling</li>
                    <li>• Experimental Design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg text-blue-400 mb-3 font-courier tracking-wide font-medium">Interests</h3>
                  <ul className="text-gray-300 space-y-2 font-courier">
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
        </div>
      </div>
    </div>;
};
export default About;