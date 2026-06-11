import { useEffect, useRef, useState } from 'react';
import { LEGAL_DISCLAIMER } from '../data/coachingResources';

export function HomeScreen({ onStartTryout, onOpenHandbook, onResume, onStartHere, resumeSession }) {
  const [showAbout, setShowAbout] = useState(false);
  const aboutBtnRef = useRef(null);
  const aboutCloseRef = useRef(null);

  const closeAbout = () => {
    setShowAbout(false);
    aboutBtnRef.current?.focus();
  };

  // Move focus into the dialog on open, restore it on close, and close on Escape.
  useEffect(() => {
    if (!showAbout) return;
    aboutCloseRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') closeAbout(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showAbout]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      {/* Hero Section */}
      <div className="px-6 pt-12 pb-7 text-center">
        <img
          src="/logo-192.png"
          alt="Provably Fair Basketball"
          className="w-20 h-20 mx-auto mb-5 rounded-2xl shadow-lg"
        />
        <h1 className="text-[28px] font-bold text-[var(--text-primary)] leading-tight">
          Provably Fair
        </h1>
        <h2 className="text-[17px] font-medium text-[var(--text-secondary)] mb-3">
          Basketball
        </h2>
        <p className="text-[15px] text-[var(--text-secondary)] max-w-xs mx-auto">
          Fair, bias-free tryout evaluation for youth basketball coaches.
        </p>
      </div>

      {/* Main Actions */}
      <div className="flex-1 px-5">
        <div className="max-w-md mx-auto space-y-3">

          {/* Resume (only if an in-progress tryout exists) */}
          {resumeSession && (
            <button
              onClick={onResume}
              className="w-full text-left rounded-[var(--radius)] p-4 flex items-center gap-3 bg-[var(--accent-light)] border border-[var(--accent)]/25 transition-all active:scale-[0.98]"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[var(--accent)]">Resume tryout</p>
                <p className="text-[15px] text-[var(--text-primary)] font-medium truncate">
                  {resumeSession.name}
                </p>
              </div>
              <span className="text-[var(--accent)] text-[13px] font-medium flex-shrink-0">Continue →</span>
            </button>
          )}

          {/* New-coach on-ramp */}
          <button
            onClick={onStartHere}
            className="w-full text-left rounded-[var(--radius)] p-4 flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--accent)]/30 shadow-[var(--shadow-card)] transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-[12px] bg-[var(--accent-light)] flex items-center justify-center text-2xl flex-shrink-0" aria-hidden="true">👋</div>
            <div className="flex-1">
              <span className="text-[17px] font-semibold text-[var(--text-primary)]">New to coaching? Start here</span>
              <p className="text-[13px] text-[var(--text-muted)] mt-0.5">A 5-step walkthrough, no experience needed.</p>
            </div>
            <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Primary: Tryout Tool */}
          <button
            onClick={onStartTryout}
            className="w-full text-left rounded-[var(--radius)] p-5 flex items-center gap-4 bg-[var(--accent)] shadow-lg transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-[12px] bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
              📋
            </div>
            <div className="flex-1">
              <span className="text-[19px] font-semibold text-white">Tryout Evaluation</span>
              <p className="text-[13px] text-white/85 mt-0.5">
                Rate players by number across 6 areas. Auto-scored and ranked.
              </p>
            </div>
            <svg className="w-5 h-5 text-white/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Secondary: Coaching Handbook */}
          <button
            onClick={onOpenHandbook}
            className="w-full text-left rounded-[var(--radius)] p-4 flex items-center gap-4 bg-[var(--bg-card)] shadow-[var(--shadow-card)] transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-[12px] bg-[var(--bg-secondary)] flex items-center justify-center text-2xl flex-shrink-0">
              📚
            </div>
            <div className="flex-1">
              <span className="text-[17px] font-semibold text-[var(--text-primary)]">Coaching Handbook</span>
              <p className="text-[13px] text-[var(--text-muted)] mt-0.5">
                Season plan, practice drills, and the complete coach's guide.
              </p>
            </div>
            <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 mt-6 text-center border-t border-[var(--bg-secondary)]">
        <button
          ref={aboutBtnRef}
          onClick={() => setShowAbout(true)}
          aria-haspopup="dialog"
          aria-expanded={showAbout}
          className="text-[13px] text-[var(--accent)] font-medium mb-2"
        >
          About this tool &amp; fairness
        </button>
        <div className="flex items-center justify-center gap-1 text-[12px] mt-1">
          <span className="text-[var(--text-muted)]">Built in Moose Jaw, hosted free by</span>
          <a
            href="https://cpk.solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] font-medium hover:underline"
          >
            cpk.solutions
          </a>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeAbout()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            className="bg-[var(--bg-card)] rounded-[20px] w-full max-w-lg max-h-[90vh] flex flex-col shadow-xl"
          >
            <div className="p-4 border-b border-[var(--bg-secondary)] flex items-center justify-between flex-shrink-0">
              <h3 id="about-title" className="text-[17px] font-semibold text-[var(--text-primary)]">{LEGAL_DISCLAIMER.title}</h3>
              <button ref={aboutCloseRef} onClick={closeAbout} className="text-[var(--accent)] text-[15px] font-medium">
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
