import { SkillsData } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { SkillBadge } from '../ui/SkillBadge';

interface SkillsProps {
  skills: SkillsData | null;
}

export function Skills({ skills }: SkillsProps) {
  if (!skills || skills.categories.length === 0) return null;

  return (
    <SectionWrapper id="skills" title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">{category.name}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
