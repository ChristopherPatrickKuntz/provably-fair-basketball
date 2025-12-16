import { useState } from 'react';
import { Header } from './Header';
import { SEASON_PHASES, LEAGUE_RULES } from '../data/seasonPlan';
import { DRILLS } from '../data/drills';

// Helper to shift dates by weeks
function shiftDate(dateStr, weeksOffset) {
  if (!dateStr || weeksOffset === 0) return dateStr;
  
  // Parse date strings like "Dec 1-6" or "Jan 13-19"
  const months = { 'Dec': 11, 'Jan': 0, 'Feb': 1, 'Mar': 2 };
  const match = dateStr.match(/([A-Za-z]+)\s*(\d+)(?:-(\d+))?/);
  if (!match) return dateStr;
  
  const [, month, startDay, endDay] = match;
  const monthNum = months[month];
  if (monthNum === undefined) return dateStr;
  
  const year = monthNum >= 10 ? 2024 : 2025; // Dec is 2024, others 2025
  const start = new Date(year, monthNum, parseInt(startDay));
  start.setDate(start.getDate() + (weeksOffset * 7));
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const newMonth = monthNames[start.getMonth()];
  const newStart = start.getDate();
  
  if (endDay) {
    const end = new Date(year, monthNum, parseInt(endDay));
    end.setDate(end.getDate() + (weeksOffset * 7));
    const endMonth = monthNames[end.getMonth()];
    if (endMonth !== newMonth) {
      return `${newMonth} ${newStart}-${endMonth} ${end.getDate()}`;
    }
    return `${newMonth} ${newStart}-${end.getDate()}`;
  }
  return `${newMonth} ${newStart}`;
}

export function SeasonSpineScreen({ onBack }) {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [showDateAdjust, setShowDateAdjust] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0); // -4 to +4 weeks

  // If a week is selected, show the practice plan view
  if (selectedWeek) {
    return (
      <PracticePlanView 
        week={selectedWeek}
        weekOffset={weekOffset}
        onBack={() => setSelectedWeek(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header 
        title="Season Plan" 
        leftAction={onBack}
        leftLabel="← Home"
        rightAction={() => setShowRules(true)}
        rightLabel="Rules"
      />

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-lg mx-auto">
          {/* Date Adjustment */}
          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 mb-4">
            <button 
              onClick={() => setShowDateAdjust(!showDateAdjust)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-[15px]">📅</span>
                <span className="text-[14px] font-medium text-[var(--text-primary)]">
                  {weekOffset === 0 ? 'Adjust Season Dates' : `Season shifted ${weekOffset > 0 ? '+' : ''}${weekOffset} week${Math.abs(weekOffset) !== 1 ? 's' : ''}`}
                </span>
              </div>
              <svg 
                className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${showDateAdjust ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDateAdjust && (
              <div className="mt-4 pt-4 border-t border-[var(--bg-secondary)]">
                <p className="text-[12px] text-[var(--text-muted)] mb-3">
                  Slide to adjust all dates if your season starts earlier or later.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[var(--text-muted)]">-4w</span>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    value={weekOffset}
                    onChange={(e) => setWeekOffset(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)]">+4w</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[13px] font-medium text-[var(--accent)]">
                    {weekOffset === 0 ? 'Default timing' : `${weekOffset > 0 ? '+' : ''}${weekOffset} week${Math.abs(weekOffset) !== 1 ? 's' : ''}`}
                  </span>
                </div>
                {weekOffset !== 0 && (
                  <button
                    onClick={() => setWeekOffset(0)}
                    className="w-full mt-2 text-[12px] text-[var(--text-muted)] underline"
                  >
                    Reset to default
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Intro */}
          <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-6">
            <p className="text-[15px] text-[var(--accent)] font-medium">
              Tap any week to see the full practice plan.
            </p>
          </div>

          {/* Phases */}
          {SEASON_PHASES.map((phase) => (
            <div key={phase.id} className="mb-6">
              {phase.isBreak ? (
                <div className="bg-[var(--bg-secondary)] rounded-[var(--radius)] p-4 text-center">
                  <p className="text-[13px] text-[var(--text-muted)] uppercase tracking-wide">
                    {phase.name}
                  </p>
                  <p className="text-[15px] text-[var(--text-secondary)]">{phase.period}</p>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
                      {phase.name}
                    </h2>
                    <p className="text-[13px] text-[var(--text-muted)]">{phase.period}</p>
                    {phase.ruleChange && (
                      <p className="text-[12px] text-[var(--rating-ok)] mt-1">⚠️ {phase.ruleChange}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {phase.weeks?.map((week) => (
                      <WeekCard
                        key={week.id}
                        week={week}
                        weekOffset={weekOffset}
                        onTap={() => setSelectedWeek(week)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Championship */}
          <div className="bg-[var(--accent)] rounded-[var(--radius)] p-4 text-center">
            <p className="text-[13px] text-white/80 uppercase tracking-wide mb-1">Championship</p>
            <p className="text-[17px] text-white font-semibold">Second Monday in March</p>
          </div>
        </div>
      </div>

      {/* League Rules Modal */}
      {showRules && (
        <LeagueRulesModal onClose={() => setShowRules(false)} />
      )}
    </div>
  );
}

function WeekCard({ week, weekOffset = 0, onTap }) {
  const hasPracticePlans = week.practicePlans && week.practicePlans.length > 0;
  const displayDates = shiftDate(week.dates, weekOffset);
  
  return (
    <button
      onClick={onTap}
      className="w-full bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 text-left flex items-center justify-between active:scale-[0.98] transition-transform"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-medium text-[var(--text-primary)]">{week.name}</p>
          {hasPracticePlans && (
            <span className="text-[10px] bg-[var(--accent)] text-white px-1.5 py-0.5 rounded-full">
              {week.practicePlans.length} plan{week.practicePlans.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p className="text-[13px] text-[var(--text-muted)]">{displayDates}</p>
        <p className="text-[13px] text-[var(--accent)] italic mt-1">"{week.language}"</p>
      </div>
      <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function PracticePlanView({ week, weekOffset = 0, onBack }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const practicePlan = week.practicePlans?.[selectedDay];
  const displayDates = shiftDate(week.dates, weekOffset);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header 
        title={week.name}
        subtitle={displayDates}
        leftAction={onBack}
        leftLabel="← Back"
      />

      {/* Week Overview */}
      <div className="bg-[var(--accent-light)] px-4 py-3">
        <div className="max-w-lg mx-auto">
          <p className="text-[15px] text-[var(--accent)] font-medium italic text-center">
            "{week.language}"
          </p>
        </div>
      </div>

      {/* Day Tabs */}
      {week.practicePlans && week.practicePlans.length > 0 && (
        <div className="bg-[var(--bg-card)] px-4 py-3 shadow-[var(--shadow-card)]">
          <div className="max-w-lg mx-auto flex gap-2">
            {week.practicePlans.map((plan, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`flex-1 py-2.5 rounded-[10px] text-[15px] font-medium transition-all ${
                  selectedDay === i 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                }`}
              >
                Day {plan.day}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-lg mx-auto">
          {/* Skills This Week */}
          <div className="mb-4">
            <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-2 px-1">Skills This Week</p>
            <div className="flex flex-wrap gap-1.5">
              {week.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="text-[12px] bg-[var(--bg-card)] shadow-[var(--shadow-card)] text-[var(--text-secondary)] px-2.5 py-1.5 rounded-[8px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Practice Plan Timeline */}
          {practicePlan ? (
            <div className="space-y-2">
              <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-2 px-1">
                Practice Plan — Day {practicePlan.day} (90 min)
              </p>
              {practicePlan.blocks.map((block, i) => (
                <PracticeBlock key={i} block={block} index={i} />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-6 text-center">
              <p className="text-[40px] mb-3">📋</p>
              <p className="text-[15px] text-[var(--text-primary)] font-medium mb-1">No Practice Plan Yet</p>
              <p className="text-[13px] text-[var(--text-muted)]">
                This week's practice plan is being developed. Use the skills list above as a guide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PracticeBlock({ block, index }) {
  const [showDrill, setShowDrill] = useState(false);
  const drill = block.drillId ? DRILLS.find(d => d.id === block.drillId) : null;

  const typeColors = {
    'Warm-Up': 'bg-[#FFE5B4] text-[#8B4513]',
    'Huddle': 'bg-[#E8E8E8] text-[#333]',
    'Skill': 'bg-[#D4EDDA] text-[#155724]',
    'Game': 'bg-[#CCE5FF] text-[#004085]',
    'Scrimmage': 'bg-[#F8D7DA] text-[#721C24]'
  };

  const colorClass = typeColors[block.type] || 'bg-[var(--bg-secondary)] text-[var(--text-primary)]';

  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
      <button 
        onClick={() => drill && setShowDrill(!showDrill)}
        className="w-full flex text-left"
      >
        {/* Time Column */}
        <div className="w-16 bg-[var(--bg-secondary)] flex items-center justify-center py-3">
          <span className="text-[13px] font-mono text-[var(--accent)] font-medium">{block.time}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${colorClass}`}>
              {block.type}
            </span>
            {drill && (
              <span className="text-[10px] text-[var(--accent)] font-medium">
                📖 Tap for details
              </span>
            )}
          </div>
          <p className="text-[15px] font-medium text-[var(--text-primary)]">{block.activity}</p>
          {block.details && (
            <p className="text-[13px] text-[var(--text-muted)] mt-1">{block.details}</p>
          )}
        </div>
      </button>

      {/* Expanded Drill Details */}
      {showDrill && drill && (
        <div className="px-4 pb-4 border-t border-[var(--bg-secondary)] bg-[var(--accent-light)]">
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[14px] font-semibold text-[var(--accent)]">{drill.name}</h4>
              <span className="text-[11px] text-[var(--text-muted)]">{drill.time} • {drill.players}</span>
            </div>
            
            {drill.setup && (
              <div>
                <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">Setup</p>
                <p className="text-[13px] text-[var(--text-secondary)]">{drill.setup}</p>
              </div>
            )}

            {drill.steps && (
              <div>
                <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">Steps</p>
                <ol className="space-y-1">
                  {drill.steps.map((step, i) => (
                    <li key={i} className="text-[12px] text-[var(--text-secondary)] flex gap-2">
                      <span className="text-[var(--accent)] font-medium">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {drill.coachingPoints && (
              <div>
                <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">Coaching Points</p>
                <ul className="space-y-1">
                  {drill.coachingPoints.map((point, i) => (
                    <li key={i} className="text-[12px] text-[var(--text-secondary)] flex gap-2">
                      <span className="text-[var(--rating-good)]">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {drill.progression && (
              <div className="bg-white/50 rounded-[8px] p-2">
                <p className="text-[11px] text-[var(--accent)] font-medium">
                  💡 Progression: {drill.progression}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LeagueRulesModal({ onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[var(--bg-card)] rounded-[20px] w-full max-w-lg max-h-[85vh] flex flex-col shadow-xl">
        <div className="p-4 border-b border-[var(--bg-secondary)] flex items-center justify-between flex-shrink-0">
          <h3 className="text-[17px] font-semibold text-[var(--text-primary)]">League Rules</h3>
          <button onClick={onClose} className="text-[var(--accent)] text-[15px] font-medium">
            Done
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {/* First Half */}
          <div className="bg-[var(--bg-secondary)] rounded-[12px] p-4">
            <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-3">
              {LEAGUE_RULES.firstHalf.title}
            </h4>
            <div className="space-y-2">
              {LEAGUE_RULES.firstHalf.required?.map((rule, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[var(--rating-good)]">✓</span>
                  <span className="text-[13px] text-[var(--text-primary)]">{rule} (required)</span>
                </div>
              ))}
              {LEAGUE_RULES.firstHalf.allowed?.map((rule, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[var(--rating-good)]">✓</span>
                  <span className="text-[13px] text-[var(--text-primary)]">{rule}</span>
                </div>
              ))}
              {LEAGUE_RULES.firstHalf.notAllowed?.map((rule, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[var(--rating-needs-work)]">✗</span>
                  <span className="text-[13px] text-[var(--text-secondary)]">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Half */}
          <div className="bg-[var(--bg-secondary)] rounded-[12px] p-4">
            <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-3">
              {LEAGUE_RULES.secondHalf.title}
            </h4>
            <div className="space-y-2">
              {LEAGUE_RULES.secondHalf.allowed?.map((rule, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[var(--rating-good)]">✓</span>
                  <span className="text-[13px] text-[var(--text-primary)]">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fair Play */}
          <div className="bg-[var(--bg-secondary)] rounded-[12px] p-4">
            <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-3">
              {LEAGUE_RULES.fairPlay.title}
            </h4>
            <ul className="space-y-1.5">
              {LEAGUE_RULES.fairPlay.rules.map((rule, i) => (
                <li key={i} className="text-[13px] text-[var(--text-primary)]">• {rule}</li>
              ))}
            </ul>
          </div>

          {/* Mercy Rules */}
          <div className="bg-[var(--bg-secondary)] rounded-[12px] p-4">
            <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-3">
              {LEAGUE_RULES.mercy.title}
            </h4>
            <ul className="space-y-1.5">
              {LEAGUE_RULES.mercy.rules.map((rule, i) => (
                <li key={i} className="text-[13px] text-[var(--text-primary)]">• {rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
