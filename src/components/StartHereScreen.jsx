import { Header } from './Header';

// The on-ramp for someone who got pulled into coaching and has no idea where to
// begin. Reassuring, plain-language, and ordered: do these in sequence and you
// are ready for a first practice and a fair tryout. Each step jumps to the real
// content or tool, so this is a guide, not a duplicate of it.
const STEPS = [
  {
    target: 'mindset',
    icon: '🧠',
    minutes: '5 min',
    title: 'Get the mindset',
    description: "The one thing that matters most is how you treat the kids. Read this first, the rest is easier after it.",
  },
  {
    target: 'practice',
    icon: '🏀',
    minutes: '10 min',
    title: 'Plan your first practice',
    description: 'A ready-made 90-minute plan so day one runs smoothly, even if you have never coached.',
  },
  {
    target: 'tryout',
    icon: '📋',
    minutes: 'when tryouts come',
    title: 'Run a fair tryout',
    description: 'Rate players by number across 6 simple things. The app scores and ranks them for you.',
  },
  {
    target: 'season',
    icon: '📅',
    minutes: 'all season',
    title: 'Follow the season plan',
    description: '12 weeks laid out for you, with what to work on each week and a plan for every practice.',
  },
  {
    target: 'parents',
    icon: '💬',
    minutes: 'as needed',
    title: 'Talk with parents',
    description: 'Copy-paste messages for the common conversations, from the welcome email to tough ones.',
  },
];

export function StartHereScreen({ onBack, onGo }) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header title="Start Here" leftAction={onBack} leftLabel="← Home" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-5 py-6">

          {/* Reassuring intro */}
          <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-5 mb-5">
            <h2 className="text-[19px] font-bold text-[var(--text-primary)] mb-1.5">
              Asked to coach? You've got this.
            </h2>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
              You don't have to be a basketball expert. Work through these five steps in order and
              you'll be ready for your first practice and a fair tryout. Come back any time, nothing is lost.
            </p>
          </div>

          {/* Ordered steps */}
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <button
                key={step.target}
                onClick={() => onGo(step.target)}
                className="w-full text-left rounded-[var(--radius)] p-4 flex items-start gap-3 bg-[var(--bg-card)] shadow-[var(--shadow-card)] transition-all active:scale-[0.98]"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white text-[14px] font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[17px]" aria-hidden="true">{step.icon}</span>
                    <span className="text-[16px] font-semibold text-[var(--text-primary)]">{step.title}</span>
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)] leading-snug">{step.description}</p>
                  <span className="inline-block mt-2 text-[11px] font-medium text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded-full">
                    {step.minutes}
                  </span>
                </div>
                <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <p className="text-[13px] text-[var(--text-muted)] text-center mt-6 px-4">
            That's the whole job. Everything here is free, private, and stays on your device.
          </p>
        </div>
      </div>
    </div>
  );
}
