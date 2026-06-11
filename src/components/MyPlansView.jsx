import { useState } from 'react';
import { Header } from './Header';
import { DRILL_CATEGORIES, DRILLS, DIFFICULTY_LEVELS } from '../data/drills';
import { planRows, printPlanDoc } from '../utils/customPlans';

// ---------- My Plans tab: saved plans list ----------
export function MyPlansView({ plans, onNew, onEdit }) {
  const sorted = Object.values(plans || {}).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-5">
          <p className="text-[15px] text-[var(--accent)] font-medium mb-1">
            Your own practice plans, saved on this device.
          </p>
          <p className="text-[13px] text-[var(--text-secondary)]">
            Start from the proven practice structure, drop in drills from the library or your own
            notes, then print it or use it on any open week of your season plan.
          </p>
        </div>

        <button
          onClick={onNew}
          className="w-full py-3.5 bg-[var(--accent)] text-white rounded-[var(--radius)] text-[16px] font-semibold mb-5 active:scale-[0.98] transition-transform"
        >
          + New Practice Plan
        </button>

        {sorted.length === 0 ? (
          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-6 text-center">
            <p className="text-[40px] mb-3">📝</p>
            <p className="text-[15px] text-[var(--text-primary)] font-medium mb-1">No plans yet</p>
            <p className="text-[13px] text-[var(--text-muted)]">
              Tap New Practice Plan to build your first one. It takes about two minutes.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((plan) => (
              <PlanRow key={plan.id} plan={plan} onEdit={() => onEdit(plan)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlanRow({ plan, onEdit }) {
  const date = new Date(plan.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const drillCount = Object.values(plan.blocks || {}).filter((b) => b.drillId).length;

  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 flex items-center gap-2">
      <button onClick={onEdit} className="flex-1 text-left min-w-0" aria-label={`Edit ${plan.name}`}>
        <p className="text-[15px] font-medium text-[var(--text-primary)] truncate">{plan.name}</p>
        <p className="text-[13px] text-[var(--text-muted)]">
          {plan.minutes} min • {drillCount} drill{drillCount === 1 ? '' : 's'} • updated {date}
        </p>
      </button>
      <button
        onClick={() => printPlanDoc(plan)}
        className="px-3 py-2 bg-[var(--bg-secondary)] text-[var(--accent)] rounded-[10px] text-[13px] font-medium flex-shrink-0"
      >
        Print
      </button>
      <button
        onClick={onEdit}
        className="px-3 py-2 bg-[var(--accent)] text-white rounded-[10px] text-[13px] font-medium flex-shrink-0"
      >
        Edit
      </button>
    </div>
  );
}

// ---------- Full-screen plan editor ----------
export function PlanEditorScreen({ initialPlan, onSave, onDelete, onClose }) {
  const [plan, setPlan] = useState(initialPlan);
  const [dirty, setDirty] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [pickFor, setPickFor] = useState(null);

  const update = (mut) => {
    setPlan((p) => ({ ...p, ...mut }));
    setDirty(true);
  };
  const updateBlock = (key, content) => {
    setPlan((p) => ({
      ...p,
      blocks: { ...p.blocks, [key]: { ...(p.blocks[key] || { drillId: null, note: '' }), ...content } },
    }));
    setDirty(true);
  };

  const handleClose = () => {
    if (!dirty || window.confirm('Discard unsaved changes to this plan?')) onClose();
  };
  const handleSave = () => {
    onSave({ ...plan, name: plan.name.trim() || 'Practice Plan' });
    onClose();
  };

  if (pickFor) {
    return (
      <DrillPicker
        onBack={() => setPickFor(null)}
        onPick={(drillId) => {
          updateBlock(pickFor, { drillId });
          setExpanded(pickFor);
          setPickFor(null);
        }}
      />
    );
  }

  const rows = planRows(plan);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header
        title={plan.name || 'New Plan'}
        leftAction={handleClose}
        leftLabel="← My Plans"
        rightAction={handleSave}
        rightLabel="Save"
        rightVariant="primary"
      />

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4">
            <label htmlFor="plan-name" className="block text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
              Plan name
            </label>
            <input
              id="plan-name"
              value={plan.name}
              onChange={(e) => update({ name: e.target.value })}
              className="w-full bg-[var(--bg-secondary)] rounded-[10px] px-3 py-2.5 text-[15px] text-[var(--text-primary)] border-none outline-none"
            />
            <div className="flex gap-2 mt-3">
              {[90, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => update({ minutes: m })}
                  aria-pressed={plan.minutes === m}
                  className={`flex-1 py-2 rounded-[10px] text-[14px] font-medium transition-all ${
                    plan.minutes === m
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                  }`}
                >
                  {m} minutes
                </button>
              ))}
            </div>
          </div>

          <p className="text-[13px] text-[var(--text-muted)] px-1">
            Tap a block to add a drill from the library or your own note. The structure stays the
            same on purpose: predictable = calm.
          </p>

          <div className="space-y-2">
            {rows.map((row) => (
              <BlockCard
                key={row.key}
                row={row}
                isOpen={expanded === row.key}
                onToggle={() => setExpanded(expanded === row.key ? null : row.key)}
                onPick={() => setPickFor(row.key)}
                onNote={(note) => updateBlock(row.key, { note })}
                onClearDrill={() => updateBlock(row.key, { drillId: null })}
              />
            ))}
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-[var(--accent)] text-white rounded-[var(--radius)] text-[16px] font-semibold active:scale-[0.98] transition-transform"
          >
            Save plan
          </button>
          {onDelete && (
            <button
              onClick={() => {
                if (window.confirm('Delete this plan? This cannot be undone.')) {
                  onDelete(plan.id);
                  onClose();
                }
              }}
              className="w-full py-2 text-[14px] text-[var(--rating-needs-work)] font-medium"
            >
              Delete this plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function BlockCard({ row, isOpen, onToggle, onPick, onNote, onClearDrill }) {
  const summary = row.drill ? row.drill.name : row.note;

  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
      <button onClick={onToggle} aria-expanded={isOpen} className="w-full flex text-left items-stretch">
        <div className="w-16 bg-[var(--bg-secondary)] flex items-center justify-center py-3 flex-shrink-0">
          <span className="text-[13px] font-mono text-[var(--accent)] font-medium">{row.time}</span>
        </div>
        <div className="flex-1 p-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-[var(--text-primary)]">{row.name}</span>
            <span className="text-[11px] text-[var(--text-muted)]">{row.duration} min</span>
          </div>
          <p className={`text-[13px] truncate ${summary ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)] italic'}`}>
            {summary || row.hint}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--text-muted)] flex-shrink-0 self-center mr-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-3 border-t border-[var(--bg-secondary)] space-y-3">
          {row.drill ? (
            <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-[10px] p-3">
              <span className="flex-1 text-[14px] font-medium text-[var(--text-primary)] min-w-0 truncate">
                {row.drill.name}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] flex-shrink-0">{row.drill.time}</span>
              <button
                onClick={onClearDrill}
                className="text-[13px] text-[var(--rating-needs-work)] font-medium px-1 flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={onPick}
              className="w-full py-2.5 bg-[var(--accent)] text-white rounded-[10px] text-[14px] font-medium"
            >
              Pick from the drill library
            </button>
          )}
          <div>
            <label htmlFor={`note-${row.key}`} className="block text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-1">
              Note
            </label>
            <input
              id={`note-${row.key}`}
              value={row.note}
              onChange={(e) => onNote(e.target.value)}
              placeholder={row.hint}
              className="w-full bg-[var(--bg-secondary)] rounded-[10px] px-3 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border-none outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DrillPicker({ onBack, onPick }) {
  const [category, setCategory] = useState(null);
  const categories = DRILL_CATEGORIES.filter((c) => DRILLS.some((d) => d.category === c.id));
  const drills = category ? DRILLS.filter((d) => d.category === category) : DRILLS;

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header title="Choose a Drill" leftAction={onBack} leftLabel="← Plan" />
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setCategory(null)}
              aria-pressed={!category}
              className={`px-3 py-1.5 rounded-[10px] text-[13px] font-medium transition-all whitespace-nowrap ${
                !category ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
                className={`px-3 py-1.5 rounded-[10px] text-[13px] font-medium transition-all whitespace-nowrap ${
                  category === cat.id ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {drills.map((drill) => {
              const difficulty = DIFFICULTY_LEVELS.find((l) => l.id === drill.difficulty);
              const cat = DRILL_CATEGORIES.find((c) => c.id === drill.category);
              return (
                <button
                  key={drill.id}
                  onClick={() => onPick(drill.id)}
                  className="w-full bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 text-left flex items-center gap-3 active:scale-[0.98] transition-transform"
                >
                  <span className="text-[15px]" aria-hidden="true">{cat?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-medium text-[var(--text-primary)] truncate">{drill.name}</span>
                      {difficulty && (
                        <span
                          className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{ backgroundColor: difficulty.color, color: difficulty.textColor }}
                        >
                          {difficulty.label}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[var(--text-muted)]">{drill.time} • {drill.players}</p>
                  </div>
                  <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
