import { useData } from './hooks/useData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { ExperienceSection } from './components/sections/Experience';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';

function App() {
  const { profile, projects, skills, experience, blog, contact, loading, error } = useData();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Loading portfolio...</h1>
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <ExperienceSection experience={experience} />
        <Blog posts={blog} />
        <Contact contact={contact} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

export default App;
