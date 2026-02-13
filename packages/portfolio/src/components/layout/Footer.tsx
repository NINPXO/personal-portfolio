import { Profile } from '../../types';

interface FooterProps {
  profile: Profile | null;
}

export function Footer({ profile }: FooterProps) {
  if (!profile) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{profile.name}</h3>
            <p className="text-gray-400">{profile.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#projects" className="block hover:text-white">
                Projects
              </a>
              <a href="#blog" className="block hover:text-white">
                Blog
              </a>
              <a href="#contact" className="block hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {profile.social.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  GitHub
                </a>
              )}
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  LinkedIn
                </a>
              )}
              {profile.social.email && (
                <a
                  href={`mailto:${profile.social.email}`}
                  className="hover:text-gray-300"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            © {currentYear} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
