import { useState } from 'react';
import { DOMAINS } from '../data/domains';
import { sortByScore } from '../utils/scoring';
import { generateExportText, copyToClipboard, printResults } from '../utils/export';
import { Header } from './Header';

export function ResultsScreen({ session, onEdit, onNewSession }) {
  const [copyStatus, setCopyStatus] = useState('idle');
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  
  const sorted = sortByScore(session.ratings);
  const playersWithScores = sorted.filter(p => p.score !== null);
  const avgScore = playersWithScores.length > 0 
    ? Math.round(playersWithScores.reduce((sum, p) => sum + p.score, 0) / playersWithScores.length)
    : null;

  const handleCopy = async () => {
    setCopyStatus('copying');
    const text = generateExportText(session, session.ratings);
    const success = await copyToClipboard(text);
    setCopyStatus(success ? 'copied' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const getRatingLabel = (value) => {
    if (value === null || value === undefined) return { text: '—', color: 'var(--text-muted)', bg: 'var(--bg-secondary)' };
    if (value === 1) return { text: 'Needs Work', color: 'var(--rating-needs-work)', bg: 'rgba(255,59,48,0.1)' };
    if (value === 2) return { text: 'OK', color: 'var(--rating-ok)', bg: 'rgba(255,149,0,0.1)' };
    if (value === 3) return { text: 'Good', color: 'var(--rating-good)', bg: 'rgba(52,199,89,0.1)' };
    return { text: '—', color: 'var(--text-muted)', bg: 'var(--bg-secondary)' };
  };

  const getScoreTier = (score) => {
    if (score === null) return { label: 'Not Rated', color: 'var(--text-muted)' };
    if (score >= 85) return { label: 'Excellent', color: 'var(--rating-good)' };
    if (score >= 70) return { label: 'Solid', color: 'var(--accent)' };
    if (score >= 50) return { label: 'Developing', color: 'var(--rating-ok)' };
    return { label: 'Needs Support', color: 'var(--rating-needs-work)' };
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header
        title="Results"
        subtitle={session.name}
        leftAction={onEdit}
        leftLabel="← Edit"
      />

      {/* Summary Stats */}
      <div className="bg-[var(--bg-card)] px-4 py-4 shadow-[var(--shadow-card)]">
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center mb-3">
            <div>
              <div className="text-[24px] font-bold text-[var(--text-primary)]">{sorted.length}</div>
              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide">Players</div>
            </div>
            <div>
              <div className="text-[24px] font-bold text-[var(--accent)]">{avgScore ?? '—'}%</div>
              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide">Avg Score</div>
            </div>
            <div>
              <div className="text-[24px] font-bold text-[var(--rating-good)]">{playersWithScores.length}</div>
              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide">Rated</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={copyStatus === 'copying'}
              className={`flex-1 py-2.5 rounded-[10px] text-[14px] font-medium transition-all ${
                copyStatus === 'copied' 
                  ? 'bg-[var(--rating-good)] text-white' 
                  : 'bg-[var(--bg-secondary)] text-[var(--accent)]'
              }`}
            >
              {copyStatus === 'copied' ? '✓ Copied' : 'Copy Text'}
            </button>
            <button
              onClick={() => printResults(session, session.ratings)}
              className="flex-1 py-2.5 rounded-[10px] text-[14px] font-medium bg-[var(--accent)] text-white"
            >
              🖨️ Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Player Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28">
        <div className="max-w-lg mx-auto space-y-2">
          {sorted.map(({ player, domains, score, domainsRated }, index) => {
            const tier = getScoreTier(score);
            const isExpanded = expandedPlayer === player;
            
            return (
              <div 
                key={player}
                className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setExpandedPlayer(isExpanded ? null : player)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold ${
                      index === 0 ? 'bg-[#FFD700] text-black' :
                      index === 1 ? 'bg-[#C0C0C0] text-black' :
                      index === 2 ? 'bg-[#CD7F32] text-white' :
                      'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                    }`}>
                      {player}
                    </div>
                    <div className="text-left">
                      <div className="text-[15px] font-medium text-[var(--text-primary)]">
                        Player {player}
                      </div>
                      <div className="text-[12px]" style={{ color: tier.color }}>
                        {tier.label} • {domainsRated}/6 domains
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {score !== null ? (
                      <div className="text-right">
                        <div className="text-[22px] font-bold" style={{ color: tier.color }}>
                          {score}%
                        </div>
                      </div>
                    ) : (
                      <div className="text-[15px] text-[var(--text-muted)]">
                        N/A
                      </div>
                    )}
                    <svg 
                      className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--bg-secondary)] animate-fade-in">
                    <div className="pt-3">
                      {/* Domain Ratings */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {DOMAINS.map(domain => {
                          const rating = getRatingLabel(domains[domain.id]);
                          return (
                            <div 
                              key={domain.id} 
                              className="rounded-[8px] p-2.5"
                              style={{ backgroundColor: rating.bg }}
                            >
                              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                                {domain.name}
                              </div>
                              <div 
                                className="text-[13px] font-semibold"
                                style={{ color: rating.color }}
                              >
                                {rating.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Note */}
                      {domains.note && (
                        <div className="bg-[var(--bg-secondary)] rounded-[8px] p-3">
                          <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">Note</p>
                          <p className="text-[13px] text-[var(--text-primary)] italic">
                            "{domains.note}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Note */}
      <div className="px-4 py-2 bg-[var(--bg-secondary)]">
        <p className="text-center text-[12px] text-[var(--text-muted)]">
          🔒 Numbers only. Cross-reference with paper attendance sheet.
        </p>
      </div>

      {/* Bottom Actions */}
      <footer className="bg-[var(--bg-card)] shadow-[var(--shadow-elevated)] px-4 py-4 sticky bottom-0 safe-area-bottom">
        <div className="max-w-lg mx-auto">
          <button
            onClick={onNewSession}
            className="w-full py-3.5 rounded-[12px] text-[17px] font-semibold bg-[var(--accent)] text-white active:scale-[0.98] transition-transform"
          >
            Start New Tryout
          </button>
        </div>
      </footer>
    </div>
  );
}
