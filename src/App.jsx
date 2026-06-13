import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from './hooks/useAppState';
import { HomeScreen } from './components/HomeScreen';
import { HandbookScreen } from './components/HandbookScreen';
import { StartHereScreen } from './components/StartHereScreen';
import { StorageBanner } from './components/StorageBanner';
import { CoachPromise } from './components/CoachPromise';
import { SetupScreen } from './components/SetupScreen';
import { EvaluateScreen } from './components/EvaluateScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { CompareScreen } from './components/CompareScreen';
// Lazy-load the content-heavy Handbook screens (and their large data files) so the
// tryout tool and home screen load instantly. They split into separate chunks.
const SeasonSpineScreen = lazy(() => import('./components/SeasonSpineScreen').then((m) => ({ default: m.SeasonSpineScreen })));
const PracticeToolkitScreen = lazy(() => import('./components/PracticeToolkitScreen').then((m) => ({ default: m.PracticeToolkitScreen })));
const ResourcesHubScreen = lazy(() => import('./components/ResourcesHubScreen').then((m) => ({ default: m.ResourcesHubScreen })));
const NewCoachGuideScreen = lazy(() => import('./components/NewCoachGuideScreen').then((m) => ({ default: m.NewCoachGuideScreen })));

// Per-route document titles so history, bookmarks, and search results name the
// page, not just the app. Keep in sync with scripts/prerender-meta.mjs.
const ROUTE_TITLES = {
  '/': 'Provably Fair Basketball | Free Youth Basketball Tryout & Coaching Tool',
  '/start': 'Start Here for New Coaches | Provably Fair Basketball',
  '/tryout': 'Fair Tryout Evaluation Tool | Provably Fair Basketball',
  '/tryout/evaluate': 'Tryout Evaluation | Provably Fair Basketball',
  '/tryout/results': 'Tryout Results | Provably Fair Basketball',
  '/tryout/compare': 'Compare Tryouts | Provably Fair Basketball',
  '/handbook': 'Coaching Handbook | Provably Fair Basketball',
  '/handbook/season': 'Customizable Season Plan | Provably Fair Basketball',
  '/handbook/practice': 'Practice Toolkit and Drill Library | Provably Fair Basketball',
  '/handbook/guide': "New Coach's Guide | Provably Fair Basketball",
  '/handbook/reference': 'Quick Reference | Provably Fair Basketball',
};

function App() {
  const location = useLocation();
  useEffect(() => {
    document.title = ROUTE_TITLES[location.pathname] || ROUTE_TITLES['/'];
  }, [location.pathname]);

  const {
    state,
    saveStatus,
    storageAvailable,
    updateSeasonSettings,
    savePlan,
    deletePlan,
    assignWeekPlan,
    addPlayerToSession,
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
      <main>
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
                  mindset: '/handbook/guide?section=guide',
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
              onCompare={() => navigate('/tryout/compare')}
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

      {/* Compare two tryout sessions (e.g. day 1 vs day 2) */}
      <Route
        path="/tryout/compare"
        element={
          state.promiseAccepted ? (
            <CompareScreen sessions={sessions} onBack={() => navigate('/tryout')} />
          ) : (
            <Navigate to="/tryout" replace />
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
              onAddPlayer={addPlayerToSession}
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
          customPlans={state.customPlans || {}}
          weekPlans={state.weekPlans || {}}
          onAssignWeekPlan={assignWeekPlan}
        />
      } />
      <Route path="/handbook/practice" element={
        <PracticeToolkitScreen
          onBack={() => navigate('/handbook')}
          customPlans={state.customPlans || {}}
          onSavePlan={savePlan}
          onDeletePlan={deletePlan}
        />
      } />
      <Route path="/handbook/guide" element={<NewCoachGuideScreen onBack={() => navigate('/handbook')} />} />
      <Route path="/handbook/reference" element={<ResourcesHubScreen onBack={() => navigate('/handbook')} />} />

      {/* Unknown → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
      </Suspense>
    </>
  );
}

export default App;
