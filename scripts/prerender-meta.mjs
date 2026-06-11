// Post-build: stamp per-route <head> metadata and a small static text fallback
// into copies of dist/index.html, one per route. Netlify serves a real file at
// the exact path before the SPA fallback redirect, so a crawler fetching
// /handbook/season gets that page's title, description, and canonical instead
// of the homepage's. React replaces the static fallback on hydration.
// Keep titles in sync with ROUTE_TITLES in src/App.jsx.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://provablyfairbasketball.com';

const ROUTES = [
  {
    path: '/start',
    title: 'Start Here for New Coaches | Provably Fair Basketball',
    description:
      'A free 5-step path for brand-new youth basketball coaches: mindset, your first practice, fair tryouts, a season plan, and talking with parents. No experience needed.',
    h1: 'Start Here: a 5-step path for brand-new coaches',
    blurb:
      'Asked to coach and not sure where to begin? Work through five short steps (mindset, your first practice, fair tryouts, the season plan, and talking with parents) and you are ready. Free, private, and no basketball background needed.',
  },
  {
    path: '/tryout',
    title: 'Fair Tryout Evaluation Tool | Provably Fair Basketball',
    description:
      'Run a fair, bias-resistant youth basketball tryout. Rate players by jersey number across 6 weighted areas; auto-scored and ranked, with no student names stored.',
    h1: 'Fair Tryout Evaluation',
    blurb:
      'Rate players by jersey number across six weighted areas (Effort, Coachable, Ball Skills, Footwork, Finishing, Teammate). The app scores and ranks for you. No student names are ever stored; a paper sheet links numbers to names.',
  },
  {
    path: '/handbook',
    title: 'Coaching Handbook | Provably Fair Basketball',
    description:
      'A free coaching handbook for youth basketball: a customizable season plan, a practice toolkit with drill library, a complete new-coach guide, and quick reference.',
    h1: 'Coaching Handbook',
    blurb:
      'Everything you need to plan and run a youth basketball season: a customizable season plan, a practice toolkit and drill library, a complete guide for new coaches, and a quick reference for the rating system.',
  },
  {
    path: '/handbook/season',
    title: 'Customizable Season Plan | Provably Fair Basketball',
    description:
      'Lay out your basketball season for any calendar: set the start date, number of weeks, and a movable mid-season break. Every week has a focus and practice plans.',
    h1: 'Customizable Season Plan',
    blurb:
      'Set your own start date, season length, and a movable mid-season break, and every week lays out with a focus, skills, and ready-to-run practice plans. Works for any season window, fall, winter, or spring.',
  },
  {
    path: '/handbook/practice',
    title: 'Practice Toolkit and Drill Library | Provably Fair Basketball',
    description:
      'A 90-minute practice template, ready-to-run quick sessions, and a drill library with difficulty levels, coaching points, and printable plans for youth basketball.',
    h1: 'Practice Toolkit and Drill Library',
    blurb:
      'A repeatable 90-minute practice template, ready-to-run quick sessions for short practices and game days, and a drill library with setup steps, coaching points, common mistakes, and difficulty levels. Everything prints.',
  },
  {
    path: '/handbook/guide',
    title: "New Coach's Guide | Provably Fair Basketball",
    description:
      'Everything a new youth basketball coach needs: mindset, basketball basics in plain language, player development by age, parent email templates, and checklists.',
    h1: "New Coach's Guide",
    blurb:
      'The essentials for a first-time coach: the right mindset, basketball basics in plain language (rules, ball sizes, key terms), age-appropriate player development, common pitfalls, copy-paste parent emails, and checklists.',
  },
  {
    path: '/handbook/reference',
    title: 'Quick Reference | Provably Fair Basketball',
    description:
      'Quick lookups for tryouts and practice: how the rating system works, what to teach in order, the privacy model, FAQ, and a ready statement for your school.',
    h1: 'Quick Reference',
    blurb:
      'Fast answers during tryouts and practice: how the rating works and what the weights mean, what to teach in order, how player privacy is protected, common questions, and a ready-to-send statement for your school.',
  },
];

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const staticBlock = (h1, blurb) =>
  `<div id="root"><div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:640px;margin:0 auto;padding:32px 20px;color:#1D1D1F"><h1 style="font-size:22px;margin:0 0 10px">${esc(h1)}</h1><p style="font-size:15px;line-height:1.55;color:#444;margin:0 0 14px">${esc(blurb)}</p><p style="font-size:13px;color:#888;margin:0">Loading the app...</p></div></div>`;

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
    .replace('<div id="root"></div>', staticBlock(route.h1, route.blurb));

  const file = join('dist', ...route.path.split('/').filter(Boolean), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  console.log(`prerendered ${route.path} -> ${file}`);
}

// Homepage keeps its own head; just add the static fallback for no-JS crawlers.
writeFileSync(
  distIndex,
  base.replace(
    '<div id="root"></div>',
    staticBlock(
      'Provably Fair Basketball',
      'Free, privacy-first tools for youth basketball coaches: fair tryout evaluation by jersey number, a customizable season plan, practice drills, and a complete new-coach guide. No account, no cost, and no student data ever leaves your device.'
    )
  )
);
console.log('stamped static fallback into dist/index.html');
