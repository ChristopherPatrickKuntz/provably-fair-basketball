// Regenerates the README screenshots from the running app with seeded demo
// data, so the images always match the current UI. Drives the locally
// installed Chrome (puppeteer-core, no browser download).
//
//   npm run dev          (in another terminal, or any served build)
//   npm run screenshots  (writes screenshots/*.png)
//
// Override the target with SHOT_BASE, e.g. SHOT_BASE=https://provablyfairbasketball.com
import { mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const BASE = process.env.SHOT_BASE || 'http://localhost:5173';
const OUT = 'screenshots';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const r = (e, c, b, f, fi, t, note = '') =>
  ({ effort: e, coachable: c, ballSkills: b, footwork: f, finishing: fi, teammate: t, note });

// A believable mid-tryout: 12 players, 8 rated so far, mixed coverage.
const DEMO_STATE = {
  version: '1.0',
  activeSessionId: 'session-demo',
  promiseAccepted: true,
  promiseAcceptedAt: '2026-09-08T17:00:00.000Z',
  seasonStartDate: '2026-09-08',
  seasonWeeks: 12,
  seasonBreakAfter: 2,
  seasonBreakWeeks: 2,
  sessions: {
    'session-demo': {
      id: 'session-demo',
      name: 'Sep 8 - 12 players',
      gradeBand: 'middle',
      playerCount: 12,
      createdAt: '2026-09-08T17:00:00.000Z',
      updatedAt: '2026-09-08T18:10:00.000Z',
      status: 'in_progress',
      evaluatorCount: 1,
      ratings: {
        1: r(3, 3, 2, 2, 3, 3, 'Vocal leader, sets the tone on defense.'),
        2: r(3, 2, 3, 3, 2, 2),
        3: r(2, 3, 1, 2, 1, 3),
        4: r(1, 2, 3, 3, 3, 1),
        5: r(3, 3, 1, 1, 1, 3),
        6: r(2, 2, 2, 3, 2, 2),
        7: r(3, 2, 2, 1, 2, 3),
        8: r(2, 1, 1, 2, 1, 2),
        9: { effort: 3, coachable: null, ballSkills: null, footwork: null, finishing: null, teammate: null, note: '' },
        10: { effort: null, coachable: null, ballSkills: null, footwork: null, finishing: null, teammate: null, note: '' },
        11: { effort: null, coachable: null, ballSkills: null, footwork: null, finishing: null, teammate: null, note: '' },
        12: { effort: null, coachable: null, ballSkills: null, footwork: null, finishing: null, teammate: null, note: '' },
      },
    },
  },
  customPlans: {
    'plan-demo': {
      id: 'plan-demo',
      name: 'Tuesday Fundamentals',
      minutes: 90,
      blocks: {
        warmup: { drillId: null, note: 'Shooting flow, get loose' },
        huddle: { drillId: null, note: 'Intro: passing under pressure' },
        skill1: { drillId: 'partner-passing', note: '' },
        game1: { drillId: 'dribble-knockout', note: '' },
        skill2: { drillId: 'form-shooting', note: '' },
        game2: { drillId: '3v3-one-dribble', note: '' },
        scrimmage: { drillId: null, note: "5v5, reinforce the day's focus" },
        close: { drillId: null, note: 'Huddle, takeaway, positive note' },
      },
      createdAt: '2026-09-01T17:00:00.000Z',
      updatedAt: '2026-09-08T17:00:00.000Z',
    },
  },
  weekPlans: {},
};

const SHOTS = [
  { file: 'home.png', path: '/' },
  { file: 'start-here.png', path: '/start' },
  {
    file: 'evaluate.png',
    path: '/tryout/evaluate',
    // The saved note autofocuses and scrolls the list; show the top (player
    // grid + first rating cards), which is the signature of the tool.
    after: async (page) => {
      await page.evaluate(() => {
        document.activeElement?.blur();
        document.querySelector('.overflow-y-auto')?.scrollTo(0, 0);
        window.scrollTo(0, 0);
      });
      await new Promise((res) => setTimeout(res, 300));
    },
  },
  { file: 'results.png', path: '/tryout/results' },
  { file: 'season.png', path: '/handbook/season' },
  {
    file: 'plan-builder.png',
    path: '/handbook/practice?tab=plans',
    // Open the saved plan in the editor so the shot shows the builder itself.
    after: async (page) => {
      await page.evaluate(() => {
        const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Edit');
        if (btn) btn.click();
      });
      await new Promise((res) => setTimeout(res, 500));
    },
  },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });

// Same-origin visit first so localStorage can be seeded before the app boots.
await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.evaluate((state) => {
  localStorage.setItem('provablyFairBasketball', JSON.stringify(state));
}, DEMO_STATE);

mkdirSync(OUT, { recursive: true });
for (const shot of SHOTS) {
  await page.goto(`${BASE}${shot.path}`, { waitUntil: 'networkidle0' });
  await new Promise((res) => setTimeout(res, 600));
  if (shot.after) await shot.after(page);
  await page.screenshot({ path: `${OUT}/${shot.file}` });
  console.log(`captured ${OUT}/${shot.file}`);
}

await browser.close();
