import { useState } from 'react';
import { Header } from './Header';
import { calculateScore, getDomainsRated } from '../utils/scoring';

// Side-by-side comparison of two tryout sessions (e.g. day 1 vs day 2 of the
// same tryout). Same jersey numbers must mean the same kids across both days,
// which the paper attendance sheet guarantees. Everything stays on-device.
export function CompareScreen({ sessions, onBack }) {
  const all = Object.values(sessions || {}).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  const [idA, setIdA] = useState(all[all.length - 2]?.id || null);
  const [idB, setIdB] = useState(all[all.length - 1]?.id || null);

  const sessionA = idA ? sessions[idA] : null;
  const sessionB = idB ? sessions[idB] : null;

  if (all.length < 2) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
        <Header title="Compare Tryouts" leftAction={onBack} leftLabel="← Tryout" />
        <div className="flex-1 px-4 py-6">
          <div className="max-w-lg mx-auto bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-6 text-center">
            <p className="text-[15px] text-[var(--text-primary)] font-medium mb-1">Need two tryouts to compare</p>
            <p className="text-[13px] text-[var(--text-muted)]">
              Run a second session (for example day 2 of tryouts) and it will show up here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const rows = buildRows(sessionA, sessionB);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header
        title="Compare Tryouts"
        leftAction={onBack}
        leftLabel="← Tryout"
        rightAction={sessionA && sessionB ? () => printComparison(sessionA, sessionB, rows) : undefined}
        rightLabel={sessionA && sessionB ? 'Print' : undefined}
      />

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-3">
            <p className="text-[13px] text-[var(--text-secondary)]">
              Comparing only works if players wore the <strong>same numbers</strong> both days.
              Keep the paper attendance sheet consistent across sessions.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 space-y-3">
            <SessionPicker label="Day 1" value={idA} onChange={setIdA} sessions={all} />
            <SessionPicker label="Day 2" value={idB} onChange={setIdB} sessions={all} />
          </div>

          {idA === idB ? (
            <p className="text-[13px] text-[var(--text-muted)] text-center py-4">
              Pick two different sessions to compare.
            </p>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center px-4 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                <span className="w-9">#</span>
                <span className="flex-1 text-center">Day 1</span>
                <span className="flex-1 text-center">Day 2</span>
                <span className="w-14 text-center">Change</span>
                <span className="w-12 text-right">Avg</span>
              </div>
              {rows.map((row) => (
                <CompareRow key={row.player} row={row} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionPicker({ label, value, onChange, sessions }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[14px] font-semibold text-[var(--text-primary)] flex-shrink-0">{label}</span>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Session for ${label}`}
        className="flex-1 min-w-0 bg-[var(--bg-secondary)] rounded-[10px] px-3 py-2 text-[14px] text-[var(--text-primary)] border-none outline-none"
      >
        {sessions.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}{s.status === 'in_progress' ? ' (in progress)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}

function buildRows(sessionA, sessionB) {
  if (!sessionA || !sessionB) return [];
  const maxCount = Math.max(sessionA.playerCount || 0, sessionB.playerCount || 0);
  const rows = [];
  for (let p = 1; p <= maxCount; p += 1) {
    const ratingsA = sessionA.ratings?.[p];
    const ratingsB = sessionB.ratings?.[p];
    const scoreA = ratingsA ? calculateScore(ratingsA) : null;
    const scoreB = ratingsB ? calculateScore(ratingsB) : null;
    const ratedA = ratingsA ? getDomainsRated(ratingsA) : 0;
    const ratedB = ratingsB ? getDomainsRated(ratingsB) : 0;
    const both = scoreA !== null && scoreB !== null;
    const avg = both ? Math.round((scoreA + scoreB) / 2) : scoreA ?? scoreB;
    rows.push({
      player: p,
      scoreA,
      scoreB,
      ratedA,
      ratedB,
      delta: both ? scoreB - scoreA : null,
      avg,
    });
  }
  // Players seen on both days rank first by average, then single-day players,
  // then players never rated.
  return rows.sort((a, b) => {
    const tierA = a.scoreA !== null && a.scoreB !== null ? 0 : a.avg !== null ? 1 : 2;
    const tierB = b.scoreA !== null && b.scoreB !== null ? 0 : b.avg !== null ? 1 : 2;
    if (tierA !== tierB) return tierA - tierB;
    if (a.avg !== b.avg) return (b.avg ?? -1) - (a.avg ?? -1);
    return a.player - b.player;
  });
}

function DeltaChip({ delta }) {
  if (delta === null) return <span className="text-[12px] text-[var(--text-muted)]">-</span>;
  if (delta > 0) {
    return <span className="text-[12px] font-semibold text-[var(--rating-good)]">▲ {delta}</span>;
  }
  if (delta < 0) {
    return <span className="text-[12px] font-semibold text-[var(--rating-needs-work)]">▼ {Math.abs(delta)}</span>;
  }
  return <span className="text-[12px] font-medium text-[var(--text-muted)]">=</span>;
}

function CompareRow({ row }) {
  const fmt = (score, rated) =>
    score === null ? <span className="text-[var(--text-muted)]">-</span> : (
      <>
        <span className="font-semibold text-[var(--text-primary)]">{score}%</span>
        <span className="text-[10px] text-[var(--text-muted)] block">{rated}/6</span>
      </>
    );
  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] px-4 py-3 flex items-center">
      <span className="w-9 h-7 rounded-full bg-[var(--bg-secondary)] text-[13px] font-bold text-[var(--text-primary)] flex items-center justify-center">
        {row.player}
      </span>
      <span className="flex-1 text-center text-[14px]">{fmt(row.scoreA, row.ratedA)}</span>
      <span className="flex-1 text-center text-[14px]">{fmt(row.scoreB, row.ratedB)}</span>
      <span className="w-14 text-center"><DeltaChip delta={row.delta} /></span>
      <span className="w-12 text-right text-[14px] font-bold text-[var(--accent)]">
        {row.avg !== null ? `${row.avg}%` : '-'}
      </span>
    </div>
  );
}

function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function printComparison(sessionA, sessionB, rows) {
  const win = window.open('', '_blank');
  if (!win) {
    alert('Your browser blocked the print window. Allow pop-ups for this site to print.');
    return;
  }
  const cell = 'padding:6px 8px;border-bottom:1px solid #E5E5EA;text-align:center';
  const body = rows
    .map((r) => {
      const d = r.delta === null ? '-' : r.delta > 0 ? `+${r.delta}` : `${r.delta}`;
      return `<tr><td style="${cell};font-weight:700">${r.player}</td><td style="${cell}">${r.scoreA !== null ? r.scoreA + '%' : '-'}</td><td style="${cell}">${r.scoreB !== null ? r.scoreB + '%' : '-'}</td><td style="${cell}">${d}</td><td style="${cell};font-weight:700;color:#007AFF">${r.avg !== null ? r.avg + '%' : '-'}</td></tr>`;
    })
    .join('');
  win.document.write(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Tryout Comparison</title></head><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1D1D1F"><h1 style="font-size:20px;color:#007AFF;margin:0 0 4px">Tryout Comparison</h1><p style="color:#666;margin:0 0 16px">Day 1: ${escapeHtml(sessionA.name)} &middot; Day 2: ${escapeHtml(sessionB.name)}</p><table style="width:100%;border-collapse:collapse;font-size:13px"><tr><th style="${cell}">#</th><th style="${cell}">Day 1</th><th style="${cell}">Day 2</th><th style="${cell}">Change</th><th style="${cell}">Average</th></tr>${body}</table><p style="margin-top:16px;color:#666;font-size:11px">Numbers only. Cross-reference with the paper attendance sheet. Same numbers must mean the same players on both days.</p><p style="margin-top:12px;color:#999;font-size:11px">Provably Fair Basketball &middot; cpk.solutions</p></body></html>`
  );
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 250);
}
