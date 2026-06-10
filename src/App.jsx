import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAppState } from './hooks/useAppState';
import { HomeScreen } from './components/HomeScreen';
import { HandbookScreen } from './components/HandbookScreen';
import { StartHereScreen } from './components/StartHereScreen';
import { StorageBanner } from './components/StorageBanner';
import { CoachPromise } from './components/CoachPromise';
import { SetupScreen } from './components/SetupScreen';
import { EvaluateScreen } from './components/EvaluateScreen';
import { ResultsScreen } from './components/ResultsScreen';
// Lazy-load the content-heavy Handbook screens (and their large data files) so the
// tryout tool and home screen load instantly. They split into separate chunks.
const SeasonSpineScreen = lazy(() => import('./components/SeasonSpineScreen').then((m) => ({ default: m.SeasonSpineScreen })));
const PracticeToolkitScreen = lazy(() => import('./components/PracticeToolkitScreen').then((m) => ({ default: m.PracticeToolkitScreen })));
const ResourcesHubScreen = lazy(() => import('./components/ResourcesHubScreen').then((m) => ({ default: m.ResourcesHubScreen })));
const NewCoachGuideScreen = lazy(() => import('./components/NewCoachGuideScreen').then((m) => ({ default: m.NewCoachGuideScreen })));

function App() {
  const {
    state,
    saveStatus,
    storageAvailable,
    updateSeasonSettings,
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

  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
        <div className="text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  const sessions = state.sessions || {};
  const resumeSession = Object.values(sessions)
    .filter((s) => s.status === 'in_progress')
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0] || null;

  return (
    <>
      {!storageAvailable && <StorageBanner />}
      <Suspense
        fallback={
          <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
            <div className="text-[var(--text-muted)]">Loading...</div>
          </div>
        }
      >
      <Routes>
      {/* Home - tool-first, two front doors */}
      <Route
        path="/"
        element={
          <HomeScreen
            resumeSession={resumeSession}
            onResume={() => {
              if (!resumeSession) return;
              continueSession(resumeSession.id);
              navigate('/tryout/evaluate');
            }}
            onStartHere={() => navigate('/start')}
            onStartTryout={() => navigate('/tryout')}
            onOpenHandbook={() => navigate('/handbook')}
          />
        }
      />

      {/* Start Here - guided on-ramp for brand-new coaches */}
      <Route
        path="/start"
        element={
          <StartHereScreen
            onBack={() => navigate('/')}
            onGo={(target) =>
              navigate(
                {
                  mindset: '/handbook/guide',
                  practice: '/handbook/practice',
                  tryout: '/tryout',
                  season: '/handbook/season',
                  parents: '/handbook/guide?section=templates',
                }[target] || '/'
              )
            }
          />
        }
      />

      {/* Tryout setup (gated once by the Coach's Promise) */}
      <Route
        path="/tryout"
        element={
          state.promiseAccepted ? (
            <SetupScreen
              sessions={sessions}
              onStartSession={(gradeBand, playerCount) => {
                startSession(gradeBand, playerCount);
                navigate('/tryout/evaluate');
              }}
              onContinueSession={(id) => {
                continueSession(id);
                navigate(sessions[id]?.status === 'completed' ? '/tryout/results' : '/tryout/evaluate');
              }}
              onDeleteSession={deleteSession}
              onBack={() => navigate('/')}
            />
          ) : (
            <CoachPromise
              onAccept={acceptPromise}
              onBack={() => navigate('/')}
            />
          )
        }
      />

      {/* Evaluate active session */}
      <Route
        path="/tryout/evaluate"
        element={
          activeSession ? (
            <EvaluateScreen
              session={activeSession}
              saveStatus={saveStatus}
              onUpdateRating={updateRating}
              onUpdateNote={updateNote}
              onComplete={() => {
                completeSession();
                navigate('/tryout/results');
              }}
              onBack={() => {
                clearActiveSession();
                navigate('/tryout');
              }}
            />
          ) : (
            <Navigate to="/tryout" replace />
          )
        }
      />

      {/* Results */}
      <Route
        path="/tryout/results"
        element={
          activeSession ? (
            <ResultsScreen
              session={activeSession}
              onEdit={() => navigate('/tryout/evaluate')}
              onNewSession={() => {
                clearActiveSession();
                navigate('/tryout');
              }}
            />
          ) : (
            <Navigate to="/tryout" replace />
          )
        }
      />

      {/* Coaching Handbook hub + sections */}
      <Route
        path="/handbook"
        element={
          <HandbookScreen
            onBack={() => navigate('/')}
            onOpen={(section) => navigate(`/handbook/${section}`)}
          />
        }
      />
      <Route path="/handbook/season" element={
        <SeasonSpineScreen
          onBack={() => navigate('/handbook')}
          season={{
            startDate: state.seasonStartDate ?? null,
            weeks: state.seasonWeeks ?? 12,
            breakAfter: state.seasonBreakAfter ?? 2,
            breakWeeks: state.seasonBreakWeeks ?? 2,
          }}
          onUpdateSeason={updateSeasonSettings}
        />
      } />
      <Route path="/handbook/practice" element={<PracticeToolkitScreen onBack={() => navigate('/handbook')} />} />
      <Route path="/handbook/guide" element={<NewCoachGuideScreen onBack={() => navigate('/handbook')} />} />
      <Route path="/handbook/reference" element={<ResourcesHubScreen onBack={() => navigate('/handbook')} />} />

      {/* Unknown → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
