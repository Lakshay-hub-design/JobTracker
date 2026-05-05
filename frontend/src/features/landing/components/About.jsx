const About = () => {
  return (
    <section className="bg-orange-50 py-16 px-4">
      <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <span className="font-bold text-orange-600">OUR MISSION</span>
                <h2 className="mt-2 text-4xl lg:text-5xl font-bebas-neue tracking-wide text-gray-900">
                  From Job Seekers, For Job Seekers
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  JobTracker was born from our own frustrating experiences managing job applications with messy spreadsheets and scattered notes. We knew there had to be a better way.
                </p>
                <p className="mt-4 text-gray-600">
                  Our mission is to empower every job seeker with the tools they need to stay organized, motivated, and confident throughout their job search journey. We believe that with the right support, finding your dream job can be an exciting and rewarding process, not a stressful one.
                </p>
              </div>
              
              {/* Right Image */}
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Team collaborating"
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
    </section>
  );
};

export default About;
