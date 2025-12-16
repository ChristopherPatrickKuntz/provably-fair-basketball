import { useState } from 'react';
import { Header } from './Header';
import { SCHOOL_STATEMENT, FAQ } from '../data/coachingResources';

export function ResourcesHubScreen({ onBack }) {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header 
        title="Resources" 
        leftAction={onBack}
        leftLabel="← Home"
      />

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-lg mx-auto space-y-3">
          
          {/* Philosophy */}
          <ResourceCard
            title="Coaching Philosophy"
            icon="📖"
            isExpanded={expandedSection === 'philosophy'}
            onToggle={() => setExpandedSection(expandedSection === 'philosophy' ? null : 'philosophy')}
          >
            <div className="space-y-4">
              <QuoteBlock>
                "We're not here to build basketball players. We're here to build people. Basketball is just the tool."
              </QuoteBlock>
              
              <Section title="Core Beliefs">
                <ul className="space-y-2">
                  <BulletPoint>Every kid deserves a fair chance</BulletPoint>
                  <BulletPoint>Effort and attitude matter most</BulletPoint>
                  <BulletPoint>Skills are teachable, character is foundational</BulletPoint>
                  <BulletPoint>Structure creates safety for growth</BulletPoint>
                  <BulletPoint>Development over winning (but we still compete)</BulletPoint>
                </ul>
              </Section>

              <Section title="What This Means">
                <ul className="space-y-2">
                  <BulletPoint>Rate what you see, not what you assume</BulletPoint>
                  <BulletPoint>Give every player meaningful feedback</BulletPoint>
                  <BulletPoint>Place kids where they can grow, not just where they're "good enough"</BulletPoint>
                  <BulletPoint>Teach the game properly—fundamentals first</BulletPoint>
                </ul>
              </Section>
            </div>
          </ResourceCard>

          {/* Developmental Contract */}
          <ResourceCard
            title="Developmental Contract"
            icon="📋"
            isExpanded={expandedSection === 'developmental'}
            onToggle={() => setExpandedSection(expandedSection === 'developmental' ? null : 'developmental')}
          >
            <div className="space-y-4">
              <QuoteBlock>
                Ball control precedes court awareness. Court awareness precedes decision-making. Decision-making precedes systems.
              </QuoteBlock>

              <Section title="Readiness Ladder">
                <div className="space-y-2">
                  <LevelRow level="A" focus="Ball control + balance" examples="Dribble control, passing accuracy, jump stops" />
                  <LevelRow level="B" focus="Spacing + simple movement" examples="Pass and cut, fill spots, basic spacing" />
                  <LevelRow level="C" focus="Simple reads" examples="Give-and-go, basic help defense reads" />
                  <LevelRow level="D" focus="Layered decisions" examples="Multiple reads, timing under pressure" />
                  <LevelRow level="E" focus="Full concepts" examples="Full read-and-react concepts" />
                </div>
              </Section>

              <Section title="Key Rule">
                <div className="bg-[var(--accent-light)] rounded-[10px] p-3">
                  <p className="text-[15px] text-[var(--accent)] font-medium">
                    You do not advance levels until the previous level is observable without prompting.
                  </p>
                </div>
              </Section>
            </div>
          </ResourceCard>

          {/* Age Expectations */}
          <ResourceCard
            title="Age-Appropriate Expectations"
            icon="👶"
            isExpanded={expandedSection === 'age'}
            onToggle={() => setExpandedSection(expandedSection === 'age' ? null : 'age')}
          >
            <div className="space-y-4">
              <Section title="Middle School (Grades 6-8)">
                <div className="bg-[var(--bg-secondary)] rounded-[10px] p-3 space-y-2">
                  <p className="text-[13px] text-[var(--text-muted)] uppercase tracking-wide">Focus</p>
                  <p className="text-[15px] text-[var(--text-primary)]">Engagement, enthusiasm, fundamentals</p>
                  <p className="text-[13px] text-[var(--text-muted)] mt-2 uppercase tracking-wide">Priorities</p>
                  <ul className="space-y-1">
                    <li className="text-[15px] text-[var(--text-primary)]">• Effort and attitude above skill</li>
                    <li className="text-[15px] text-[var(--text-primary)]">• Basic movement patterns</li>
                    <li className="text-[15px] text-[var(--text-primary)]">• Positive relationship with sport</li>
                  </ul>
                </div>
              </Section>

              <Section title="High School (Grades 9-12)">
                <div className="bg-[var(--bg-secondary)] rounded-[10px] p-3 space-y-2">
                  <p className="text-[13px] text-[var(--text-muted)] uppercase tracking-wide">Focus</p>
                  <p className="text-[15px] text-[var(--text-primary)]">Consistency, competitive readiness, leadership</p>
                  <p className="text-[13px] text-[var(--text-muted)] mt-2 uppercase tracking-wide">Priorities</p>
                  <ul className="space-y-1">
                    <li className="text-[15px] text-[var(--text-primary)]">• Reliability under pressure</li>
                    <li className="text-[15px] text-[var(--text-primary)]">• Team-first decision making</li>
                    <li className="text-[15px] text-[var(--text-primary)]">• Physical and mental preparation</li>
                  </ul>
                </div>
              </Section>
            </div>
          </ResourceCard>

          {/* Privacy */}
          <ResourceCard
            title="Privacy & Data"
            icon="🔒"
            isExpanded={expandedSection === 'privacy'}
            onToggle={() => setExpandedSection(expandedSection === 'privacy' ? null : 'privacy')}
          >
            <div className="space-y-4">
              <Section title="How We Protect Players">
                <ul className="space-y-2">
                  <BulletPoint>No names stored in the app—numbers only</BulletPoint>
                  <BulletPoint>Paper attendance sheet links numbers to names</BulletPoint>
                  <BulletPoint>School controls the paper, coach controls the app</BulletPoint>
                  <BulletPoint>All data stays on your device (localStorage)</BulletPoint>
                  <BulletPoint>No cloud sync, no external servers</BulletPoint>
                </ul>
              </Section>

              <Section title="Export Responsibility">
                <div className="bg-[var(--rating-ok)]/10 border border-[var(--rating-ok)]/30 rounded-[10px] p-3">
                  <p className="text-[15px] text-[var(--text-primary)]">
                    When you copy results, you're responsible for how that data is stored and shared. Keep it secure.
                  </p>
                </div>
              </Section>
            </div>
          </ResourceCard>

          {/* Quick Reference */}
          <ResourceCard
            title="Quick Reference"
            icon="⚡"
            isExpanded={expandedSection === 'quick'}
            onToggle={() => setExpandedSection(expandedSection === 'quick' ? null : 'quick')}
          >
            <div className="space-y-4">
              <Section title="Rating Scale">
                <div className="space-y-2">
                  <RatingRow label="Skip" desc="Didn't observe this domain" color="var(--text-muted)" />
                  <RatingRow label="Needs Work" desc="Below age-appropriate expectations" color="var(--rating-needs-work)" />
                  <RatingRow label="OK" desc="Meets basic expectations" color="var(--rating-ok)" />
                  <RatingRow label="Good" desc="Above expectations, ready for more" color="var(--rating-good)" />
                </div>
              </Section>

              <Section title="6 Evaluation Domains">
                <div className="grid grid-cols-2 gap-2">
                  <DomainChip name="Effort" weight="2×" />
                  <DomainChip name="Coachable" weight="2×" />
                  <DomainChip name="Ball Skills" weight="1×" />
                  <DomainChip name="Footwork" weight="1×" />
                  <DomainChip name="Finishing" weight="1×" />
                  <DomainChip name="Teammate" weight="1×" />
                </div>
              </Section>
            </div>
          </ResourceCard>

          {/* FAQ */}
          <ResourceCard
            title="FAQ"
            icon="❓"
            isExpanded={expandedSection === 'faq'}
            onToggle={() => setExpandedSection(expandedSection === 'faq' ? null : 'faq')}
          >
            <div className="space-y-3">
              {FAQ.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
          </ResourceCard>

          {/* School Statement */}
          <ResourceCard
            title="School Statement Template"
            icon="🏫"
            isExpanded={expandedSection === 'school'}
            onToggle={() => setExpandedSection(expandedSection === 'school' ? null : 'school')}
          >
            <div className="space-y-4">
              <div className="bg-[var(--accent-light)] rounded-[10px] p-3">
                <p className="text-[13px] text-[var(--accent)]">
                  Copy-paste template for principals and athletic directors to share with parents or board members.
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
                onClick={() => {
                  const text = generateSchoolStatementText();
                  navigator.clipboard.writeText(text);
                  alert('Copied to clipboard!');
                }}
                className="w-full py-2.5 bg-[var(--accent)] text-white rounded-[10px] text-[14px] font-medium"
              >
                Copy Statement to Clipboard
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
      <span className="text-[15px] font-semibold" style={{ color }}>{label}</span>
      <span className="text-[13px] text-[var(--text-muted)]">— {desc}</span>
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
