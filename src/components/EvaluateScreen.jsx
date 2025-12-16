import { useState, useEffect, useCallback } from 'react';
import { DOMAINS } from '../data/domains';
import { calculateScore, getDomainsRated } from '../utils/scoring';
import { RatingSegmentedControl } from './SegmentedControl';
import { Header } from './Header';

export function EvaluateScreen({ session, onUpdateRating, onUpdateNote, onComplete, onBack, saveStatus }) {
  const [selectedPlayer, setSelectedPlayer] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [expandedDomain, setExpandedDomain] = useState(null);

  const playerRatings = session.ratings[selectedPlayer] || {};
  const playerScore = calculateScore(playerRatings);
  const domainsRated = getDomainsRated(playerRatings);

  // Get age-appropriate interpretation based on grade band
  const getAgeContext = (domain) => {
    return session.gradeBand === 'high' ? domain.highSchool : domain.middleSchool;
  };

  useEffect(() => {
    setNoteText(playerRatings.note || '');
    setShowNotes(!!playerRatings.note);
  }, [selectedPlayer, playerRatings.note]);

  const hasData = (playerId) => {
    const ratings = session.ratings[playerId];
    if (!ratings) return false;
    return Object.entries(ratings).some(([k, v]) => k !== 'note' && v !== null);
  };

  const getRatedCount = () => {
    return Object.keys(session.ratings).filter(id => hasData(parseInt(id))).length;
  };

  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') setSelectedPlayer(p => Math.max(1, p - 1));
    if (e.key === 'ArrowRight') setSelectedPlayer(p => Math.min(session.playerCount, p + 1));
  }, [session.playerCount]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNoteBlur = () => {
    if (noteText !== (playerRatings.note || '')) {
      onUpdateNote(selectedPlayer, noteText);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header
        title={session.name}
        subtitle={saveStatus === 'saved' ? 'Saved ✓' : saveStatus === 'saving' ? 'Saving...' : ''}
        leftAction={onBack}
        leftLabel="← Back"
        rightAction={onComplete}
        rightLabel="DONE"
        rightVariant="primary"
      />

      {/* Player Number Grid */}
      <div className="bg-[var(--bg-card)] px-4 py-4 shadow-[var(--shadow-card)]">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: session.playerCount }, (_, i) => i + 1).map(num => {
              const isSelected = selectedPlayer === num;
              const playerHasData = hasData(num);
              return (
                <button
                  key={num}
                  onClick={() => setSelectedPlayer(num)}
                  className={`relative w-11 h-11 rounded-[10px] text-[15px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-[var(--accent)] text-white shadow-md scale-110'
                      : playerHasData
                      ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] ring-2 ring-[var(--rating-ok)]/50'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                  }`}
                >
                  {num}
                  {playerHasData && !isSelected && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--rating-ok)] rounded-full border-2 border-[var(--bg-card)]" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="text-center mt-3 text-[13px] text-[var(--text-muted)]">
            {getRatedCount()} of {session.playerCount} players rated
          </div>
        </div>
      </div>

      {/* Selected Player Banner */}
      <div className="bg-[var(--accent-light)] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <span className="text-[20px] font-bold text-[var(--text-primary)]">Player #{selectedPlayer}</span>
            <span className="text-[13px] text-[var(--text-muted)] ml-2">({domainsRated}/6 rated)</span>
          </div>
          {playerScore !== null && (
            <div className="text-[24px] font-bold text-[var(--accent)]">
              {playerScore}%
            </div>
          )}
        </div>
      </div>

      {/* Domain Rating Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-lg mx-auto space-y-3">
          {DOMAINS.map(domain => {
            const isExpanded = expandedDomain === domain.id;
            const currentRating = playerRatings[domain.id];
            
            return (
              <div 
                key={domain.id}
                className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden"
              >
                <div className="p-4">
                  {/* Domain Header */}
                  <button
                    onClick={() => setExpandedDomain(isExpanded ? null : domain.id)}
                    className="w-full flex items-start justify-between mb-3"
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold text-[var(--text-primary)] uppercase tracking-wide">
                          {domain.name}
                        </span>
                        {currentRating && (
                          <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${
                            currentRating === 3 ? 'bg-[var(--rating-good)]/20 text-[var(--rating-good)]' :
                            currentRating === 2 ? 'bg-[var(--rating-ok)]/20 text-[var(--rating-ok)]' :
                            'bg-[var(--rating-needs-work)]/20 text-[var(--rating-needs-work)]'
                          }`}>
                            {currentRating === 3 ? 'Good' : currentRating === 2 ? 'OK' : 'Needs Work'}
                          </span>
                        )}
                      </div>
                      <div className="text-[13px] text-[var(--text-muted)]">
                        {domain.helper}
                      </div>
                    </div>
                    <svg 
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform mt-1 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Rating Control */}
                  <RatingSegmentedControl
                    value={playerRatings[domain.id]}
                    onChange={(value) => onUpdateRating(selectedPlayer, domain.id, value)}
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-[var(--bg-secondary)] bg-[var(--bg-secondary)]/30">
                    {/* Philosophy */}
                    <p className="text-[13px] text-[var(--accent)] font-medium italic mb-3">
                      "{domain.philosophy}"
                    </p>

                    {/* Age Context */}
                    <div className="mb-3">
                      <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">
                        {session.gradeBand === 'high' ? 'High School' : 'Middle School'} Focus
                      </p>
                      <p className="text-[13px] text-[var(--text-primary)]">
                        {getAgeContext(domain)}
                      </p>
                    </div>

                    {/* Look For */}
                    <div className="mb-3">
                      <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">Look For</p>
                      <div className="space-y-1">
                        {domain.lookFor?.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-[var(--rating-good)] text-[11px]">✓</span>
                            <span className="text-[12px] text-[var(--text-secondary)]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Red Flags */}
                    <div>
                      <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">Red Flags</p>
                      <div className="space-y-1">
                        {domain.redFlags?.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-[var(--rating-needs-work)] text-[11px]">✗</span>
                            <span className="text-[12px] text-[var(--text-secondary)]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Skip Warning */}
          {domainsRated < 4 && (
            <div className="bg-[var(--rating-ok)]/10 border border-[var(--rating-ok)]/30 rounded-[var(--radius)] p-3">
              <p className="text-[13px] text-[var(--rating-ok)]">
                <strong>Tip:</strong> If you can't observe a domain, use "Skip" — don't guess.
              </p>
            </div>
          )}

          {/* Add Note */}
          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] p-4 shadow-[var(--shadow-card)]">
            {!showNotes ? (
              <button
                onClick={() => setShowNotes(true)}
                className="text-[15px] text-[var(--accent)] font-medium"
              >
                + Add Note
              </button>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[15px] font-semibold text-[var(--text-primary)]">Note</span>
                  <button
                    onClick={() => { setShowNotes(false); handleNoteBlur(); }}
                    className="text-[13px] text-[var(--accent)]"
                  >
                    Done
                  </button>
                </div>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onBlur={handleNoteBlur}
                  placeholder="Optional observations, context, or reminders..."
                  className="w-full bg-[var(--bg-secondary)] rounded-[10px] p-3 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none border-none outline-none"
                  rows={2}
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
