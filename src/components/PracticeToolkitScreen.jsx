import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from './Header';
import { DRILL_CATEGORIES, DRILLS, PRACTICE_TEMPLATE, QUICK_SESSIONS, DIFFICULTY_LEVELS } from '../data/drills';
import { MyPlansView, PlanEditorScreen } from './MyPlansView';
import { createPlan } from '../utils/customPlans';

const TABS = ['template', 'quick', 'drills', 'plans'];

export function PracticeToolkitScreen({ onBack, customPlans, onSavePlan, onDeletePlan }) {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const t = searchParams.get('tab');
    return TABS.includes(t) ? t : 'template';
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [selectedQuickSession, setSelectedQuickSession] = useState(null);
  // When set, the plan editor takes over the screen (its own header and Save).
  const [editorPlan, setEditorPlan] = useState(null);

  if (editorPlan) {
    return (
      <PlanEditorScreen
        initialPlan={editorPlan}
        onSave={onSavePlan}
        onDelete={customPlans?.[editorPlan.id] ? onDeletePlan : undefined}
        onClose={() => setEditorPlan(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header 
        title="Practice Toolkit"
        leftAction={onBack}
        leftLabel="← Handbook"
      />

      {/* Tab Bar */}
      <div className="bg-[var(--bg-card)] px-2 py-2 shadow-[var(--shadow-card)]">
        <div className="max-w-lg mx-auto flex gap-1">
          <TabButton
            active={activeTab === 'template'}
            onClick={() => setActiveTab('template')}
          >
            Template
          </TabButton>
          <TabButton
            active={activeTab === 'quick'}
            onClick={() => setActiveTab('quick')}
          >
            Sessions
          </TabButton>
          <TabButton
            active={activeTab === 'drills'}
            onClick={() => setActiveTab('drills')}
          >
            Drills
          </TabButton>
          <TabButton
            active={activeTab === 'plans'}
            onClick={() => setActiveTab('plans')}
          >
            My Plans
          </TabButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'template' && <PracticeTemplateView />}
        {activeTab === 'quick' && (
          <QuickSessionsView 
            selectedSession={selectedQuickSession}
            setSelectedSession={setSelectedQuickSession}
          />
        )}
        {activeTab === 'drills' && (
          <DrillLibraryView
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDrill={selectedDrill}
            setSelectedDrill={setSelectedDrill}
          />
        )}
        {activeTab === 'plans' && (
          <MyPlansView
            plans={customPlans}
            onNew={() => setEditorPlan(createPlan(90))}
            onEdit={(plan) => setEditorPlan(JSON.parse(JSON.stringify(plan)))}
          />
        )}
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 py-2.5 rounded-[10px] text-[15px] font-medium transition-all ${
        active 
          ? 'bg-[var(--accent)] text-white' 
          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
      }`}
    >
      {children}
    </button>
  );
}

function PracticeTemplateView() {
  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        {/* Intro */}
        <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-6">
          <p className="text-[15px] text-[var(--accent)] font-medium">
            Same structure every practice. Predictable = calm.
          </p>
        </div>

        {/* Total Time */}
        <div className="text-center mb-2">
          <span className="text-[32px] font-bold text-[var(--text-primary)]">90</span>
          <span className="text-[15px] text-[var(--text-muted)] ml-1">minutes</span>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] text-center mb-4">
          Only have 60 minutes? Drop one skill block and shorten the scrimmage to 10 minutes.
        </p>

        {/* Timeline */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
          {PRACTICE_TEMPLATE.blocks.map((block, i) => (
            <div 
              key={i}
              className={`p-4 flex items-center gap-4 ${
                i < PRACTICE_TEMPLATE.blocks.length - 1 ? 'border-b border-[var(--bg-secondary)]' : ''
              }`}
            >
              <div className="w-12 text-center">
                <span className="text-[13px] font-mono text-[var(--accent)]">{block.time}</span>
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-medium text-[var(--text-primary)]">{block.name}</p>
                <p className="text-[13px] text-[var(--text-muted)]">{block.purpose}</p>
              </div>
              <div className="text-[13px] text-[var(--text-secondary)]">
                {block.duration} min
              </div>
            </div>
          ))}
        </div>

        {/* Key Principles */}
        <div className="mt-6">
          <h3 className="text-[13px] font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3 px-1">
            Key Principles
          </h3>
          <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 space-y-3">
            <PrincipleRow text="One new concept per practice" />
            <PrincipleRow text="Two maximum before retention collapses" />
            <PrincipleRow text="New concepts pause before long breaks" />
            <PrincipleRow text="Break weeks revert to fundamentals" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrincipleRow({ text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[var(--accent)]">•</span>
      <span className="text-[15px] text-[var(--text-primary)]">{text}</span>
    </div>
  );
}

function QuickSessionsView({ selectedSession, setSelectedSession }) {
  const printSession = (session) => {
    const drillDetails = session.blocks.map(block => {
      const drill = DRILLS.find(d => d.id === block.drillId);
      return `${block.duration} min - ${drill?.name || block.drillId}\n  ${block.notes}`;
    }).join('\n\n');

    const content = `
${session.name}
${'='.repeat(session.name.length)}
Duration: ${session.duration} minutes
${session.description}

DRILLS:
${drillDetails}
    `.trim();

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Your browser blocked the print window. Allow pop-ups for this site to print.');
      return;
    }
    const safe = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    printWindow.document.write(`<pre style="font-family: system-ui; font-size: 14px; padding: 20px;">${safe}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-6">
          <p className="text-[15px] text-[var(--accent)] font-medium">
            Pre-built sessions for common situations. Tap to expand, print to take to practice.
          </p>
        </div>

        <div className="space-y-3">
          {QUICK_SESSIONS.map(session => (
            <div key={session.id} className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
              <button
                onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                aria-expanded={selectedSession === session.id}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[17px] font-semibold text-[var(--text-primary)]">{session.name}</span>
                    <span className="text-[12px] bg-[var(--accent)] text-white px-2 py-0.5 rounded-full">
                      {session.duration} min
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)]">{session.description}</p>
                </div>
                <svg 
                  className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${selectedSession === session.id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {selectedSession === session.id && (
                <div className="px-4 pb-4 border-t border-[var(--bg-secondary)]">
                  <div className="pt-3 space-y-2">
                    {session.blocks.map((block, i) => {
                      const drill = DRILLS.find(d => d.id === block.drillId);
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-[10px]">
                          <div className="w-12 text-center">
                            <span className="text-[14px] font-bold text-[var(--accent)]">{block.duration}</span>
                            <span className="text-[10px] text-[var(--text-muted)] block">min</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[14px] font-medium text-[var(--text-primary)]">
                              {drill?.name || block.drillId}
                            </p>
                            <p className="text-[12px] text-[var(--text-muted)]">{block.notes}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => printSession(session)}
                    className="w-full mt-4 py-2.5 bg-[var(--accent)] text-white rounded-[10px] text-[14px] font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print This Session
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DrillLibraryView({ selectedCategory, setSelectedCategory, selectedDrill, setSelectedDrill }) {
  const filteredDrills = selectedCategory 
    ? DRILLS.filter(d => d.category === selectedCategory)
    : DRILLS;

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            aria-pressed={!selectedCategory}
            className={`px-3 py-1.5 rounded-[10px] text-[13px] font-medium transition-all whitespace-nowrap ${
              !selectedCategory
                ? 'bg-[var(--accent)] text-white' 
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
            }`}
          >
            All
          </button>
          {DRILL_CATEGORIES.filter(cat => DRILLS.some(d => d.category === cat.id)).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              className={`px-3 py-1.5 rounded-[10px] text-[13px] font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent)] text-white' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Drill Count */}
        <p className="text-[13px] text-[var(--text-muted)] mb-3">
          {filteredDrills.length} drills
        </p>

        {/* Drill List */}
        <div className="space-y-2">
          {filteredDrills.map(drill => (
            <DrillCard 
              key={drill.id} 
              drill={drill}
              isExpanded={selectedDrill === drill.id}
              onToggle={() => setSelectedDrill(selectedDrill === drill.id ? null : drill.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DrillCard({ drill, isExpanded, onToggle }) {
  const category = DRILL_CATEGORIES.find(c => c.id === drill.category);
  const difficulty = DIFFICULTY_LEVELS.find(d => d.id === drill.difficulty);

  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full p-4 text-left flex items-center justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px]">{category?.icon}</span>
            <p className="text-[15px] font-medium text-[var(--text-primary)]">{drill.name}</p>
            {difficulty && (
              <span
                className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                style={{ backgroundColor: difficulty.color, color: difficulty.textColor }}
              >
                {difficulty.label}
              </span>
            )}
          </div>
          <p className="text-[13px] text-[var(--text-muted)]">
            {drill.time} • {drill.players}
          </p>
        </div>
        <svg 
          className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-[var(--bg-secondary)]">
          <div className="pt-3 space-y-4">
            {/* Equipment */}
            {drill.equipment && drill.equipment.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {drill.equipment.map((item, i) => (
                  <span key={i} className="text-[11px] bg-[var(--bg-secondary)] text-[var(--text-secondary)] px-2 py-1 rounded-full">
                    🏀 {item}
                  </span>
                ))}
              </div>
            )}

            <Section title="Setup">
              <p className="text-[15px] text-[var(--text-primary)]">{drill.setup}</p>
            </Section>

            <Section title="How to Run">
              <ol className="space-y-1.5">
                {drill.steps.map((step, i) => (
                  <li key={i} className="text-[15px] text-[var(--text-primary)] flex gap-2">
                    <span className="text-[var(--accent)] font-medium">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </Section>

            <Section title="Coaching Points">
              <ul className="space-y-1">
                {drill.coachingPoints.map((point, i) => (
                  <li key={i} className="text-[15px] text-[var(--text-primary)] flex gap-2">
                    <span className="text-[var(--rating-good)]">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Common Mistakes */}
            {drill.commonMistakes && drill.commonMistakes.length > 0 && (
              <Section title="Watch For (Common Mistakes)">
                <ul className="space-y-1">
                  {drill.commonMistakes.map((mistake, i) => (
                    <li key={i} className="text-[14px] text-[var(--rating-needs-work)] flex gap-2">
                      <span>⚠️</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {drill.progression && (
              <Section title="Make It Harder">
                <p className="text-[15px] text-[var(--accent)]">{drill.progression}</p>
              </Section>
            )}

            {/* Used in Weeks */}
            {drill.usedInWeeks && drill.usedInWeeks.length > 0 && (
              <div className="bg-[var(--accent-light)] rounded-[8px] p-2">
                <p className="text-[11px] text-[var(--accent)]">
                  📅 Used in Season Plan: Week {drill.usedInWeeks.join(', Week ')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-1.5">{title}</p>
      {children}
    </div>
  );
}
