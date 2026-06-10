// Computes a season's week dates from a coach-chosen start date, so the same
// 12-week curriculum works for any season (Dec-Mar, Apr-Sep, Sep-Mar, whatever).
// Replaces the old hardcoded "Dec 7-14" strings that only worked Dec-March.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Parse an ISO date string ('YYYY-MM-DD' from <input type="date">) into a Date, or null.
export function parseStart(startDate) {
  if (!startDate) return null;
  const d = new Date(`${startDate}T00:00:00`);
  return isNaN(d.getTime()) ? null : d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Date range for the Nth week (0-based) of a season starting on `start`.
// e.g. start = Apr 6, weekIndex = 2 -> "Apr 20-26".
export function formatWeekRange(start, weekIndex) {
  if (!start || weekIndex == null) return null;
  const s = addDays(start, weekIndex * 7);
  const e = addDays(s, 6);
  const sM = MONTHS[s.getMonth()];
  const eM = MONTHS[e.getMonth()];
  return sM === eM ? `${sM} ${s.getDate()}-${e.getDate()}` : `${sM} ${s.getDate()} - ${eM} ${e.getDate()}`;
}

// Date range spanning `weeks` calendar weeks starting at week `fromIndex` (used for breaks).
export function formatSpan(start, fromIndex, weeks) {
  if (!start || !weeks) return null;
  const s = addDays(start, fromIndex * 7);
  const e = addDays(start, (fromIndex + weeks) * 7 - 1);
  const sM = MONTHS[s.getMonth()];
  const eM = MONTHS[e.getMonth()];
  return sM === eM ? `${sM} ${s.getDate()}-${e.getDate()}` : `${sM} ${s.getDate()} - ${eM} ${e.getDate()}`;
}

// Month (or month range) spanning weeks fromIndex..toIndex, for a phase header.
export function formatPhaseMonths(start, fromIndex, toIndex) {
  if (!start) return '';
  const s = addDays(start, fromIndex * 7);
  const e = addDays(addDays(start, toIndex * 7), 6);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return FULL_MONTHS[s.getMonth()];
  }
  return `${FULL_MONTHS[s.getMonth()]} - ${FULL_MONTHS[e.getMonth()]}`;
}
