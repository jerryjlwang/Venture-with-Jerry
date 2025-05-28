
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get to know the person behind the posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Image Placeholder */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-8 text-center shadow-xl">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">YN</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Your Name</h3>
              <p className="text-blue-300">Developer & Writer</p>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">My Story</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Hello! I'm a passionate developer and writer who loves to share knowledge and experiences 
                  with the community. My journey in technology started several years ago, and I've been 
                  fascinated by the endless possibilities of creating digital solutions.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, reading about industry 
                  trends, or working on personal projects that challenge me to grow as a developer and as 
                  a person.
                </p>
                <p>
                  This blog serves as my digital notebook where I document my learning journey, share 
                  insights, and hopefully help others along the way.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Skills & Interests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Technical Skills</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Web Development</li>
                    <li>• JavaScript/TypeScript</li>
                    <li>• React & Modern Frameworks</li>
                    <li>• Database Design</li>
                    <li>• Cloud Technologies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Interests</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Open Source Projects</li>
                    <li>• Tech Writing</li>
                    <li>• Continuous Learning</li>
                    <li>• Problem Solving</li>
                    <li>• Community Building</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Let's Connect</h2>
              <p className="text-gray-300 mb-6">
                I'm always excited to connect with fellow developers, writers, and anyone interested 
                in technology. Feel free to reach out!
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:your.email@example.com" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Email Me
                </a>
                <a 
                  href="#" 
                  className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  LinkedIn
                </a>
                <a 
                  href="#" 
                  className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  GitHub
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
