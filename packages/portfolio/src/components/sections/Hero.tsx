import { Profile } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';

interface HeroProps {
  profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
  if (!profile) return null;

  return (
    <SectionWrapper id="hero" title="">
      <div className="text-center">
        <div className="mb-6">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600"
            />
          )}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">{profile.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">{profile.tagline}</p>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          {profile.bio}
        </p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {profile.social.github && (
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              GitHub
            </a>
          )}
          {profile.social.linkedin && (
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              LinkedIn
            </a>
          )}
          {profile.social.email && (
            <a
              href={`mailto:${profile.social.email}`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Email
            </a>
          )}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white"
            >
              Resume
            </a>
          )}
        </div>

        <p className="text-gray-600">📍 {profile.location}</p>
      </div>
    </SectionWrapper>
  );
}
