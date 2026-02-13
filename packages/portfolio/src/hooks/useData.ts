import { useEffect, useState } from 'react';
import {
  Profile,
  Project,
  SkillsData,
  Experience,
  BlogPost,
  Contact,
} from '../types/index';

interface DataState {
  profile: Profile | null;
  projects: Project[];
  skills: SkillsData | null;
  experience: Experience[];
  blog: BlogPost[];
  contact: Contact | null;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  profile: null,
  projects: [],
  skills: null,
  experience: [],
  blog: [],
  contact: null,
  loading: true,
  error: null,
};

export function useData() {
  const [data, setData] = useState<DataState>(initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Dynamically import JSON files
        const [profile, projects, skills, experience, blog, contact] =
          await Promise.all([
            import('../data/profile.json').then((m) => m.default),
            import('../data/projects.json').then((m) => m.default),
            import('../data/skills.json').then((m) => m.default),
            import('../data/experience.json').then((m) => m.default),
            import('../data/blog.json').then((m) => m.default),
            import('../data/contact.json').then((m) => m.default),
          ]);

        setData({
          profile,
          projects,
          skills,
          experience,
          blog: blog.filter((post: BlogPost) => post.published),
          contact,
          loading: false,
          error: null,
        });
      } catch (err) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to load portfolio data',
        }));
      }
    };

    loadData();
  }, []);

  return data;
}
