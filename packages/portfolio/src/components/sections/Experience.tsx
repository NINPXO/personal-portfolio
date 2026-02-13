import { Experience } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { TimelineItem } from '../ui/TimelineItem';

interface ExperienceProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceProps) {
  if (!experience || experience.length === 0) return null;

  // Sort by start date (newest first)
  const sorted = [...experience].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <SectionWrapper id="experience" title="Experience">
      <div className="max-w-3xl">
        {sorted.map((exp) => (
          <TimelineItem key={exp.id} experience={exp} />
        ))}
      </div>
    </SectionWrapper>
  );
}
