// Coach-authored practice plans. A plan fills the proven practice template (the
// app's "same structure every practice, predictable = calm" philosophy) rather
// than free-form scheduling: every block keeps its slot and duration, and the
// coach drops a drill from the library or a note into each one. Plans live in
// the same on-device state as everything else, never in any cloud.
import { DRILLS } from '../data/drills';

export const PLAN_BLOCKS = {
  90: [
    { key: 'warmup', name: 'Warm-Up', type: 'Warm-Up', duration: 10, hint: 'Shooting flow, get loose' },
    { key: 'huddle', name: 'Huddle', type: 'Huddle', duration: 5, hint: 'Intro: skill of the day' },
    { key: 'skill1', name: 'Skill Block 1', type: 'Skill', duration: 15, hint: 'Teach the skill (breakdown)' },
    { key: 'game1', name: 'Skill Game 1', type: 'Game', duration: 10, hint: 'Apply the skill in competition' },
    { key: 'skill2', name: 'Skill Block 2', type: 'Skill', duration: 15, hint: 'Shooting or secondary skill' },
    { key: 'game2', name: 'Skill Game 2', type: 'Game', duration: 10, hint: 'Small-sided game' },
    { key: 'scrimmage', name: 'Scrimmage', type: 'Scrimmage', duration: 20, hint: "5v5, reinforce the day's focus" },
    { key: 'close', name: 'Close', type: 'Huddle', duration: 5, hint: 'Huddle, takeaway, positive note' },
  ],
  // The app's own 60-minute advice: drop one skill block + game, shorter scrimmage.
  60: [
    { key: 'warmup', name: 'Warm-Up', type: 'Warm-Up', duration: 10, hint: 'Shooting flow, get loose' },
    { key: 'huddle', name: 'Huddle', type: 'Huddle', duration: 5, hint: 'Intro: skill of the day' },
    { key: 'skill1', name: 'Skill Block', type: 'Skill', duration: 15, hint: 'Teach the skill (breakdown)' },
    { key: 'game1', name: 'Skill Game', type: 'Game', duration: 10, hint: 'Apply the skill in competition' },
    { key: 'scrimmage', name: 'Scrimmage', type: 'Scrimmage', duration: 15, hint: "5v5, reinforce the day's focus" },
    { key: 'close', name: 'Close', type: 'Huddle', duration: 5, hint: 'Huddle, takeaway, positive note' },
  ],
};

// Blocks that read well prefilled; skill and game slots start empty so the hint
// shows as a placeholder instead of printing as content.
const PREFILL = ['warmup', 'huddle', 'scrimmage', 'close'];

export function createPlan(minutes = 90) {
  const now = new Date();
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  return {
    id: 'plan-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
    name: `Practice Plan - ${month} ${now.getDate()}`,
    minutes,
    blocks: Object.fromEntries(
      PLAN_BLOCKS[minutes].map((b) => [b.key, { drillId: null, note: PREFILL.includes(b.key) ? b.hint : '' }])
    ),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

const fmtTime = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;

// Render-ready rows: structure + the coach's content + computed clock times.
export function planRows(plan) {
  const structure = PLAN_BLOCKS[plan.minutes] || PLAN_BLOCKS[90];
  let offset = 0;
  return structure.map((b) => {
    const content = plan.blocks?.[b.key] || { drillId: null, note: '' };
    const drill = content.drillId ? DRILLS.find((d) => d.id === content.drillId) : null;
    const row = {
      ...b,
      time: fmtTime(offset),
      drill,
      drillId: drill ? drill.id : null,
      note: content.note || '',
      activity: drill ? drill.name : b.name,
      details: drill ? content.note || '' : content.note || b.hint,
    };
    offset += b.duration;
    return row;
  });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function printPlanDoc(plan) {
  const win = window.open('', '_blank');
  if (!win) {
    alert('Your browser blocked the print window. Allow pop-ups for this site to print.');
    return;
  }
  const rows = planRows(plan)
    .map(
      (r) =>
        `<tr><td style="white-space:nowrap;padding:4px 12px 4px 0;font-weight:600;color:#007AFF;vertical-align:top">${escapeHtml(r.time)}</td><td style="padding:4px 0"><strong>${escapeHtml(r.activity)}</strong> <span style="color:#888;font-size:11px">(${escapeHtml(r.name)}, ${r.duration} min)</span>${r.details ? `<br><span style="color:#555;font-size:12px">${escapeHtml(r.details)}</span>` : ''}</td></tr>`
    )
    .join('');
  win.document.write(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escapeHtml(plan.name)}</title></head><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:700px;margin:0 auto;padding:24px;color:#1D1D1F"><h1 style="font-size:20px;color:#007AFF;margin:0 0 4px">${escapeHtml(plan.name)}</h1><p style="color:#666;margin:0 0 16px">${plan.minutes} minutes</p><table style="width:100%;border-collapse:collapse;font-size:13px">${rows}</table><p style="margin-top:24px;color:#999;font-size:11px">Provably Fair Basketball &middot; cpk.solutions</p></body></html>`
  );
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 250);
}

// The shape a season week's practicePlans entry uses, so an assigned custom plan
// renders, taps into drill details, and prints exactly like a built-in plan.
export function planToPracticePlan(plan) {
  return {
    day: 1,
    minutes: plan.minutes,
    blocks: planRows(plan).map((r) => ({
      time: r.time,
      type: r.type,
      activity: r.activity,
      details: r.details,
      drillId: r.drillId || undefined,
    })),
  };
}
