import { useState } from 'react';
import { Header } from './Header';
import { DOMAINS } from '../data/domains';
import { SCHOOL_STATEMENT, FAQ } from '../data/coachingResources';

export function ResourcesHubScreen({ onBack }) {
  // Lead with the thing coaches look up most: how the tryout tool scores.
  const [expandedSection, setExpandedSection] = useState('howRating');
  const [copyStatus, setCopyStatus] = useState('idle');

  const toggle = (id) => setExpandedSection(expandedSection === id ? null : id);

  const handleCopyStatement = async () => {
    try {
      await navigator.clipboard.writeText(generateSchoolStatementText());
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header title="Quick Reference" leftAction={onBack} leftLabel="← Handbook" />

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-lg mx-auto space-y-3">
          <p className="text-[14px] text-[var(--text-secondary)] px-1 mb-1">
            The essentials, for quick lookup during tryouts and practice.
          </p>

          {/* How rating works - the core of the tool, open by default */}
          <ResourceCard
            title="How rating works"
            icon="⭐"
            isExpanded={expandedSection === 'howRating'}
            onToggle={() => toggle('howRating')}
          >
            <div className="space-y-4">
              <Section title="The 4 ratings">
                <div className="space-y-2">
                  <RatingRow label="Skip" desc="You didn't get to see this. Don't guess." color="var(--text-muted)" />
                  <RatingRow label="Needs Work" desc="Below what's typical for this age" color="var(--rating-needs-work)" />
                  <RatingRow label="OK" desc="About what you'd expect" color="var(--rating-ok)" />
                  <RatingRow label="Good" desc="Stands out, ready for more" color="var(--rating-good)" />
                </div>
              </Section>

              <Section title="The 6 things you rate">
                <div className="grid grid-cols-2 gap-2">
                  {DOMAINS.map((d) => (
                    <DomainChip key={d.id} name={d.name} weight={`${d.weight}×`} />
                  ))}
                </div>
                <p className="text-[12px] text-[var(--text-muted)] mt-2 leading-snug">
                  Higher weight counts more toward the score. Effort counts most, then the two
                  character domains (Coachable, Teammate), because those matter more than raw skill at this age.
                </p>
              </Section>

              <div className="bg-[var(--accent-light)] rounded-[10px] p-3">
                <p className="text-[13px] text-[var(--text-secondary)]">
                  While rating, tap any domain to see exactly what to look for and the red flags. You don't
                  need to know basketball, the app tells you what to watch.
                </p>
              </div>
            </div>
          </ResourceCard>

          {/* Readiness Ladder - the one home for "what to teach, in order" */}
          <ResourceCard
            title="What to teach, in order"
            icon="🪜"
            isExpanded={expandedSection === 'ladder'}
            onToggle={() => toggle('ladder')}
          >
            <div className="space-y-4">
              <QuoteBlock>
                Ball control comes before court awareness. Court awareness comes before decision-making.
                Decision-making comes before set plays.
              </QuoteBlock>

              <Section title="Readiness ladder">
                <div className="space-y-2">
                  <LevelRow level="A" focus="Ball control + balance" examples="Dribble control, passing accuracy, jump stops" />
                  <LevelRow level="B" focus="Spacing + simple movement" examples="Pass and cut, fill spots, basic spacing" />
                  <LevelRow level="C" focus="Simple reads" examples="Give-and-go, basic help defense reads" />
                  <LevelRow level="D" focus="Layered decisions" examples="Multiple reads, timing under pressure" />
                  <LevelRow level="E" focus="Full concepts" examples="Full read-and-react concepts" />
                </div>
              </Section>

              <Section title="The one rule">
                <div className="bg-[var(--accent-light)] rounded-[10px] p-3">
                  <p className="text-[15px] text-[var(--accent)] font-medium">
                    Don't move up a level until the players can do the level below without you reminding them.
                  </p>
                </div>
              </Section>
            </div>
          </ResourceCard>

          {/* Privacy */}
          <ResourceCard
            title="Privacy & data"
            icon="🔒"
            isExpanded={expandedSection === 'privacy'}
            onToggle={() => toggle('privacy')}
          >
            <div className="space-y-4">
              <Section title="How players are protected">
                <ul className="space-y-2">
                  <BulletPoint>No names in the app, jersey numbers only</BulletPoint>
                  <BulletPoint>A paper attendance sheet links numbers to names</BulletPoint>
                  <BulletPoint>The school controls the paper, the coach controls the app</BulletPoint>
                  <BulletPoint>Everything stays on your device, nothing is uploaded</BulletPoint>
                  <BulletPoint>No accounts, no cloud, no external servers</BulletPoint>
                </ul>
              </Section>

              <Section title="Your responsibility">
                <div className="bg-[var(--rating-ok)]/10 border border-[var(--rating-ok)]/30 rounded-[10px] p-3">
                  <p className="text-[15px] text-[var(--text-primary)]">
                    When you copy or print results, you're responsible for how that is stored and shared. Keep it secure.
                  </p>
                </div>
              </Section>
            </div>
          </ResourceCard>

          {/* FAQ */}
          <ResourceCard
            title="Common questions"
            icon="❓"
            isExpanded={expandedSection === 'faq'}
            onToggle={() => toggle('faq')}
          >
            <div className="space-y-3">
              {FAQ.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
          </ResourceCard>

          {/* School Statement */}
          <ResourceCard
            title="Statement for your school"
            icon="🏫"
            isExpanded={expandedSection === 'school'}
            onToggle={() => toggle('school')}
          >
            <div className="space-y-4">
              <div className="bg-[var(--accent-light)] rounded-[10px] p-3">
                <p className="text-[13px] text-[var(--accent)]">
                  A ready-to-send note for principals and athletic directors to share with parents or the board.
                </p>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-[10px] p-4">
                <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">
                  {SCHOOL_STATEMENT.title}
                </h4>
                <p className="text-[13px] text-[var(--text-secondary)] mb-4">
                  {SCHOOL_STATEMENT.intro}
                </p>

                {SCHOOL_STATEMENT.sections.map((section, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-1">
                      {section.heading}
                    </p>
                    {section.content && (
                      <p className="text-[12px] text-[var(--text-secondary)] mb-2">{section.content}</p>
                    )}
                    {section.intro && (
                      <p className="text-[12px] text-[var(--text-secondary)] mb-1">{section.intro}</p>
                    )}
                    <ul className="space-y-1">
                      {section.bullets.map((bullet, j) => (
                        <li key={j} className="text-[12px] text-[var(--text-secondary)] flex items-start gap-2">
                          <span className="text-[var(--text-muted)]">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    {section.note && (
                      <p className="text-[12px] text-[var(--text-muted)] italic mt-2">{section.note}</p>
                    )}
                    {section.closing && (
                      <p className="text-[12px] text-[var(--text-secondary)] mt-2">{section.closing}</p>
                    )}
                  </div>
                ))}

                <p className="text-[12px] text-[var(--text-muted)] whitespace-pre-line mt-4 pt-4 border-t border-[var(--bg-page)]">
                  {SCHOOL_STATEMENT.signature}
                </p>
              </div>

              <button
                onClick={handleCopyStatement}
                className={`w-full py-2.5 rounded-[10px] text-[14px] font-medium transition-colors ${
                  copyStatus === 'copied'
                    ? 'bg-[var(--rating-good)] text-white'
                    : 'bg-[var(--accent)] text-white'
                }`}
              >
                {copyStatus === 'copied' ? '✓ Copied' : copyStatus === 'error' ? 'Copy failed, select manually' : 'Copy statement'}
              </button>
            </div>
          </ResourceCard>
        </div>
      </div>
    </div>
  );
}

function generateSchoolStatementText() {
  let text = `${SCHOOL_STATEMENT.title}\n\n`;
  text += `${SCHOOL_STATEMENT.intro}\n\n`;

  SCHOOL_STATEMENT.sections.forEach(section => {
    text += `${section.heading.toUpperCase()}\n`;
    if (section.content) text += `${section.content}\n`;
    if (section.intro) text += `${section.intro}\n`;
    section.bullets.forEach(bullet => {
      text += `• ${bullet}\n`;
    });
    if (section.note) text += `\n${section.note}\n`;
    if (section.closing) text += `\n${section.closing}\n`;
    text += '\n';
  });

  text += `${SCHOOL_STATEMENT.signature}`;
  return text;
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--bg-secondary)] pb-3 last:border-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-start justify-between gap-2"
      >
        <span className="text-[14px] font-medium text-[var(--text-primary)]">{question}</span>
        <svg
          className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <p className="text-[13px] text-[var(--text-secondary)] mt-2 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

function ResourceCard({ title, icon, isExpanded, onToggle, children }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="text-[17px] font-medium text-[var(--text-primary)]">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-[var(--bg-secondary)] pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-2">{title}</p>
      {children}
    </div>
  );
}

function QuoteBlock({ children }) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-[10px] p-3 border-l-4 border-[var(--accent)]">
      <p className="text-[15px] text-[var(--text-primary)] italic">{children}</p>
    </div>
  );
}

function BulletPoint({ children }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-[var(--text-primary)]">
      <span className="text-[var(--accent)]">•</span>
      {children}
    </li>
  );
}

function LevelRow({ level, focus, examples }) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-[10px] p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white text-[13px] font-bold flex items-center justify-center">
          {level}
        </span>
        <span className="text-[15px] font-medium text-[var(--text-primary)]">{focus}</span>
      </div>
      <p className="text-[13px] text-[var(--text-muted)] ml-8">{examples}</p>
    </div>
  );
}

function RatingRow({ label, desc, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[15px] font-semibold min-w-[92px]" style={{ color }}>{label}</span>
      <span className="text-[13px] text-[var(--text-muted)]">{desc}</span>
    </div>
  );
}

function DomainChip({ name, weight }) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-[8px] px-3 py-2 flex items-center justify-between">
      <span className="text-[13px] text-[var(--text-primary)]">{name}</span>
      <span className="text-[11px] text-[var(--accent)] font-medium">{weight}</span>
    </div>
  );
}
