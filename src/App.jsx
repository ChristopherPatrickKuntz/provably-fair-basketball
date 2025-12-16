import { useState, useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { LandingScreen } from './components/LandingScreen';
import { CoachPromise } from './components/CoachPromise';
import { SetupScreen } from './components/SetupScreen';
import { EvaluateScreen } from './components/EvaluateScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SeasonSpineScreen } from './components/SeasonSpineScreen';
import { PracticeToolkitScreen } from './components/PracticeToolkitScreen';
import { ResourcesHubScreen } from './components/ResourcesHubScreen';
import { NewCoachGuideScreen } from './components/NewCoachGuideScreen';

function App() {
  const {
    state,
    saveStatus,
    activeSession,
    acceptPromise,
    startSession,
    updateRating,
    updateNote,
    completeSession,
    continueSession,
    deleteSession,
    clearActiveSession
  } = useAppState();

  // Screen state
  const [screen, setScreen] = useState('landing');

  // Sync screen state when activeSession changes
  useEffect(() => {
    if (activeSession && (screen === 'setup' || screen === 'evaluate' || screen === 'results')) {
      if (activeSession.status === 'completed') {
        setScreen('results');
      } else {
        setScreen('evaluate');
      }
    }
  }, [activeSession?.id, activeSession?.status]);

  if (!state) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
        <div className="text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  const hasExistingSessions = Object.keys(state.sessions || {}).length > 0;

  // Navigate handler for landing screen
  const handleNavigate = (destination) => {
    switch (destination) {
      case 'tryout':
        if (!state.promiseAccepted) {
          setScreen('promise');
        } else {
          setScreen('setup');
        }
        break;
      case 'season':
        setScreen('season');
        break;
      case 'practice':
        setScreen('practice');
        break;
      case 'resources':
        setScreen('resources');
        break;
      case 'coachguide':
        setScreen('coachguide');
        break;
      default:
        setScreen('landing');
    }
  };

  // Landing Screen
  if (screen === 'landing') {
    return (
      <LandingScreen 
        hasExistingSessions={hasExistingSessions}
        onNavigate={handleNavigate}
      />
    );
  }

  // Season Spine
  if (screen === 'season') {
    return (
      <SeasonSpineScreen onBack={() => setScreen('landing')} />
    );
  }

  // Practice Toolkit
  if (screen === 'practice') {
    return (
      <PracticeToolkitScreen onBack={() => setScreen('landing')} />
    );
  }

  // Resources Hub
  if (screen === 'resources') {
    return (
      <ResourcesHubScreen onBack={() => setScreen('landing')} />
    );
  }

  // Coach's Guide
  if (screen === 'coachguide') {
    return (
      <NewCoachGuideScreen onBack={() => setScreen('landing')} />
    );
  }

  // Coach's Promise (first time for tryout tool)
  if (screen === 'promise') {
    return (
      <CoachPromise 
        onAccept={() => {
          acceptPromise();
          setScreen('setup');
        }} 
      />
    );
  }

  // Setup Screen
  if (screen === 'setup') {
    return (
      <SetupScreen
        sessions={state.sessions}
        onStartSession={(gradeBand, playerCount) => {
          startSession(gradeBand, playerCount);
          setScreen('evaluate');
        }}
        onContinueSession={(id) => {
          continueSession(id);
          const session = state.sessions[id];
          setScreen(session?.status === 'completed' ? 'results' : 'evaluate');
        }}
        onDeleteSession={deleteSession}
        onBack={() => setScreen('landing')}
      />
    );
  }

  // Results Screen
  if (screen === 'results' && activeSession) {
    return (
      <ResultsScreen
        session={activeSession}
        onEdit={() => setScreen('evaluate')}
        onNewSession={() => {
          clearActiveSession();
          setScreen('setup');
        }}
      />
    );
  }

  // Evaluate Screen
  if (activeSession) {
    return (
      <EvaluateScreen
        session={activeSession}
        saveStatus={saveStatus}
        onUpdateRating={updateRating}
        onUpdateNote={updateNote}
        onComplete={() => {
          completeSession();
          setScreen('results');
        }}
        onBack={() => {
          clearActiveSession();
          setScreen('setup');
        }}
      />
    );
  }

  // Fallback to landing
  return (
    <LandingScreen 
      hasExistingSessions={hasExistingSessions}
      onNavigate={handleNavigate}
    />
  );
}

export default App;
