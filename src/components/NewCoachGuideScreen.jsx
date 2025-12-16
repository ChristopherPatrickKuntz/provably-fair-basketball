import { useState } from 'react';
import { Header } from './Header';
import { 
  NEW_COACH_GUIDE, 
  LTAD_STAGES, 
  PARENT_TEMPLATES, 
  CHECKLISTS,
  BASKETBALL_RULES_BASICS,
  MOTIVATIONAL_QUOTES,
  HELPFUL_LINKS,
  GOOD_TO_KNOW,
  PRINT_ATTENDANCE_SHEET,
  COACHING_TRAPS,
  PROGRESSION_GUIDES
} from '../data/coachingResources';

export function NewCoachGuideScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('guide');
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <Header 
        title="Coach's Guide" 
        leftAction={onBack}
        leftLabel="← Back"
      />

      {/* Tab Bar */}
      <div className="bg-[var(--bg-card)] px-2 py-2 shadow-[var(--shadow-card)] overflow-x-auto">
        <div className="max-w-lg mx-auto flex gap-1 min-w-max">
          {[
            { id: 'guide', label: 'Guide' },
            { id: 'traps', label: '⚠️ Traps' },
            { id: 'ltad', label: 'Development' },
            { id: 'templates', label: 'Templates' },
            { id: 'checklists', label: 'Checklists' },
            { id: 'links', label: 'Links' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-[8px] text-[13px] font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'guide' && (
          <GuideTab 
            expandedSection={expandedSection} 
            setExpandedSection={setExpandedSection} 
          />
        )}
        {activeTab === 'traps' && <TrapsTab />}
        {activeTab === 'ltad' && <LTADTab />}
        {activeTab === 'templates' && <TemplatesTab />}
        {activeTab === 'checklists' && <ChecklistsTab />}
        {activeTab === 'links' && <LinksTab />}
      </div>
    </div>
  );
}

function GuideTab({ expandedSection, setExpandedSection }) {
  // Random motivational quote
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        {/* Welcome */}
        <div className="bg-[var(--accent)] rounded-[var(--radius)] p-5 mb-6 text-center">
          <h1 className="text-[22px] font-bold text-white mb-1">{NEW_COACH_GUIDE.title}</h1>
          <p className="text-[14px] text-white/80">{NEW_COACH_GUIDE.subtitle}</p>
        </div>

        {/* Quote of the Day */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 mb-6">
          <p className="text-[14px] text-[var(--text-primary)] italic mb-2">"{quote.quote}"</p>
          <p className="text-[12px] text-[var(--accent)] font-medium">— {quote.author}</p>
        </div>

        {/* Sections */}
        <div className="space-y-2">
          {NEW_COACH_GUIDE.sections.map(section => (
            <GuideSection
              key={section.id}
              section={section}
              isExpanded={expandedSection === section.id}
              onToggle={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            />
          ))}
        </div>

        {/* Sources */}
        <div className="mt-6 p-4 bg-[var(--bg-secondary)] rounded-[var(--radius)]">
          <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-2">Sources</p>
          <p className="text-[12px] text-[var(--text-secondary)]">
            Canada Basketball LTAD • USA Basketball Youth Guidelines • Positive Coaching Alliance • 
            NCCP Coaching Certification • Parachute Canada • Sports Psychology Research
          </p>
        </div>
      </div>
    </div>
  );
}

function GuideSection({ section, isExpanded, onToggle }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{section.icon}</span>
          <span className="text-[16px] font-semibold text-[var(--text-primary)]">{section.title}</span>
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
          <div className="pt-4 space-y-4">
            {section.content.map((item, i) => (
              <ContentItem key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentItem({ item }) {
  return (
    <div>
      <h4 className="text-[14px] font-semibold text-[var(--text-primary)] mb-1">{item.heading}</h4>
      {item.text && (
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
      )}
      {item.bullets && (
        <ul className="space-y-1 mt-2">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="text-[13px] text-[var(--text-secondary)] flex items-start gap-2">
              <span className="text-[var(--accent)] mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {item.source && (
        <p className="text-[11px] text-[var(--accent)] mt-2 italic">Source: {item.source}</p>
      )}
    </div>
  );
}

function LTADTab() {
  const [selectedStage, setSelectedStage] = useState('learn-to-train');

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        {/* Intro */}
        <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-6">
          <h2 className="text-[15px] font-semibold text-[var(--accent)] mb-1">Long-Term Athlete Development</h2>
          <p className="text-[13px] text-[var(--text-secondary)]">
            The LTAD model from Canada Basketball helps coaches understand that children develop at different rates. 
            Focus on the developmental stage, not just the age.
          </p>
        </div>

        {/* Stage Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {LTAD_STAGES.map(stage => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`px-3 py-2 rounded-[10px] text-[12px] font-medium whitespace-nowrap transition-all ${
                selectedStage === stage.id 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'bg-[var(--bg-card)] shadow-[var(--shadow-card)] text-[var(--text-secondary)]'
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        {/* Selected Stage Details */}
        {LTAD_STAGES.filter(s => s.id === selectedStage).map(stage => (
          <div key={stage.id} className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
            <div className="bg-[var(--accent)] p-4">
              <h3 className="text-[18px] font-bold text-white">{stage.name}</h3>
              <p className="text-[14px] text-white/80">Ages {stage.ages}</p>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-1">Focus</p>
                <p className="text-[15px] text-[var(--text-primary)] font-medium">{stage.focus}</p>
              </div>

              <div>
                <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-2">Key Points</p>
                <ul className="space-y-1.5">
                  {stage.keyPoints.map((point, i) => (
                    <li key={i} className="text-[13px] text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--rating-good)]">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {stage.basketballFocus && (
                <div>
                  <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wide mb-2">Basketball Focus</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.basketballFocus.map((item, i) => (
                      <span 
                        key={i}
                        className="text-[12px] bg-[var(--accent-light)] text-[var(--accent)] px-2.5 py-1 rounded-[6px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <p className="text-[11px] text-[var(--text-muted)] text-center mt-4">
          Based on Canada Basketball Long-Term Athlete Development Framework
        </p>
      </div>
    </div>
  );
}

function TemplatesTab() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const templates = Object.entries(PARENT_TEMPLATES);

  const copyTemplate = (body) => {
    navigator.clipboard.writeText(body);
  };

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-6">
          <p className="text-[14px] text-[var(--accent)] font-medium">
            Ready-to-use email templates. Tap to view, copy, and customize.
          </p>
        </div>

        <div className="space-y-2">
          {templates.map(([key, template]) => (
            <div key={key} className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
              <button
                onClick={() => setSelectedTemplate(selectedTemplate === key ? null : key)}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div>
                  <p className="text-[15px] font-medium text-[var(--text-primary)]">{template.title}</p>
                  <p className="text-[12px] text-[var(--text-muted)]">{template.subject}</p>
                </div>
                <svg 
                  className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${selectedTemplate === key ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {selectedTemplate === key && (
                <div className="px-4 pb-4 border-t border-[var(--bg-secondary)]">
                  <div className="pt-3">
                    <pre className="text-[12px] text-[var(--text-secondary)] whitespace-pre-wrap font-sans leading-relaxed bg-[var(--bg-secondary)] rounded-[10px] p-3 max-h-64 overflow-y-auto">
                      {template.body}
                    </pre>
                    <button
                      onClick={() => copyTemplate(template.body)}
                      className="w-full mt-3 py-2.5 bg-[var(--accent)] text-white rounded-[10px] text-[14px] font-medium"
                    >
                      Copy Template
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChecklistsTab() {
  const [selectedChecklist, setSelectedChecklist] = useState('preSeasonCoach');
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (checklistId, index) => {
    const key = `${checklistId}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checklist = CHECKLISTS[selectedChecklist];
  const checklistProgress = checklist.items.filter((_, i) => 
    checkedItems[`${selectedChecklist}-${i}`]
  ).length;

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        {/* Checklist Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {Object.entries(CHECKLISTS).map(([key, list]) => (
            <button
              key={key}
              onClick={() => setSelectedChecklist(key)}
              className={`px-3 py-2 rounded-[10px] text-[12px] font-medium whitespace-nowrap transition-all ${
                selectedChecklist === key 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'bg-[var(--bg-card)] shadow-[var(--shadow-card)] text-[var(--text-secondary)]'
              }`}
            >
              {list.title.replace(' Checklist', '')}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-semibold text-[var(--text-primary)]">{checklist.title}</span>
            <span className="text-[13px] text-[var(--accent)] font-medium">
              {checklistProgress}/{checklist.items.length}
            </span>
          </div>
          <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${(checklistProgress / checklist.items.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="space-y-1">
          {checklist.items.map((item, i) => {
            const isChecked = checkedItems[`${selectedChecklist}-${i}`];
            return (
              <button
                key={i}
                onClick={() => toggleItem(selectedChecklist, i)}
                className={`w-full text-left p-3 rounded-[10px] flex items-center gap-3 transition-all ${
                  isChecked 
                    ? 'bg-[var(--rating-good)]/10' 
                    : 'bg-[var(--bg-card)] shadow-[var(--shadow-card)]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isChecked 
                    ? 'border-[var(--rating-good)] bg-[var(--rating-good)]' 
                    : 'border-[var(--text-muted)]'
                }`}>
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className={`text-[14px] ${isChecked ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                    {item.task}
                  </span>
                  {item.timing && (
                    <span className="text-[11px] text-[var(--text-muted)] ml-2">({item.timing})</span>
                  )}
                </div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase px-2 py-0.5 bg-[var(--bg-secondary)] rounded">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TrapsTab() {
  const [expandedTrap, setExpandedTrap] = useState(null);

  const severityColors = {
    critical: 'bg-[#FF3B30] text-white',
    high: 'bg-[#FF9500] text-white',
    medium: 'bg-[#FFCC00] text-black'
  };

  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        {/* Warning Header */}
        <div className="bg-[#FF3B30] rounded-[var(--radius)] p-4 mb-6 text-center">
          <h2 className="text-[18px] font-bold text-white mb-1">⚠️ Coaching Traps & Mistakes</h2>
          <p className="text-[13px] text-white/90">
            Common pitfalls that hurt player development. Read these BEFORE your season starts.
          </p>
        </div>

        {/* Critical Warning: Read & React */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden mb-4 border-2 border-[#FF3B30]">
          <div className="bg-[#FF3B30] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <h3 className="text-[16px] font-bold text-white">The Read & React Trap</h3>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-[14px] text-[var(--text-primary)] font-medium">
              Teaching Read & React in weeks instead of years.
            </p>
            <p className="text-[13px] text-[var(--text-secondary)]">
              Read & React has 17+ layers. It takes <strong>2-3 YEARS</strong> to install properly. 
              Coaches see the DVD, get excited, and try to teach everything in a month. Kids get overwhelmed and execute nothing well.
            </p>
            
            <div className="bg-[var(--accent-light)] rounded-[10px] p-3">
              <p className="text-[12px] text-[var(--accent)] font-semibold mb-2">THE RIGHT WAY:</p>
              <ul className="space-y-1">
                <li className="text-[12px] text-[var(--text-secondary)]">• <strong>Year 1:</strong> Pass & Cut only</li>
                <li className="text-[12px] text-[var(--text-secondary)]">• <strong>Year 2:</strong> Add Dribble-At</li>
                <li className="text-[12px] text-[var(--text-secondary)]">• <strong>Year 3:</strong> Add Screen actions</li>
                <li className="text-[12px] text-[var(--text-secondary)]">• <strong>Single season?</strong> Just do Pass & Cut. That's it.</li>
              </ul>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] italic">
              "If you try to teach everything, you teach nothing." — Rick Torbett
            </p>
          </div>
        </div>

        {/* Season Progression */}
        <div className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4 mb-4">
          <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-3">📈 Offense: Week-by-Week</h3>
          <div className="space-y-2">
            {PROGRESSION_GUIDES.offensiveProgression.weeks.map((week, i) => (
              <div key={i} className="flex items-start gap-3 p-2 bg-[var(--bg-secondary)] rounded-[8px]">
                <span className="text-[11px] font-bold text-[var(--accent)] whitespace-nowrap">W{week.week}</span>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-[var(--text-primary)]">{week.focus}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">{week.concept}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Traps */}
        <h3 className="text-[13px] font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3 px-1">
          More Common Traps
        </h3>
        <div className="space-y-2">
          {COACHING_TRAPS.filter(t => t.id !== 'read-react-rush').map(trap => (
            <div key={trap.id} className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
              <button
                onClick={() => setExpandedTrap(expandedTrap === trap.id ? null : trap.id)}
                className="w-full p-4 text-left flex items-center gap-3"
              >
                <span className="text-xl">{trap.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[var(--text-primary)]">{trap.title}</span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${severityColors[trap.severity]}`}>
                      {trap.severity}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{trap.trap}</p>
                </div>
                <svg 
                  className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${expandedTrap === trap.id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedTrap === trap.id && (
                <div className="px-4 pb-4 border-t border-[var(--bg-secondary)]">
                  <div className="pt-3 space-y-3">
                    <div>
                      <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">The Reality</p>
                      <p className="text-[13px] text-[var(--text-secondary)]">{trap.reality}</p>
                    </div>
                    
                    <div>
                      <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-1">The Solution</p>
                      <ul className="space-y-1">
                        {trap.solution.map((s, i) => (
                          <li key={i} className="text-[12px] text-[var(--text-secondary)] flex gap-2">
                            <span className="text-[var(--rating-good)]">✓</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-[11px] text-[var(--accent)] italic bg-[var(--accent-light)] p-2 rounded-[8px]">
                      {trap.quote}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LinksTab() {
  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-6">
          <h2 className="text-[15px] font-semibold text-[var(--accent)] mb-1">Helpful Links & Resources</h2>
          <p className="text-[13px] text-[var(--text-secondary)]">
            Curated links to official organizations, coaching education, and essential resources.
          </p>
        </div>

        <div className="space-y-4">
          {HELPFUL_LINKS.categories.map((category, i) => (
            <div key={i} className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
              <div className="bg-[var(--bg-secondary)] px-4 py-2 flex items-center gap-2">
                <span>{category.icon}</span>
                <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">{category.name}</h3>
              </div>
              <div className="p-3 space-y-2">
                {category.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-[var(--bg-secondary)] rounded-[10px] hover:bg-[var(--accent-light)] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[14px] font-medium text-[var(--accent)]">{link.name}</span>
                      <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-[12px] text-[var(--text-muted)]">{link.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function TipsTab() {
  return (
    <div className="px-4 py-5">
      <div className="max-w-lg mx-auto">
        <div className="bg-[var(--accent-light)] rounded-[var(--radius)] p-4 mb-6">
          <h2 className="text-[15px] font-semibold text-[var(--accent)] mb-1">Good to Know</h2>
          <p className="text-[13px] text-[var(--text-secondary)]">
            Research-backed insights that will make you a better coach.
          </p>
        </div>

        <div className="space-y-3">
          {GOOD_TO_KNOW.map((tip, i) => (
            <div key={i} className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] p-4">
              <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">{tip.title}</h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-2">{tip.content}</p>
              <p className="text-[11px] text-[var(--accent)] italic">Source: {tip.source}</p>
            </div>
          ))}
        </div>

        {/* Rules Quick Reference */}
        <div className="mt-6">
          <h3 className="text-[13px] font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3 px-1">
            Rules Quick Reference
          </h3>
          <div className="space-y-3">
            {BASKETBALL_RULES_BASICS.sections.slice(0, 3).map((section, i) => (
              <div key={i} className="bg-[var(--bg-card)] rounded-[var(--radius)] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="bg-[var(--bg-secondary)] px-4 py-2">
                  <h4 className="text-[13px] font-semibold text-[var(--text-primary)]">{section.name}</h4>
                </div>
                <div className="p-3">
                  <ul className="space-y-1">
                    {section.rules.slice(0, 4).map((rule, j) => (
                      <li key={j} className="text-[12px] text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
