const STORAGE_KEY = 'provablyFairBasketball';

const DEFAULT_STATE = {
  version: '1.0',
  activeSessionId: null,
  promiseAccepted: false,
  promiseAcceptedAt: null,
  seasonStartDate: null,
  seasonWeeks: 12,
  seasonBreakAfter: 2,
  seasonBreakWeeks: 2,
  sessions: {}
};

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_STATE;
    const parsed = JSON.parse(saved);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    console.error('Failed to load state:', e);
    return DEFAULT_STATE;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    console.error('Failed to save state:', e);
    return false;
  }
}

// Probe whether localStorage is usable at all. Returns false in private/incognito
// modes, on storage-disabled/locked-down devices, or when quota is exhausted.
// The app is intentionally device-dependent, so this is about warning the coach,
// not about adding any off-device persistence.
export function isStorageAvailable() {
  try {
    const testKey = '__pfb_storage_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function generateSessionId() {
  return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

export function generateSessionName(playerCount) {
  const now = new Date();
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const day = now.getDate();
  return `${month} ${day} - ${playerCount} players`;
}

export function createEmptyRatings(playerCount) {
  const ratings = {};
  for (let i = 1; i <= playerCount; i++) {
    ratings[i] = {
      effort: null,
      coachable: null,
      ballSkills: null,
      footwork: null,
      finishing: null,
      teammate: null,
      note: ''
    };
  }
  return ratings;
}

export function createSession(gradeBand, playerCount) {
  const id = generateSessionId();
  const now = new Date().toISOString();
  
  return {
    id,
    name: generateSessionName(playerCount),
    gradeBand,
    playerCount,
    createdAt: now,
    updatedAt: now,
    status: 'in_progress',
    evaluatorCount: 1,
    ratings: createEmptyRatings(playerCount)
  };
}
