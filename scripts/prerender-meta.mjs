// Post-build prerendering. For each route this stamps per-route <head> metadata
// AND full static content into a copy of dist/index.html, so crawlers and AI
// engines that do not run JavaScript see the real material (guide, drills,
// season, FAQ), not an empty div. The content is imported straight from the
// app's own data modules, so it can never drift from what the app shows.
// React replaces the static block the moment it hydrates.
// Keep titles in sync with ROUTE_TITLES in src/App.jsx.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
  NEW_COACH_GUIDE,
  BASKETBALL_RULES_BASICS,
  LTAD_STAGES,
  COACHING_TRAPS,
  GOOD_TO_KNOW,
  FAQ,
} from '../src/data/coachingResources.js';
import { DRILLS, DRILL_CATEGORIES, PRACTICE_TEMPLATE, QUICK_SESSIONS } from '../src/data/drills.js';
import { SEASON_PHASES } from '../src/data/seasonPlan.js';
import { DOMAINS } from '../src/data/domains.js';

const SITE = 'https://provablyfairbasketball.com';

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
const ol = (items) => `<ol>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>`;

// ---------- per-route static content, built from the app's real data ----------

function homeContent() {
  return `
    <h2>What you get</h2>
    ${ul([
      'Fair tryout evaluation: rate players by jersey number across 6 weighted areas, auto-scored and ranked',
      'A customizable season plan: set your start date, season length, and a movable mid-season break',
      'A practice toolkit: a 90-minute template, ready-to-run quick sessions, a full drill library, and a builder to create and save your own practice plans',
      'A complete new-coach guide: mindset, basketball basics in plain language, player development by age, parent email templates, and checklists',
      'Everything prints, works offline, and is free with no account',
    ])}
    <h2>Privacy by design</h2>
    ${ul([
      'No student names in the app, jersey numbers only',
      'A paper attendance sheet is the only link between names and numbers',
      'No accounts, no cloud, no tracking; all data stays on the coach’s own device',
    ])}
    <p><a href="/start">Start Here for new coaches</a> &middot; <a href="/tryout">Tryout evaluation</a> &middot; <a href="/handbook">Coaching handbook</a></p>`;
}

function startContent() {
  const steps = [
    ['Get the mindset', 'The one thing that matters most is how you treat the kids. Read this first, the rest is easier after it.'],
    ['Plan your first practice', 'A ready-made 90-minute plan so day one runs smoothly, even if you have never coached.'],
    ['Run a fair tryout', 'Rate players by number across 6 simple things. The app scores and ranks them for you.'],
    ['Follow the season plan', 'A full season laid out for you, with what to work on each week and a plan for every practice.'],
    ['Talk with parents', 'Copy-paste messages for the common conversations, from the welcome email to tough ones.'],
  ];
  return `
    <h2>The five steps</h2>
    <ol>${steps.map(([t, d]) => `<li><strong>${esc(t)}.</strong> ${esc(d)}</li>`).join('')}</ol>
    <p>That is the whole job. Everything is free, private, and stays on your device.</p>
    <p><a href="/handbook">Open the coaching handbook</a> &middot; <a href="/tryout">Go to the tryout tool</a></p>`;
}

function tryoutContent() {
  return `
    <h2>The 6 areas you rate</h2>
    ${ul(DOMAINS.map((d) => `${d.name} (weight ${d.weight}x): ${d.helper.replace(/ • /g, ', ')}`))}
    <p>Effort is weighted equal to all three skill areas combined, so an all-out kid who is still raw ranks alongside a polished kid who coasts. Character (Coachable, Teammate) counts more than raw skill at this age.</p>
    <h2>The rating scale</h2>
    ${ul([
      'Skip: you did not get to see this, so do not guess',
      'Needs Work: below what is typical for this age',
      'OK: about what you would expect',
      'Good: stands out, ready for more',
    ])}
    <h2>Why it is fair</h2>
    ${ul([
      'Players are rated by jersey number; no names ever enter the app',
      'Every player is judged on the same observable criteria',
      'Players rated on fewer than 4 of the 6 areas are flagged and never ranked above fully evaluated players',
      'Results print and copy in the same fairness order the screen shows',
    ])}`;
}

function handbookContent() {
  return `
    <h2>Inside the handbook</h2>
    ${ul([
      'Season Plan: weekly focus, practice plans, and league rules, on a schedule you set',
      'Practice Toolkit: 90-minute template, drill library, quick sessions, and your own saved plans',
      "Coach's Guide: mindset, age-appropriate development, common traps, templates, and checklists",
      'Quick Reference: the 6 things you rate, the rating scale, coaching philosophy, and FAQ',
    ])}
    <p><a href="/handbook/season">Season plan</a> &middot; <a href="/handbook/practice">Practice toolkit</a> &middot; <a href="/handbook/guide">New coach&#39;s guide</a> &middot; <a href="/handbook/reference">Quick reference</a></p>`;
}

function seasonContent() {
  const weeks = SEASON_PHASES.filter((p) => !p.isBreak).flatMap((p) => p.weeks || []);
  return `
    <p>Set your own start date, number of practice weeks, and a movable mid-season break; every week date and the season end compute from your start, for any month or season.</p>
    <h2>The week-by-week curriculum</h2>
    ${weeks
      .map(
        (w) =>
          `<h3>${esc(w.name)}</h3><p>"${esc(w.language)}"${w.skills?.length ? ` &middot; Skills: ${esc(w.skills.join(', '))}` : ''}</p>`
      )
      .join('')}
    <p><a href="/handbook/practice">Browse the drill library and build your own practice plans</a></p>`;
}

function practiceContent() {
  const catName = (id) => DRILL_CATEGORIES.find((c) => c.id === id)?.name || id;
  return `
    <h2>The 90-minute practice template</h2>
    ${ul(PRACTICE_TEMPLATE.blocks.map((b) => `${b.time} ${b.name} (${b.duration} min): ${b.purpose}`))}
    <p>Same structure every practice. Predictable = calm. Only have 60 minutes? Drop one skill block and shorten the scrimmage.</p>
    <h2>Ready-to-run quick sessions</h2>
    ${ul(QUICK_SESSIONS.map((s) => `${s.name} (${s.duration} min): ${s.description}`))}
    <h2>The drill library</h2>
    ${DRILLS.map(
      (d) => `
      <h3>${esc(d.name)}</h3>
      <p>${esc(catName(d.category))} &middot; ${esc(d.time)} &middot; ${esc(d.players)}${d.difficulty ? ` &middot; ${esc(d.difficulty)}` : ''}</p>
      <p><strong>Setup:</strong> ${esc(d.setup)}</p>
      ${ol(d.steps)}
      <p><strong>Coaching points:</strong> ${esc(d.coachingPoints.join('; '))}</p>
      ${d.progression ? `<p><strong>Make it harder:</strong> ${esc(d.progression)}</p>` : ''}`
    ).join('')}`;
}

function guideContent() {
  const sections = NEW_COACH_GUIDE.sections
    .map(
      (s) => `
      <h2>${esc(s.title)}</h2>
      ${s.content
        .map(
          (item) =>
            `<h3>${esc(item.heading)}</h3>${item.text ? `<p>${esc(item.text)}</p>` : ''}${item.bullets ? ul(item.bullets) : ''}`
        )
        .join('')}`
    )
    .join('');
  const rules = BASKETBALL_RULES_BASICS.sections
    .map((s) => `<h3>${esc(s.name)}</h3>${ul(s.rules)}`)
    .join('');
  const ltad = LTAD_STAGES.map(
    (s) => `<h3>${esc(s.name)} (ages ${esc(s.ages)})</h3><p>Focus: ${esc(s.focus)}</p>${ul(s.keyPoints)}`
  ).join('');
  const traps = COACHING_TRAPS.map(
    (t) => `<h3>${esc(t.title)}</h3><p><strong>The trap:</strong> ${esc(t.trap)}</p><p>${esc(t.reality)}</p>`
  ).join('');
  const tips = GOOD_TO_KNOW.map((t) => `<h3>${esc(t.title)}</h3><p>${esc(t.content)}</p>`).join('');
  return `
    ${sections}
    <h2>Basketball basics, in plain language</h2>
    ${rules}
    <h2>Player development by age (LTAD)</h2>
    ${ltad}
    <h2>Common coaching traps</h2>
    ${traps}
    <h2>Good to know</h2>
    ${tips}`;
}

function referenceContent() {
  const domains = DOMAINS.map(
    (d) =>
      `<h3>${esc(d.name)} (weight ${d.weight}x)</h3><p>${esc(d.helper.replace(/ • /g, ', '))}. ${esc(d.philosophy)}.</p><p><strong>Look for:</strong> ${esc(d.lookFor.join('; '))}</p>`
  ).join('');
  const faq = FAQ.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('');
  return `
    <h2>The 6 things you rate</h2>
    ${domains}
    <h2>The rating scale</h2>
    ${ul([
      'Skip: you did not get to see this, so do not guess',
      'Needs Work: below what is typical for this age',
      'OK: about what you would expect',
      'Good: stands out, ready for more',
    ])}
    <h2>Frequently asked questions</h2>
    ${faq}`;
}

// ---------- routes ----------

const ROUTES = [
  {
    path: '/start',
    title: 'Start Here for New Coaches | Provably Fair Basketball',
    description:
      'A free 5-step path for brand-new youth basketball coaches: mindset, your first practice, fair tryouts, a season plan, and talking with parents. No experience needed.',
    h1: 'Start Here: a 5-step path for brand-new coaches',
    blurb:
      'Asked to coach and not sure where to begin? Work through five short steps (mindset, your first practice, fair tryouts, the season plan, and talking with parents) and you are ready. Free, private, and no basketball background needed.',
    content: startContent,
  },
  {
    path: '/tryout',
    title: 'Fair Tryout Evaluation Tool | Provably Fair Basketball',
    description:
      'Run a fair, bias-resistant youth basketball tryout. Rate players by jersey number across 6 weighted areas; auto-scored and ranked, with no student names stored.',
    h1: 'Fair Tryout Evaluation',
    blurb:
      'Rate players by jersey number across six weighted areas (Effort, Coachable, Ball Skills, Footwork, Finishing, Teammate). The app scores and ranks for you. No student names are ever stored; a paper sheet links numbers to names.',
    content: tryoutContent,
  },
  {
    path: '/handbook',
    title: 'Coaching Handbook | Provably Fair Basketball',
    description:
      'A free coaching handbook for youth basketball: a customizable season plan, a practice toolkit with drill library, a complete new-coach guide, and quick reference.',
    h1: 'Coaching Handbook',
    blurb:
      'Everything you need to plan and run a youth basketball season: a customizable season plan, a practice toolkit and drill library, a complete guide for new coaches, and a quick reference for the rating system.',
    content: handbookContent,
  },
  {
    path: '/handbook/season',
    title: 'Customizable Season Plan | Provably Fair Basketball',
    description:
      'Lay out your basketball season for any calendar: set the start date, number of weeks, and a movable mid-season break. Every week has a focus and practice plans.',
    h1: 'Customizable Season Plan',
    blurb:
      'Set your own start date, season length, and a movable mid-season break, and every week lays out with a focus, skills, and ready-to-run practice plans. Works for any season window, fall, winter, or spring.',
    content: seasonContent,
  },
  {
    path: '/handbook/practice',
    title: 'Practice Toolkit and Drill Library | Provably Fair Basketball',
    description:
      'A 90-minute practice template, ready-to-run quick sessions, a full drill library, and a builder to create, save, and print your own practice plans.',
    h1: 'Practice Toolkit and Drill Library',
    blurb:
      'A repeatable 90-minute practice template, ready-to-run quick sessions, and a drill library with setup steps, coaching points, and difficulty levels. Build and save your own practice plans from the template, print them, and use them across your season. Everything stays on your device.',
    content: practiceContent,
  },
  {
    path: '/handbook/guide',
    title: "New Coach's Guide | Provably Fair Basketball",
    description:
      'Everything a new youth basketball coach needs: mindset, basketball basics in plain language, player development by age, parent email templates, and checklists.',
    h1: "New Coach's Guide",
    blurb:
      'The essentials for a first-time coach: the right mindset, basketball basics in plain language (rules, ball sizes, key terms), age-appropriate player development, common pitfalls, copy-paste parent emails, and checklists.',
    content: guideContent,
  },
  {
    path: '/handbook/reference',
    title: 'Quick Reference | Provably Fair Basketball',
    description:
      'Quick lookups for tryouts and practice: how the rating system works, what to teach in order, the privacy model, FAQ, and a ready statement for your school.',
    h1: 'Quick Reference',
    blurb:
      'Fast answers during tryouts and practice: how the rating works and what the weights mean, what to teach in order, how player privacy is protected, common questions, and a ready-to-send statement for your school.',
    content: referenceContent,
  },
];

const STATIC_STYLE =
  '<style>#root .pfb-static{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:720px;margin:0 auto;padding:32px 20px;color:#1D1D1F;line-height:1.55}#root .pfb-static h1{font-size:24px;margin:0 0 10px}#root .pfb-static h2{font-size:18px;margin:24px 0 8px}#root .pfb-static h3{font-size:15px;margin:16px 0 4px}#root .pfb-static p{font-size:14px;color:#3a3a3c;margin:0 0 10px}#root .pfb-static li{font-size:14px;color:#3a3a3c;margin:0 0 4px}#root .pfb-static a{color:#0062C9}</style>';

const staticBlock = (h1, blurb, contentHtml = '') =>
  `<div id="root">${STATIC_STYLE}<div class="pfb-static"><h1>${esc(h1)}</h1><p>${esc(blurb)}</p>${contentHtml}<p style="color:#888;font-size:12px;margin-top:28px">This is the text overview. The interactive app loads in any modern browser, works offline, and keeps all data on your device.</p></div></div>`;

const distIndex = join('dist', 'index.html');
const base = readFileSync(distIndex, 'utf8');

for (const route of ROUTES) {
  const url = `${SITE}${route.path}`;
  const out = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    // The WebApplication + FAQPage structured data belongs on the homepage only;
    // duplicating the same FAQPage on every URL reads as markup spam.
    .replace(/\n\s*<!-- Structured data -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
    .replace('<div id="root"></div>', staticBlock(route.h1, route.blurb, route.content ? route.content() : ''));

  // Write both forms: <route>.html serves the exact non-slash URL (matching the
  // sitemap and canonical) with a direct 200, and <route>/index.html covers
  // trailing-slash requests. Netlify checks path.html before path/index.html.
  const parts = route.path.split('/').filter(Boolean);
  const flatFile = join('dist', ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`);
  const dirFile = join('dist', ...parts, 'index.html');
  mkdirSync(dirname(dirFile), { recursive: true });
  writeFileSync(flatFile, out);
  writeFileSync(dirFile, out);
  console.log(`prerendered ${route.path} -> ${flatFile} + ${dirFile}`);
}

// Homepage keeps its own head; add the static overview for no-JS crawlers.
writeFileSync(
  distIndex,
  base.replace(
    '<div id="root"></div>',
    staticBlock(
      'Provably Fair Basketball',
      'Free, privacy-first tools for youth basketball coaches: fair tryout evaluation by jersey number, a customizable season plan, practice drills, and a complete new-coach guide. No account, no cost, and no student data ever leaves your device.',
      homeContent()
    )
  )
);
console.log('stamped static content into dist/index.html');
