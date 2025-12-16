import { DOMAINS } from '../data/domains';

const weights = DOMAINS.reduce((acc, domain) => {
  acc[domain.id] = domain.weight;
  return acc;
}, {});

export function calculateScore(ratings) {
  let weightedSum = 0;
  let weightedMax = 0;
  
  for (const [domain, rating] of Object.entries(ratings)) {
    if (domain === 'note') continue;
    if (rating !== null && rating > 0) {
      weightedSum += rating * weights[domain];
      weightedMax += 3 * weights[domain];
    }
  }
  
  if (weightedMax === 0) return null;
  return Math.round((weightedSum / weightedMax) * 100);
}

export function getDomainsRated(ratings) {
  return Object.entries(ratings)
    .filter(([key, rating]) => key !== 'note' && rating !== null && rating > 0)
    .length;
}

export function sortByScore(ratingsObj) {
  return Object.entries(ratingsObj)
    .map(([player, domains]) => ({
      player: parseInt(player),
      domains,
      score: calculateScore(domains),
      domainsRated: getDomainsRated(domains)
    }))
    .sort((a, b) => {
      if (a.score === null && b.score === null) return a.player - b.player;
      if (a.score === null) return 1;
      if (b.score === null) return -1;
      return b.score - a.score;
    });
}
