# Provably Fair Basketball

A free, privacy-first toolkit for youth basketball coaches, built especially for the parent or teacher who gets pulled in to coach with no basketball background. It covers fair tryout evaluation, a customizable season plan, practice resources, and parent communication.

**Live tool:** https://provablyfairbasketball.com/

It works offline and installs like an app (PWA).

---

## Screenshots

> Note: these reflect an earlier version of the interface and will be refreshed.

<p align="center">
  <img src="screenshots/home.jpg" width="250" alt="Home Screen" />
  <img src="screenshots/tryout-setup.jpg" width="250" alt="Tryout Setup" />
  <img src="screenshots/evaluate.jpg" width="250" alt="Player Evaluation" />
</p>

---

## Why This Exists

I built this for my kids' school in Moose Jaw to reduce the overwhelm of becoming a coach and to make tryouts more structured, transparent, and student-protective. I am sharing it publicly in case it helps other coaches and schools. The local examples are kept as a starting point; everything (dates, schedule, league rules) is meant to be adapted to your town.

---

## What It Includes

- **Start Here**, a 5-step guided path for brand-new coaches (mindset, first practice, tryouts, season plan, talking with parents). No basketball background needed.
- **Tryout Evaluation**, rate players by jersey number across 6 weighted areas (Effort, Coachable, Ball Skills, Footwork, Finishing, Teammate). Auto-scored and ranked, with partial-coverage flagging so a one-domain score cannot outrank a fully rated player. Numbers only, no student names stored.
- **Customizable Season Plan**, set your start date, number of weeks, and a movable or removable mid-season break. Every week date and the season end compute from your start, for any month or season.
- **Practice Toolkit**, a 90-minute template (with a 60-minute option), a drill library, and ready-to-run quick sessions. Practice plans are printable.
- **Coaching Handbook**, a complete new-coach guide: the essentials, basketball basics with a plain-English glossary, age-appropriate development (LTAD), common pitfalls, parent email templates, and checklists.
- **Printable Attendance Sheet**, the paper-only link between names and jersey numbers.
- **Tryout Agenda PDF**, a structured tryout flow covering all skill areas.
- **School Statement Template**, a ready-to-send note for principals and athletic directors.
- **FAQ**, answers for coaches, parents, and administrators.

---

## Privacy Model

This tool was designed with student privacy as a core constraint (EdTech compliance):

- **No student names** are entered into the app
- **Data stays on your device** (browser localStorage only) and is wiped if you clear your browser, by design
- **No accounts, no cloud storage, no external database, no tracking**
- **Paper attendance sheet** is the only place names and numbers are linked

The coach controls the app. The school controls the paper.

---

## Tech Stack

- React + Vite
- React Router
- Tailwind CSS
- Offline PWA (vite-plugin-pwa service worker)
- Deployed on Netlify

---

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

---

## Repo Status

This repository mirrors the deployed tool at https://provablyfairbasketball.com/.

- **Issues:** Enabled for bug reports only
- **Pull requests:** Not currently accepted
- **Feature requests:** Not accepted at this time

---

## License

MIT
