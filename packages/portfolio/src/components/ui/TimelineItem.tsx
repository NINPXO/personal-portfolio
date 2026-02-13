import { Experience } from '../../types';

interface TimelineItemProps {
  experience: Experience;
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export function TimelineItem({ experience }: TimelineItemProps) {
  const startDate = formatDate(experience.startDate);
  const endDate = experience.endDate ? formatDate(experience.endDate) : 'Present';

  return (
    <div className="flex gap-6">
      <div className="relative">
        <div className="w-4 h-4 rounded-full bg-blue-600 mt-2"></div>
        <div className="absolute left-[7px] top-6 w-0.5 h-24 bg-gray-300"></div>
      </div>
      <div className="pb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold">{experience.role}</h3>
              <p className="text-gray-600">{experience.company}</p>
              <p className="text-sm text-gray-500">{experience.location}</p>
            </div>
            <span className="text-sm text-gray-500">
              {startDate} — {endDate}
            </span>
          </div>
          <p className="text-gray-700 mb-3">{experience.description}</p>
          {experience.highlights.length > 0 && (
            <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
              {experience.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          )}
          {experience.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-gray-100 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
