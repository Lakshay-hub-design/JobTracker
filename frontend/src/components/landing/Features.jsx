import { Briefcase, Upload, BarChart, FileText, CalendarCheck, ChevronRight } from "lucide-react";

const features = [
  { icon: <Briefcase />, title: "Track Jobs", desc: "Organize your job applications." },
  { icon: <Upload />, title: "Upload Resume", desc: "Store and update your resumes." },
  { icon: <BarChart />, title: "Smart Dashboard", desc: "Visualize progress and metrics." }
];

const Features = () => {
  return (
    <main>
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bebas-neue tracking-wide text-gray-900">
                Everything You Need to Get Hired
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our powerful features are designed to keep your job search organized, efficient, and stress-free.
              </p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-6">
                  <BarChart className="h-8 w-8 text-brand-purple" />
                </div>
                <h3 className="text-2xl font-bold">Unified Dashboard</h3>
                <p className="mt-2 text-gray-600">See all your applications, interviews, and offers in one clean, simple interface.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-6">
                  <FileText className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold">Resume Management</h3>
                <p className="mt-2 text-gray-600">Store and manage different versions of your resume for each job application.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
                  <CalendarCheck className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold">Interview Scheduling</h3>
                <p className="mt-2 text-gray-600">Never miss an interview. Keep track of all your upcoming appointments and deadlines.</p>
              </div>
            </div>
          </div> 
    </section>
       <section id="how-it-works" className="py-20 lg:py-28 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bebas-neue tracking-wide text-gray-900">
                Get Organized in 3 Simple Steps
              </h2>
            </div>
            <div className="mt-16 grid lg:grid-cols-3 gap-8 items-center text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bebas-neue text-purple-200">01</div>
                <h3 className="mt-2 text-2xl font-bold text-purple-600">Add an Application</h3>
                <p className="mt-2 text-gray-600">Quickly save job details from any website or add them manually in seconds.</p>
              </div>
              <ChevronRight className="hidden lg:block h-12 w-12 text-gray-300 mx-auto" />
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bebas-neue text-orange-200">02</div>
                <h3 className="mt-2 text-2xl font-bold text-orange-600">Track Your Progress</h3>
                <p className="mt-2 text-gray-600">Move your applications through customizable stages like "Applied" or "Interviewing."</p>
              </div>
               <ChevronRight className="hidden lg:block h-12 w-12 text-gray-300 mx-auto" />
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bebas-neue text-yellow-200">03</div>
                <h3 className="mt-2 text-2xl font-bold text-yellow-600">Manage Deadlines</h3>
                <p className="mt-2 text-gray-600">Set reminders for interviews, follow-ups, and other important tasks.</p>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
};

export default Features;
