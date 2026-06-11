import { Header } from './Header';

const SECTIONS = [
  {
    id: 'season',
    icon: '📅',
    title: 'Season Plan',
    description: 'Weekly focus, practice plans, and league rules, on a schedule you set.',
  },
  {
    id: 'practice',
    icon: '🏋️',
    title: 'Practice Toolkit',
    description: '90-minute template, drill library, quick sessions, and your own saved plans.',
  },
  {
    id: 'guide',
    icon: '🎓',
    title: "Coach's Guide",
    description: 'Mindset, age-appropriate development, common traps, templates, and checklists.',
  },
  {
    id: 'reference',
    icon: '📌',
    title: 'Quick Reference',
    description: 'The 6 things you rate, the rating scale, coaching philosophy, and FAQ.',
  },
];

export function HandbookScreen({ onBack, onOpen }) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header title="Coaching Handbook" leftAction={onBack} leftLabel="← Home" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-5 py-6">
          <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-5">
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
              Everything you need to plan and run the season. Use the tryout tool on the home
              screen to evaluate players, this is the reference library.
            </p>
          </div>

          <div className="space-y-3">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => onOpen(section.id)}
                className="w-full text-left rounded-[var(--radius)] p-4 flex items-center gap-4 bg-[var(--bg-card)] shadow-[var(--shadow-card)] transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-[12px] bg-[var(--bg-secondary)] flex items-center justify-center text-2xl flex-shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <span className="text-[17px] font-semibold text-[var(--text-primary)]">
                    {section.title}
                  </span>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5">
                    {section.description}
                  </p>
                </div>
                <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
