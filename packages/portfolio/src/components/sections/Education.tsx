import { SectionWrapper } from '../ui/SectionWrapper';

interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

interface EducationProps {
  education: EducationEntry[];
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export function Education({ education }: EducationProps) {
  if (!education || education.length === 0) return null;

  // Sort by end date (newest first)
  const sorted = [...education].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  return (
    <SectionWrapper id="education" title="Education">
      <div className="max-w-3xl space-y-6">
        {sorted.map((edu) => (
          <div key={edu.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-lg text-gray-700">{edu.school}</p>
                {edu.field && (
                  <p className="text-sm text-gray-600">Field of Study: {edu.field}</p>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </span>
            </div>

            {edu.description && (
              <p className="text-gray-700 mb-4">{edu.description}</p>
            )}

            {edu.skills && edu.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
