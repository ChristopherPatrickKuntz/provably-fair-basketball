import { useState } from 'react';
import { Header } from './Header';
import { SEASON_PHASES, LEAGUE_RULES } from '../data/seasonPlan';
import { DRILLS } from '../data/drills';
import { parseStart, formatWeekRange, formatSpan } from '../utils/seasonDates';

// The curriculum: tryouts (pre-season) and the final taper are fixed bookends; the
// numbered weeks between them are what the coach's "weeks" setting draws from.
const ALL_WEEKS = SEASON_PHASES.filter((p) => !p.isBreak).flatMap((p) => p.weeks || []);
const TRYOUTS_WEEK = ALL_WEEKS.find((w) => w.id === 'tryouts') || null;
const FINAL_WEEK = ALL_WEEKS.find((w) => /^Final/i.test(w.name)) || null;
const CORE_WEEKS = ALL_WEEKS.filter((w) => w !== TRYOUTS_WEEK && w !== FINAL_WEEK);
const MIN_WEEKS = 4;
const MAX_WEEKS = 18;

function genericWeek(n) {
  return {
    id: `extra-${n}`,
    name: `Week ${n}: Open Practice`,
    language: 'Reinforce and refine',
    skills: ['Review your weak spots', 'Scrimmage with a purpose', 'Try a Quick Session'],
    practicePlans: [],
  };
}

// Build a flat, dated schedule from the coach's settings: tryouts, the chosen number of
// practice weeks, an optional break, and the final taper. Each item carries a calendar
// index so its date computes from the start date.
function buildSeasonSchedule({ weeks, breakAfter, breakWeeks }) {
  const items = [];
  let idx = 0;
  if (TRYOUTS_WEEK) {
    items.push({ key: 'tryouts', kind: 'week', week: TRYOUTS_WEEK, index: idx });
    idx += 1;
  }
  for (let n = 1; n <= weeks; n += 1) {
    items.push({ key: `w${n}`, kind: 'week', week: CORE_WEEKS[n - 1] || genericWeek(n), index: idx });
    idx += 1;
    if (breakWeeks > 0 && n === breakAfter && n < weeks) {
      items.push({ key: 'break', kind: 'break', index: idx, weeks: breakWeeks });
      idx += breakWeeks;
    }
  }
  let endIndex = idx - 1;
  if (FINAL_WEEK) {
    items.push({ key: 'final', kind: 'week', week: FINAL_WEEK, index: idx });
    endIndex = idx;
  }
  return { items, endIndex };
}

export function SeasonSpineScreen({ onBack, season, onUpdateSeason }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showRules, setShowRules] = useState(false);

  const start = parseStart(season.startDate);
  const { items, endIndex } = buildSeasonSchedule({
    weeks: season.weeks,
    breakAfter: season.breakAfter,
    breakWeeks: season.breakWeeks,
  });

  // If a week is selected, show its practice plan
  if (selectedItem) {
    return (
      <PracticePlanView
        week={selectedItem.week}
        displayDates={start ? formatWeekRange(start, selectedItem.index) : null}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header
        title="Season Plan"
        leftAction={onBack}
        leftLabel="← Handbook"
        rightAction={() => setShowRules(true)}
        rightLabel="Rules"
      />

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-lg mx-auto">
          <SeasonSetupCard
            season={season}
            onUpdate={onUpdateSeason}
            endDate={start ? formatWeekRange(start, endIndex) : null}
          />

          <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-5">
            <p className="text-[15px] text-[var(--accent)] font-medium">
              Tap any week to see the full practice plan.
            </p>
          </div>

          <div className="space-y-2">
            {items.map((item) =>
              item.kind === 'break' ? (
                <div key={item.key} className="bg-[var(--bg-secondary)] rounded-[var(--radius)] p-4 text-center my-1">
                  <p className="text-[13px] text-[var(--text-muted)] uppercase tracking-wide">Mid-Season Break</p>
                  <p className="text-[13px] text-[var(--text-secondary)]">
                    {start ? formatSpan(start, item.index, item.weeks) : `${item.weeks} week${item.weeks === 1 ? '' : 's'} off`}
                  </p>
                </div>
              ) : (
                <WeekCard
                  key={item.key}
                  week={item.week}
                  displayDates={start ? formatWeekRange(start, item.index) : null}
                  onTap={() => setSelectedItem(item)}
                />
              )
            )}
          </div>

          {/* Season end */}
          <div className="bg-[var(--accent)] rounded-[var(--radius)] p-4 text-center mt-4">
            <p className="text-[13px] text-white/80 uppercase tracking-wide mb-1">Season ends</p>
            <p className="text-[17px] text-white font-semibold">
              {start ? formatWeekRange(start, endIndex) : 'Set your start date above'}
            </p>
            <p className="text-[12px] text-white/75 mt-1">Playoffs or final games usually follow.</p>
          </div>
        </div>
      </div>

      {showRules && <LeagueRulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}

function SeasonSetupCard({ season, onUpdate, endDate }) {
  const noBreak = season.breakWeeks === 0;
  const maxBreakAfter = Math.max(1, season.weeks - 1);

  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 mb-4 space-y-4">
      {/* Start date */}
      <div>
        <label htmlFor="season-start" className="flex items-center gap-2 mb-1">
          <span className="text-[15px]" aria-hidden="true">📅</span>
          <span className="text-[14px] font-semibold text-[var(--text-primary)]">When does your season start?</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="season-start"
            type="date"
            value={season.startDate || ''}
            onChange={(e) => onUpdate({ seasonStartDate: e.target.value || null })}
            className="flex-1 bg-[var(--bg-secondary)] rounded-[10px] px-3 py-2.5 text-[15px] text-[var(--text-primary)] border-none outline-none"
          />
          {season.startDate && (
            <button
              onClick={() => onUpdate({ seasonStartDate: null })}
              className="text-[13px] text-[var(--text-muted)] underline px-2 py-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Weeks of practice */}
      <Stepper
        label="Weeks of practice"
        value={season.weeks}
        min={MIN_WEEKS}
        max={MAX_WEEKS}
        onChange={(v) => onUpdate({ seasonWeeks: v, seasonBreakAfter: Math.min(season.breakAfter, Math.max(1, v - 1)) })}
      />

      {/* Mid-season break */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[14px] font-semibold text-[var(--text-primary)]">Mid-season break</span>
          <button
            onClick={() => onUpdate({ seasonBreakWeeks: noBreak ? 2 : 0 })}
            className="text-[12px] text-[var(--accent)] font-medium"
          >
            {noBreak ? 'Add a break' : 'Remove'}
          </button>
        </div>
        {noBreak ? (
          <p className="text-[12px] text-[var(--text-muted)]">No break, the season runs straight through.</p>
        ) : (
          <div className="space-y-2">
            <Stepper
              label="Break length"
              value={season.breakWeeks}
              min={1}
              max={4}
              small
              onChange={(v) => onUpdate({ seasonBreakWeeks: v })}
            />
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[var(--text-secondary)]">Break after</span>
              <select
                value={Math.min(season.breakAfter, maxBreakAfter)}
                onChange={(e) => onUpdate({ seasonBreakAfter: parseInt(e.target.value, 10) })}
                className="bg-[var(--bg-secondary)] rounded-[8px] px-3 py-1.5 text-[14px] text-[var(--text-primary)] border-none outline-none"
              >
                {Array.from({ length: maxBreakAfter }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>Week {n}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-[var(--accent-light)] rounded-[10px] p-3 text-center">
        {endDate ? (
          <p className="text-[13px] text-[var(--text-secondary)]">
            Your season runs <strong className="text-[var(--text-primary)]">{season.weeks} weeks</strong> and ends{' '}
            <strong className="text-[var(--text-primary)]">{endDate}</strong>.
          </p>
        ) : (
          <p className="text-[13px] text-[var(--accent)]">Set a start date to lay out your dates. Saved on your device.</p>
        )}
      </div>
    </div>
  );
}

function Stepper({ label, value, min, max, onChange, small }) {
  return (
    <div className="flex items-center justify-between">
      <span className={small ? 'text-[13px] text-[var(--text-secondary)]' : 'text-[14px] font-semibold text-[var(--text-primary)]'}>
        {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] text-[18px] font-bold flex items-center justify-center disabled:opacity-40"
        >
          −
        </button>
        <span className="text-[16px] font-semibold text-[var(--text-primary)] w-7 text-center">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] text-[18px] font-bold flex items-center justify-center disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}

function WeekCard({ week, displayDates, onTap }) {
  const hasPracticePlans = week.practicePlans && week.practicePlans.length > 0;

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
        {displayDates && (
          <p className="text-[13px] text-[var(--text-muted)]">{displayDates}</p>
        )}
        <p className="text-[13px] text-[var(--accent)] italic mt-1">"{week.language}"</p>
      </div>
      <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function PracticePlanView({ week, displayDates, onBack }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const practicePlan = week.practicePlans?.[selectedDay];

  const printPlan = () => {
    if (!practicePlan) return;
    const win = window.open('', '_blank');
    if (!win) {
      alert('Your browser blocked the print window. Allow pop-ups for this site to print.');
      return;
    }
    const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const rows = practicePlan.blocks
      .map(
        (b) =>
          `<tr><td style="white-space:nowrap;padding:4px 12px 4px 0;font-weight:600;color:#007AFF;vertical-align:top">${esc(b.time)}</td><td style="padding:4px 0"><strong>${esc(b.activity)}</strong> <span style="color:#888;font-size:11px">(${esc(b.type)})</span>${b.details ? `<br><span style="color:#555;font-size:12px">${esc(b.details)}</span>` : ''}</td></tr>`
      )
      .join('');
    win.document.write(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${esc(week.name)} - Day ${practicePlan.day}</title></head><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:700px;margin:0 auto;padding:24px;color:#1D1D1F"><h1 style="font-size:20px;color:#007AFF;margin:0 0 4px">${esc(week.name)}</h1><p style="color:#666;margin:0 0 4px">${displayDates ? esc(displayDates) + ' &middot; ' : ''}Day ${practicePlan.day} &middot; 90 minutes</p><p style="font-style:italic;color:#007AFF;margin:0 0 16px">"${esc(week.language)}"</p><table style="width:100%;border-collapse:collapse;font-size:13px">${rows}</table><p style="margin-top:24px;color:#999;font-size:11px">Provably Fair Basketball &middot; cpk.solutions</p></body></html>`
    );
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 250);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header
        title={week.name}
        subtitle={displayDates}
        leftAction={onBack}
        leftLabel="← Back"
        rightAction={practicePlan ? printPlan : undefined}
        rightLabel={practicePlan ? 'Print' : undefined}
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
                Practice Plan - Day {practicePlan.day} (90 min)
              </p>
              {practicePlan.blocks.map((block, i) => (
                <PracticeBlock key={i} block={block} />
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

function PracticeBlock({ block }) {
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
          <p className="text-[12px] text-[var(--text-muted)] italic">
            These are the Moose Jaw league rules, where this started. Your league may differ, so check yours.
          </p>

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
