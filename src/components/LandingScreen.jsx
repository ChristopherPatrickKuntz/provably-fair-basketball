import { useState } from 'react';
import { LEGAL_DISCLAIMER } from '../data/coachingResources';

export function LandingScreen({ onNavigate, hasExistingSessions }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      {/* Hero Section */}
      <div className="px-6 pt-12 pb-8 text-center">
        {/* Logo */}
        <img 
          src="/logo-192.png" 
          alt="Provably Fair Basketball" 
          className="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-lg"
        />

        {/* Title */}
        <h1 className="text-[28px] font-bold text-[var(--text-primary)] mb-1">
          Provably Fair
        </h1>
        <h2 className="text-[17px] font-medium text-[var(--text-secondary)] mb-3">
          Basketball Coaching System
        </h2>

        {/* Tagline */}
        <p className="text-[15px] text-[var(--text-muted)] max-w-xs mx-auto">
          Fair evaluation. Structured practices. Player development.
        </p>
      </div>

      {/* Main Tools */}
      <div className="flex-1 px-5 pb-6">
        <div className="max-w-md mx-auto space-y-3">
          
          {/* Tryout Tool - Primary */}
          <ToolCard
            icon="📋"
            title="Tryout Evaluation"
            description="Rate players across 6 domains. Auto-scoring and ranking."
            badge={hasExistingSessions ? "Continue" : null}
            isPrimary
            onClick={() => onNavigate('tryout')}
          />

          {/* Season Spine */}
          <ToolCard
            icon="📅"
            title="Season Plan"
            description="12-week curriculum with league rules and weekly focus."
            onClick={() => onNavigate('season')}
          />

          {/* Practice Toolkit */}
          <ToolCard
            icon="🏋️"
            title="Practice Toolkit"
            description="90-minute template and full drill library."
            onClick={() => onNavigate('practice')}
          />

          {/* New Coach's Guide */}
          <ToolCard
            icon="🎓"
            title="Coach's Guide"
            description="Complete training: LTAD, templates, checklists, rules."
            onClick={() => onNavigate('coachguide')}
          />

          {/* Resources Hub */}
          <ToolCard
            icon="📚"
            title="Quick Reference"
            description="Philosophy, domains, rating scale."
            onClick={() => onNavigate('resources')}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-5 text-center border-t border-[var(--bg-secondary)]">
        <button
          onClick={() => setShowAbout(true)}
          className="text-[12px] text-[var(--accent)] underline mb-2"
        >
          About This Tool & Fairness
        </button>
        <p className="text-[12px] text-[var(--text-muted)] mb-2">
          Built for coaches who care about fairness and development.
        </p>
        <div className="flex items-center justify-center gap-1 text-[11px]">
          <span className="text-[var(--text-muted)]">Built & hosted for free by</span>
          <a 
            href="https://cpk.solutions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--accent)] font-medium hover:underline"
          >
            cpk.solutions
          </a>
        </div>
        <a 
          href="mailto:christopher@cpk.solutions"
          className="text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          christopher@cpk.solutions
        </a>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAbout(false)}
        >
          <div className="bg-[var(--bg-card)] rounded-[20px] w-full max-w-lg max-h-[90vh] flex flex-col shadow-xl">
            <div className="p-4 border-b border-[var(--bg-secondary)] flex items-center justify-between flex-shrink-0">
              <h3 className="text-[17px] font-semibold text-[var(--text-primary)]">{LEGAL_DISCLAIMER.title}</h3>
              <button onClick={() => setShowAbout(false)} className="text-[var(--accent)] text-[15px] font-medium">
                Done
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 space-y-4 flex-1">
              <div className="bg-[var(--accent-light)] rounded-[12px] p-4 text-center">
                <p className="text-[15px] font-semibold text-[var(--accent)] mb-1">{LEGAL_DISCLAIMER.subtitle}</p>
                <p className="text-[13px] text-[var(--text-secondary)]">{LEGAL_DISCLAIMER.coreStatement}</p>
              </div>

              {LEGAL_DISCLAIMER.sections.map((section, i) => (
                <div key={i} className="bg-[var(--bg-secondary)] rounded-[12px] p-4">
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)] mb-2">{section.title}</h4>
                  <ul className="space-y-1.5">
                    {section.points.map((point, j) => (
                      <li key={j} className="text-[13px] text-[var(--text-secondary)] flex gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-[var(--bg-secondary)] rounded-[12px] p-4">
                <p className="text-[13px] text-[var(--text-secondary)] italic">
                  "{LEGAL_DISCLAIMER.closingStatement}"
                </p>
              </div>

              <div className="text-center pt-2 pb-4">
                <p className="text-[12px] text-[var(--text-muted)] italic">
                  {LEGAL_DISCLAIMER.philosophyNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolCard({ icon, title, description, badge, isPrimary, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-[var(--radius)] p-4 flex items-center gap-4 transition-all active:scale-[0.98] ${
        isPrimary 
          ? 'bg-[var(--accent)] shadow-lg' 
          : 'bg-[var(--bg-card)] shadow-[var(--shadow-card)]'
      }`}
    >
      <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl ${
        isPrimary ? 'bg-white/20' : 'bg-[var(--bg-secondary)]'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-[17px] font-semibold ${isPrimary ? 'text-white' : 'text-[var(--text-primary)]'}`}>
            {title}
          </span>
          {badge && (
            <span className="text-[11px] bg-white/30 text-white px-2 py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
        <p className={`text-[13px] ${isPrimary ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
          {description}
        </p>
      </div>
      <svg className={`w-5 h-5 ${isPrimary ? 'text-white/60' : 'text-[var(--text-muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
