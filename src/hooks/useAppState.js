import { useState, useEffect, useCallback } from 'react';
import { loadState, saveState, createSession, isStorageAvailable } from '../utils/storage';

export function useAppState() {
  const [state, setState] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    setStorageAvailable(isStorageAvailable());
  }, []);

  const save = useCallback((newState) => {
    setState(newState);
    setSaveStatus('saving');
    const success = saveState(newState);
    setSaveStatus(success ? 'saved' : 'error');
    if (!success) setStorageAvailable(false);
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, []);

  const acceptPromise = useCallback(() => {
    if (!state) return;
    save({
      ...state,
      promiseAccepted: true,
      promiseAcceptedAt: new Date().toISOString()
    });
  }, [state, save]);

  const startSession = useCallback((gradeBand, playerCount) => {
    if (!state) return;
    const session = createSession(gradeBand, playerCount);
    save({
      ...state,
      activeSessionId: session.id,
      sessions: {
        ...state.sessions,
        [session.id]: session
      }
    });
  }, [state, save]);

  const updateRating = useCallback((playerId, domainId, value) => {
    if (!state || !state.activeSessionId) return;
    const session = state.sessions[state.activeSessionId];
    if (!session) return;

    const updatedSession = {
      ...session,
      updatedAt: new Date().toISOString(),
      ratings: {
        ...session.ratings,
        [playerId]: {
          ...session.ratings[playerId],
          [domainId]: value
        }
      }
    };

    save({
      ...state,
      sessions: {
        ...state.sessions,
        [state.activeSessionId]: updatedSession
      }
    });
  }, [state, save]);

  const updateNote = useCallback((playerId, note) => {
    if (!state || !state.activeSessionId) return;
    const session = state.sessions[state.activeSessionId];
    if (!session) return;

    const updatedSession = {
      ...session,
      updatedAt: new Date().toISOString(),
      ratings: {
        ...session.ratings,
        [playerId]: {
          ...session.ratings[playerId],
          note
        }
      }
    };

    save({
      ...state,
      sessions: {
        ...state.sessions,
        [state.activeSessionId]: updatedSession
      }
    });
  }, [state, save]);

  const completeSession = useCallback(() => {
    if (!state || !state.activeSessionId) return;
    const session = state.sessions[state.activeSessionId];
    if (!session) return;

    const updatedSession = {
      ...session,
      status: 'completed',
      updatedAt: new Date().toISOString()
    };

    save({
      ...state,
      sessions: {
        ...state.sessions,
        [state.activeSessionId]: updatedSession
      }
    });
  }, [state, save]);

  const continueSession = useCallback((sessionId) => {
    if (!state) return;
    save({
      ...state,
      activeSessionId: sessionId
    });
  }, [state, save]);

  const deleteSession = useCallback((sessionId) => {
    if (!state) return;
    const { [sessionId]: _removed, ...remainingSessions } = state.sessions;
    save({
      ...state,
      activeSessionId: state.activeSessionId === sessionId ? null : state.activeSessionId,
      sessions: remainingSessions
    });
  }, [state, save]);

  const renameSession = useCallback((sessionId, newName) => {
    if (!state || !state.sessions[sessionId]) return;
    save({
      ...state,
      sessions: {
        ...state.sessions,
        [sessionId]: {
          ...state.sessions[sessionId],
          name: newName
        }
      }
    });
  }, [state, save]);

  const clearActiveSession = useCallback(() => {
    if (!state) return;
    save({
      ...state,
      activeSessionId: null
    });
  }, [state, save]);

  const setSeasonStartDate = useCallback((date) => {
    if (!state) return;
    save({ ...state, seasonStartDate: date });
  }, [state, save]);

  const updateSeasonSettings = useCallback((partial) => {
    if (!state) return;
    save({ ...state, ...partial });
  }, [state, save]);

  const activeSession = state?.activeSessionId ? state.sessions[state.activeSessionId] : null;

  return {
    state,
    saveStatus,
    storageAvailable,
    seasonStartDate: state?.seasonStartDate ?? null,
    setSeasonStartDate,
    updateSeasonSettings,
    activeSession,
    acceptPromise,
    startSession,
    updateRating,
    updateNote,
    completeSession,
    continueSession,
    deleteSession,
    renameSession,
    clearActiveSession
  };
}
