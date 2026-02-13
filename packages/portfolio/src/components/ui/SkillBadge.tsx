import { Skill } from '../../types';

interface SkillBadgeProps {
  skill: Skill;
}

const levelColors: Record<string, string> = {
  expert: 'bg-green-100 text-green-800',
  proficient: 'bg-blue-100 text-blue-800',
  learning: 'bg-yellow-100 text-yellow-800',
  familiar: 'bg-gray-100 text-gray-800',
};

export function SkillBadge({ skill }: SkillBadgeProps) {
  const colorClass = levelColors[skill.level] || levelColors.familiar;

  return (
    <div className={`px-4 py-2 rounded-full text-sm font-medium ${colorClass}`}>
      {skill.name}
    </div>
  );
}
