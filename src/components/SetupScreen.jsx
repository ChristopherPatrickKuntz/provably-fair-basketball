import { useState } from 'react';
import { GRADE_BANDS, PLAYER_COUNTS } from '../data/domains';
import { Header } from './Header';
import { PRINT_ATTENDANCE_SHEET } from '../data/coachingResources';

export function SetupScreen({ sessions, onStartSession, onContinueSession, onDeleteSession, onBack }) {
  const [gradeBand, setGradeBand] = useState('middle');
  const [playerCount, setPlayerCount] = useState(12);

  const sortedSessions = Object.values(sessions || {})
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const inProgressSessions = sortedSessions.filter(s => s.status === 'in_progress');
  const completedSessions = sortedSessions.filter(s => s.status === 'completed');

  const handleStart = () => {
    onStartSession(gradeBand, playerCount);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header 
        title="Tryout Evaluation" 
        leftAction={onBack}
        leftLabel="← Home"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-5 py-6">
          
          {/* Tryout Resources */}
          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 mb-4">
            <h3 className="text-[13px] font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
              Tryout Resources
            </h3>
            
            {/* Tryout Agenda */}
            <div className="flex items-center gap-3 pb-3 border-b border-[var(--bg-secondary)]">
              <div className="w-9 h-9 bg-[var(--accent-light)] rounded-[8px] flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-[var(--text-primary)]">Tryout Agenda</p>
                <p className="text-[11px] text-[var(--text-muted)]">Covers all skill areas. Print for tryouts.</p>
              </div>
              <a
                href="/tryout-agenda.pdf"
                download="Tryout-Agenda.pdf"
                className="px-2.5 py-1.5 bg-[var(--accent)] text-white rounded-[6px] text-[12px] font-medium"
              >
                PDF
              </a>
            </div>

            {/* Attendance Sheet */}
            <div className="flex items-center gap-3 pt-3">
              <div className="w-9 h-9 bg-[var(--bg-secondary)] rounded-[8px] flex items-center justify-center">
                <span className="text-lg">🔒</span>
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-[var(--text-primary)]">Attendance Sheet</p>
                <p className="text-[11px] text-[var(--text-muted)]">Links names to numbers. Keep secure.</p>
              </div>
              <button
                onClick={() => {
                  const printWindow = window.open('', '_blank');
                  if (!printWindow) {
                    alert('Your browser blocked the print window. Allow pop-ups for this site to print.');
                    return;
                  }
                  printWindow.document.write(`<pre style="font-family: monospace; font-size: 12px;">${PRINT_ATTENDANCE_SHEET}</pre>`);
                  printWindow.document.close();
                  printWindow.print();
                }}
                className="px-2.5 py-1.5 bg-[var(--text-secondary)] text-white rounded-[6px] text-[12px] font-medium"
              >
                Print
              </button>
            </div>
          </div>

          {/* Resume In-Progress Session Alert */}
          {inProgressSessions.length > 0 && (
            <div className="mb-6">
              {inProgressSessions.map(session => (
                <div 
                  key={session.id}
                  className="bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-[var(--radius)] p-4"
                >
                  <p className="text-[13px] text-[var(--accent)] font-medium mb-1">
                    Unfinished Session
                  </p>
                  <p className="text-[15px] text-[var(--text-primary)] font-medium mb-3">
                    {session.name}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onContinueSession(session.id)}
                      className="flex-1 py-2.5 bg-[var(--accent)] text-white rounded-[10px] text-[15px] font-semibold"
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => onDeleteSession(session.id)}
                      className="py-2.5 px-4 bg-white border border-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-[10px] text-[15px] font-medium"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Tryout Section */}
          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-5 space-y-5">
              <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
                New Tryout
              </h2>

              {/* Grade Band */}
              <div>
                <label className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                  Grade Band
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GRADE_BANDS.map(band => (
                    <button
                      key={band.id}
                      onClick={() => setGradeBand(band.id)}
                      aria-pressed={gradeBand === band.id}
                      className={`py-4 px-3 rounded-[12px] text-center transition-all ${
                        gradeBand === band.id
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="text-[15px] font-semibold">{band.label}</div>
                      <div className={`text-[13px] ${gradeBand === band.id ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        Grades {band.grades}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Player Count */}
              <div>
                <label className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                  Number of Players
                </label>
                <div className="flex flex-wrap gap-2">
                  {PLAYER_COUNTS.map(count => (
                    <button
                      key={count}
                      onClick={() => setPlayerCount(count)}
                      aria-pressed={playerCount === count}
                      aria-label={`${count} players`}
                      className={`min-w-[52px] py-3 px-4 rounded-[10px] text-[15px] font-semibold transition-all ${
                        playerCount === count
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="px-5 pb-5">
              <button
                onClick={handleStart}
                className="w-full py-4 bg-[var(--accent)] text-white rounded-[12px] text-[17px] font-semibold"
              >
                START
              </button>
            </div>
          </div>

          {/* Previous Sessions */}
          {completedSessions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-[13px] font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-wide px-1">
                Previous Sessions
              </h3>
              <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden divide-y divide-[var(--bg-secondary)]">
                {completedSessions.slice(0, 5).map(session => (
                  <SessionRow 
                    key={session.id} 
                    session={session} 
                    onTap={() => onContinueSession(session.id)}
                    onDelete={onDeleteSession}
                  />
                ))}
              </div>
            </div>
          )}

          {/* First Time Tip */}
          {sortedSessions.length === 0 && (
            <div className="mt-8 text-center">
              <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4">
                <p className="text-[15px] text-[var(--accent)] font-medium mb-1">
                  👋 First time here?
                </p>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  Set your grade band and player count, then tap START. You'll rate each player across 6 areas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionRow({ session, onTap, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);
  const date = new Date(session.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="relative">
      <div 
        onClick={onTap}
        onContextMenu={(e) => { e.preventDefault(); setShowDelete(!showDelete); }}
        className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-[var(--bg-secondary)]/50 active:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(); } }}
      >
        <div className="flex-1">
          <p className="text-[15px] text-[var(--text-primary)] font-medium">
            {session.name}
          </p>
          <p className="text-[13px] text-[var(--text-muted)]">
            {date} • {session.playerCount} players
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setShowDelete(!showDelete); }}
            aria-label="Session options"
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--rating-needs-work)] rounded-full hover:bg-[var(--bg-secondary)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Delete Confirmation */}
      {showDelete && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-[10px] border border-[var(--bg-secondary)] overflow-hidden z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(session.id); setShowDelete(false); }}
            className="px-4 py-2.5 text-[14px] text-[var(--rating-needs-work)] font-medium hover:bg-[var(--bg-secondary)] flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
