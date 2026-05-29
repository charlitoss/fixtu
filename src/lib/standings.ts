import type { GroupId, Match, Result, StandingRow, Team } from './types';
import { teamsOfGroup } from './data/teams';

// Calcula la tabla de un grupo a partir de los resultados cargados.
// Criterios de desempate (orden FIFA simplificado):
// 1) puntos  2) diferencia de gol  3) goles a favor
// 4) entre equipos empatados: puntos, dif. de gol y goles en sus enfrentamientos
// 5) orden alfabético (placeholder del sorteo / fair play, que no modelamos)
export function computeStandings(
  group: GroupId,
  matches: Match[],
  results: Record<number, Result | undefined>
): StandingRow[] {
  const groupTeams = teamsOfGroup(group);
  const rows = new Map<string, StandingRow>();
  for (const t of groupTeams) {
    rows.set(t.id, {
      team: t,
      played: 0, won: 0, drawn: 0, lost: 0,
      gf: 0, ga: 0, gd: 0, points: 0, rank: 0
    });
  }

  const groupMatches = matches.filter((m) => m.group === group && m.homeId && m.awayId);
  for (const m of groupMatches) {
    const r = results[m.id];
    if (!r) continue;
    const home = rows.get(m.homeId!);
    const away = rows.get(m.awayId!);
    if (!home || !away) continue;
    home.played++; away.played++;
    home.gf += r.homeGoals; home.ga += r.awayGoals;
    away.gf += r.awayGoals; away.ga += r.homeGoals;
    if (r.homeGoals > r.awayGoals) {
      home.won++; home.points += 3; away.lost++;
    } else if (r.homeGoals < r.awayGoals) {
      away.won++; away.points += 3; home.lost++;
    } else {
      home.drawn++; away.drawn++; home.points++; away.points++;
    }
  }
  for (const row of rows.values()) row.gd = row.gf - row.ga;

  const list = Array.from(rows.values());

  // Head-to-head entre un subconjunto empatado
  const h2h = (ids: Set<string>) => {
    const sub = new Map<string, { pts: number; gd: number; gf: number }>();
    ids.forEach((id) => sub.set(id, { pts: 0, gd: 0, gf: 0 }));
    for (const m of groupMatches) {
      if (!ids.has(m.homeId!) || !ids.has(m.awayId!)) continue;
      const r = results[m.id];
      if (!r) continue;
      const h = sub.get(m.homeId!)!;
      const a = sub.get(m.awayId!)!;
      h.gf += r.homeGoals; a.gf += r.awayGoals;
      h.gd += r.homeGoals - r.awayGoals;
      a.gd += r.awayGoals - r.homeGoals;
      if (r.homeGoals > r.awayGoals) h.pts += 3;
      else if (r.homeGoals < r.awayGoals) a.pts += 3;
      else { h.pts++; a.pts++; }
    }
    return sub;
  };

  list.sort((x, y) => {
    if (y.points !== x.points) return y.points - x.points;
    if (y.gd !== x.gd) return y.gd - x.gd;
    if (y.gf !== x.gf) return y.gf - x.gf;
    // Empate total en criterios globales → mini-tabla entre los empatados
    const tiedIds = new Set(
      list.filter((r) => r.points === x.points && r.gd === x.gd && r.gf === x.gf).map((r) => r.team.id)
    );
    if (tiedIds.size > 1) {
      const sub = h2h(tiedIds);
      const sx = sub.get(x.team.id)!;
      const sy = sub.get(y.team.id)!;
      if (sy.pts !== sx.pts) return sy.pts - sx.pts;
      if (sy.gd !== sx.gd) return sy.gd - sx.gd;
      if (sy.gf !== sx.gf) return sy.gf - sx.gf;
    }
    return x.team.name.localeCompare(y.team.name, 'es');
  });

  list.forEach((row, i) => (row.rank = i + 1));
  return list;
}

export interface ThirdPlaceRow extends StandingRow {
  group: GroupId;
}

// Ranking de los 12 terceros para identificar a los 8 mejores que avanzan.
export function rankThirdPlaces(
  matches: Match[],
  results: Record<number, Result | undefined>,
  groups: GroupId[]
): ThirdPlaceRow[] {
  const thirds: ThirdPlaceRow[] = [];
  for (const g of groups) {
    const table = computeStandings(g, matches, results);
    const third = table[2];
    if (third) thirds.push({ ...third, group: g });
  }
  thirds.sort((x, y) => {
    if (y.points !== x.points) return y.points - x.points;
    if (y.gd !== x.gd) return y.gd - x.gd;
    if (y.gf !== x.gf) return y.gf - x.gf;
    return x.team.name.localeCompare(y.team.name, 'es');
  });
  return thirds;
}

export function teamName(t: Team): string {
  return t.name;
}
