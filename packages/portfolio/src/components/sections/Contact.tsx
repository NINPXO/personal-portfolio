import { Contact as ContactType } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';

interface ContactProps {
  contact: ContactType | null;
}

export function Contact({ contact }: ContactProps) {
  if (!contact) return null;

  return (
    <SectionWrapper id="contact" title="Get in Touch">
      <div className="max-w-2xl mx-auto text-center">
        {contact.availableForWork && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-green-800 font-semibold">
              ✓ Available for work
            </p>
            <p className="text-green-700">{contact.availabilityNote}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-4">
              Prefer to reach out via {contact.preferredContact}?
            </p>
            {contact.formEnabled && contact.formspreeEndpoint ? (
              <p className="text-sm text-gray-500">
                Use the contact form below or email directly.
              </p>
            ) : (
              <a
                href={`mailto:${contact.email}`}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Email
              </a>
            )}
          </div>

          {contact.calendlyUrl && (
            <div>
              <p className="text-gray-600 mb-4">Or book time on my calendar:</p>
              <a
                href={contact.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Schedule a Call
              </a>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
