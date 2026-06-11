import { sortByScore } from './scoring';

export function generateExportText(session, ratings) {
  const date = new Date(session.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Match the on-screen fairness order: players rated on 4+ domains rank first,
  // then partial-coverage players, then unrated. A thinly-rated player must not
  // appear ranked above a fully-evaluated one in the kept/printed report.
  const sorted = sortByScore(ratings);
  const ranked = sorted.filter((p) => p.score !== null && p.domainsRated >= 4);
  const partial = sorted.filter((p) => p.score !== null && p.domainsRated < 4);
  const unrated = sorted.filter((p) => p.score === null);
  const ordered = [...ranked, ...partial, ...unrated];

  let output = `TRYOUT EVALUATION SUMMARY
========================
Date: ${date}
Grade Band: ${session.gradeBand === 'middle' ? 'Middle School (6-8)' : 'High School (9-12)'}
Players: ${session.playerCount}

#    EFF  COA  BAL  FTW  FIN  TEM   SCORE
───────────────────────────────────────────
`;

  for (const { player, domains, score, domainsRated } of ordered) {
    const eff = domains.effort ?? '-';
    const coa = domains.coachable ?? '-';
    const bal = domains.ballSkills ?? '-';
    const ftw = domains.footwork ?? '-';
    const fin = domains.finishing ?? '-';
    const tem = domains.teammate ?? '-';
    const scoreStr = score !== null ? `${score}%` : 'N/A';
    const flag = score !== null && domainsRated < 4 ? '  * rate more to rank' : score === null ? '  (not rated)' : '';

    output += `${String(player).padStart(2)}    ${eff}    ${coa}    ${bal}    ${ftw}    ${fin}    ${tem}     ${scoreStr}${flag}\n`;
  }

  output += `
LEGEND
──────
EFF = Effort
COA = Coachable
BAL = Ball Skills
FTW = Footwork
FIN = Finishing
TEM = Teammate

RATINGS: 1=Needs Work, 2=OK, 3=Good, -=Skip
* = rated on fewer than 4 of 6 domains; sorted below and not directly comparable.
(Formal reports may use: Emerging/Developing/Proficient)

────────────────────────────────────────────
Numbers only. No names.
Paper attendance sheet held separately by school.
────────────────────────────────────────────`;

  return output;
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    console.error('Failed to copy:', e);
    return false;
  }
}

// Escape user-authored text (notes, session name) before putting it in print HTML.
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function generatePrintableHTML(session, ratings) {
  // Same fairness order as the screen: 4+ domains rank first, then partial, then unrated.
  const sorted = sortByScore(ratings);
  const ranked = sorted.filter((p) => p.score !== null && p.domainsRated >= 4);
  const partial = sorted.filter((p) => p.score !== null && p.domainsRated < 4);
  const unrated = sorted.filter((p) => p.score === null);
  const ordered = [...ranked, ...partial, ...unrated];
  const rankOf = {};
  ranked.forEach((p, i) => { rankOf[p.player] = i + 1; });
  const date = new Date(session.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const gradeBand = session.gradeBand === 'middle' ? 'Middle School (6-8)' : 'High School (9-12)';

  const getRatingColor = (rating) => {
    if (rating === null || rating === undefined) return '#999';
    if (rating === 1) return '#D70015';
    if (rating === 2) return '#8A6D00';
    return '#1A7F37';
  };

  const getRatingLabel = (rating) => {
    if (rating === null || rating === undefined) return '-';
    if (rating === 1) return 'Needs Work';
    if (rating === 2) return 'OK';
    return 'Good';
  };

  const domains = [
    { id: 'effort', name: 'Effort' },
    { id: 'coachable', name: 'Coachable' },
    { id: 'ballSkills', name: 'Ball Skills' },
    { id: 'footwork', name: 'Footwork' },
    { id: 'finishing', name: 'Finishing' },
    { id: 'teammate', name: 'Teammate' }
  ];

  let playersHTML = ordered.map(({ player, domains: playerDomains, score, domainsRated }) => {
    const rankNum = rankOf[player];
    const statusLabel = score !== null && domainsRated < 4 ? ' &middot; rate more to rank' : score === null ? ' &middot; not rated' : '';
    return `
    <div class="player-card">
      <div class="player-header">
        <div class="rank">${rankNum ?? '-'}</div>
        <div class="player-info">
          <strong>Player #${player}</strong>
          <span class="meta">${domainsRated}/6 domains rated${statusLabel}</span>
        </div>
        <div class="score" style="color: ${score === null ? '#999' : score >= 70 ? '#1A7F37' : score >= 50 ? '#8A6D00' : '#D70015'}">
          ${score !== null ? score + '%' : 'N/A'}
        </div>
      </div>
      <div class="domains">
        ${domains.map(domain => `
          <div class="domain">
            <span class="domain-name">${domain.name}</span>
            <span class="domain-rating" style="color: ${getRatingColor(playerDomains[domain.id])}">${getRatingLabel(playerDomains[domain.id])}</span>
          </div>
        `).join('')}
      </div>
      ${playerDomains.note ? `<div class="note">Note: ${escapeHtml(playerDomains.note)}</div>` : ''}
    </div>
  `;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tryout Evaluation - ${escapeHtml(session.name)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      color: #1D1D1F;
      font-size: 12px;
    }
    .header {
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 2px solid #007AFF;
      margin-bottom: 20px;
    }
    .header h1 { font-size: 20px; color: #007AFF; margin-bottom: 5px; }
    .header .meta { color: #666; font-size: 11px; }
    .summary {
      display: flex;
      justify-content: space-around;
      background: #F5F5F7;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .summary-item { text-align: center; }
    .summary-item .value { font-size: 18px; font-weight: bold; color: #007AFF; }
    .summary-item .label { font-size: 10px; color: #666; text-transform: uppercase; }
    .player-card {
      border: 1px solid #E5E5EA;
      border-radius: 8px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .player-header {
      display: flex;
      align-items: center;
      padding: 10px;
      background: #F5F5F7;
      border-radius: 8px 8px 0 0;
    }
    .rank {
      width: 24px;
      height: 24px;
      background: #007AFF;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 11px;
      margin-right: 10px;
    }
    .player-info { flex: 1; }
    .player-info strong { font-size: 13px; }
    .player-info .meta { display: block; font-size: 10px; color: #666; }
    .score { font-size: 18px; font-weight: bold; }
    .domains {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      padding: 10px;
    }
    .domain {
      display: flex;
      justify-content: space-between;
      padding: 4px 8px;
      background: #F9F9F9;
      border-radius: 4px;
      font-size: 10px;
    }
    .domain-name { color: #666; }
    .domain-rating { font-weight: 600; }
    .note {
      padding: 8px 10px;
      background: #FFF9E6;
      border-top: 1px solid #E5E5EA;
      font-style: italic;
      font-size: 10px;
      color: #666;
    }
    .footer {
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid #E5E5EA;
      text-align: center;
      font-size: 10px;
      color: #999;
    }
    .privacy-notice {
      background: #E5F1FF;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 15px;
      font-size: 10px;
      color: #007AFF;
    }
    @media print {
      body { padding: 10px; }
      .player-card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Tryout Evaluation Summary</h1>
    <div class="meta">${escapeHtml(session.name)} | ${date} | ${gradeBand}</div>
  </div>

  <div class="privacy-notice">
    <strong>Privacy Note:</strong> This document contains player NUMBERS only. 
    Cross-reference with your paper attendance sheet to match numbers to names.
  </div>

  <div class="summary">
    <div class="summary-item">
      <div class="value">${session.playerCount}</div>
      <div class="label">Players</div>
    </div>
    <div class="summary-item">
      <div class="value">${sorted.filter(p => p.score !== null).length}</div>
      <div class="label">Rated</div>
    </div>
    <div class="summary-item">
      <div class="value">${ranked.length > 0 ? ranked[0].score + '%' : '-'}</div>
      <div class="label">Top Score</div>
    </div>
  </div>

  ${playersHTML}

  <div class="footer">
    Generated by Provably Fair Basketball | cpk.solutions<br>
    No player names stored. Numbers only for privacy.
  </div>
</body>
</html>`;
}

export function printResults(session, ratings) {
  const html = generatePrintableHTML(session, ratings);
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Your browser blocked the print window. Allow pop-ups for this site, or use Copy Text instead.');
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 250);
}
