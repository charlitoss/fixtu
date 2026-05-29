import type { Result } from './types';
import { knockoutMatches, bracketTree, type FeedRef } from './data/knockoutMatches';

export interface KnockoutResolved {
  homeId?: string;
  awayId?: string;
  winnerId?: string;
  loserId?: string;
  decided: boolean;
}

function pickFrom(out: Record<number, KnockoutResolved>, ref: FeedRef): string | undefined {
  const r = out[ref.fromMatch];
  if (!r) return undefined;
  return ref.type === 'winner' ? r.winnerId : r.loserId;
}

// Resuelve, para cada partido de eliminatorias, qué equipos lo juegan y quién
// gana, propagando hacia rondas superiores. Los partidos están ordenados por id
// y los alimentadores siempre tienen id menor, así que una sola pasada alcanza.
export function resolveKnockout(
  results: Record<number, Result | undefined>,
  knockoutTeams: Record<string, string>
): Record<number, KnockoutResolved> {
  const out: Record<number, KnockoutResolved> = {};
  for (const m of knockoutMatches) {
    let homeId: string | undefined;
    let awayId: string | undefined;
    const tree = bracketTree[m.id];
    if (m.stage === 'r32') {
      homeId = knockoutTeams[`${m.id}:home`] || undefined;
      awayId = knockoutTeams[`${m.id}:away`] || undefined;
    } else if (tree) {
      homeId = pickFrom(out, tree.home);
      awayId = pickFrom(out, tree.away);
    }

    const res = results[m.id];
    let winnerId: string | undefined;
    let loserId: string | undefined;
    let decided = false;
    if (res && homeId && awayId) {
      if (res.homeGoals > res.awayGoals) { winnerId = homeId; loserId = awayId; decided = true; }
      else if (res.awayGoals > res.homeGoals) { winnerId = awayId; loserId = homeId; decided = true; }
      else if (res.shootoutWinner === 'home') { winnerId = homeId; loserId = awayId; decided = true; }
      else if (res.shootoutWinner === 'away') { winnerId = awayId; loserId = homeId; decided = true; }
    }
    out[m.id] = { homeId, awayId, winnerId, loserId, decided };
  }
  return out;
}
