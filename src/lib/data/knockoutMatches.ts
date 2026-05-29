import type { Match } from '../types';

// Eliminatorias: 32 partidos (28 junio – 19 julio 2026).
// Fechas, horarios locales y sedes son los oficiales publicados por FIFA.
// Las etiquetas de slot (1A, 2B, 3º…) son orientativas: los cruces exactos
// —sobre todo los 8 mejores terceros— se definen al cerrar la fase de grupos,
// por eso en la app los equipos se asignan manualmente.
export const knockoutMatches: Match[] = [
  // Ronda de 32 (28 jun – 3 jul)
  { id: 73, stage: 'r32', homeSlot: '1A', awaySlot: '3º C/E/F/H/I', localKickoff: '2026-06-28T15:00', venueId: 'la' },
  { id: 74, stage: 'r32', homeSlot: '1C', awaySlot: '3º A/B/F/H/I', localKickoff: '2026-06-29T13:00', venueId: 'houston' },
  { id: 75, stage: 'r32', homeSlot: '1E', awaySlot: '3º A/B/C/D/F', localKickoff: '2026-06-29T16:30', venueId: 'boston' },
  { id: 76, stage: 'r32', homeSlot: '2A', awaySlot: '2B', localKickoff: '2026-06-29T21:00', venueId: 'monterrey' },
  { id: 77, stage: 'r32', homeSlot: '1F', awaySlot: '2C', localKickoff: '2026-06-30T13:00', venueId: 'dallas' },
  { id: 78, stage: 'r32', homeSlot: '1I', awaySlot: '3º C/D/F/G/H', localKickoff: '2026-06-30T17:00', venueId: 'nynj' },
  { id: 79, stage: 'r32', homeSlot: '1B', awaySlot: '3º E/F/G/I/J', localKickoff: '2026-06-30T21:00', venueId: 'mex_city' },
  { id: 80, stage: 'r32', homeSlot: '1L', awaySlot: '3º E/H/I/J/K', localKickoff: '2026-07-01T12:00', venueId: 'atlanta' },
  { id: 81, stage: 'r32', homeSlot: '2D', awaySlot: '2E', localKickoff: '2026-07-01T16:00', venueId: 'seattle' },
  { id: 82, stage: 'r32', homeSlot: '1D', awaySlot: '3º B/E/F/I/J', localKickoff: '2026-07-01T20:00', venueId: 'sf' },
  { id: 83, stage: 'r32', homeSlot: '1G', awaySlot: '3º A/E/H/I/J', localKickoff: '2026-07-02T15:00', venueId: 'la' },
  { id: 84, stage: 'r32', homeSlot: '2F', awaySlot: '2I', localKickoff: '2026-07-02T19:00', venueId: 'toronto' },
  { id: 85, stage: 'r32', homeSlot: '1K', awaySlot: '3º D/E/I/J/L', localKickoff: '2026-07-02T23:00', venueId: 'vancouver' },
  { id: 86, stage: 'r32', homeSlot: '1H', awaySlot: '2G', localKickoff: '2026-07-03T14:00', venueId: 'dallas' },
  { id: 87, stage: 'r32', homeSlot: '2K', awaySlot: '2L', localKickoff: '2026-07-03T18:00', venueId: 'miami' },
  { id: 88, stage: 'r32', homeSlot: '1J', awaySlot: '2H', localKickoff: '2026-07-03T21:30', venueId: 'kansas' },

  // Octavos (4–7 jul)
  { id: 89, stage: 'r16', homeSlot: 'Ganador M73', awaySlot: 'Ganador M74', localKickoff: '2026-07-04T13:00', venueId: 'houston' },
  { id: 90, stage: 'r16', homeSlot: 'Ganador M75', awaySlot: 'Ganador M76', localKickoff: '2026-07-04T17:00', venueId: 'philadelphia' },
  { id: 91, stage: 'r16', homeSlot: 'Ganador M77', awaySlot: 'Ganador M78', localKickoff: '2026-07-05T16:00', venueId: 'nynj' },
  { id: 92, stage: 'r16', homeSlot: 'Ganador M79', awaySlot: 'Ganador M80', localKickoff: '2026-07-05T20:00', venueId: 'mex_city' },
  { id: 93, stage: 'r16', homeSlot: 'Ganador M81', awaySlot: 'Ganador M82', localKickoff: '2026-07-06T15:00', venueId: 'dallas' },
  { id: 94, stage: 'r16', homeSlot: 'Ganador M83', awaySlot: 'Ganador M84', localKickoff: '2026-07-06T20:00', venueId: 'seattle' },
  { id: 95, stage: 'r16', homeSlot: 'Ganador M85', awaySlot: 'Ganador M86', localKickoff: '2026-07-07T12:00', venueId: 'atlanta' },
  { id: 96, stage: 'r16', homeSlot: 'Ganador M87', awaySlot: 'Ganador M88', localKickoff: '2026-07-07T16:00', venueId: 'vancouver' },

  // Cuartos (9–11 jul)
  { id: 97, stage: 'qf', homeSlot: 'Ganador M89', awaySlot: 'Ganador M90', localKickoff: '2026-07-09T16:00', venueId: 'boston' },
  { id: 98, stage: 'qf', homeSlot: 'Ganador M91', awaySlot: 'Ganador M92', localKickoff: '2026-07-10T15:00', venueId: 'la' },
  { id: 99, stage: 'qf', homeSlot: 'Ganador M93', awaySlot: 'Ganador M94', localKickoff: '2026-07-11T17:00', venueId: 'miami' },
  { id: 100, stage: 'qf', homeSlot: 'Ganador M95', awaySlot: 'Ganador M96', localKickoff: '2026-07-11T21:00', venueId: 'kansas' },

  // Semifinales (14–15 jul)
  { id: 101, stage: 'sf', homeSlot: 'Ganador M97', awaySlot: 'Ganador M98', localKickoff: '2026-07-14T15:00', venueId: 'dallas' },
  { id: 102, stage: 'sf', homeSlot: 'Ganador M99', awaySlot: 'Ganador M100', localKickoff: '2026-07-15T15:00', venueId: 'atlanta' },

  // Tercer puesto (18 jul)
  { id: 103, stage: 'bronze', homeSlot: 'Perdedor M101', awaySlot: 'Perdedor M102', localKickoff: '2026-07-18T17:00', venueId: 'miami' },

  // Final (19 jul)
  { id: 104, stage: 'final', homeSlot: 'Ganador M101', awaySlot: 'Ganador M102', localKickoff: '2026-07-19T15:00', venueId: 'nynj' }
];

// Árbol de la llave: de qué partido viene cada slot.
// type: 'winner' (ganador) o 'loser' (perdedor, para el 3er puesto).
export interface FeedRef {
  fromMatch: number;
  type: 'winner' | 'loser';
}
export const bracketTree: Record<number, { home: FeedRef; away: FeedRef }> = {
  89: { home: { fromMatch: 73, type: 'winner' }, away: { fromMatch: 74, type: 'winner' } },
  90: { home: { fromMatch: 75, type: 'winner' }, away: { fromMatch: 76, type: 'winner' } },
  91: { home: { fromMatch: 77, type: 'winner' }, away: { fromMatch: 78, type: 'winner' } },
  92: { home: { fromMatch: 79, type: 'winner' }, away: { fromMatch: 80, type: 'winner' } },
  93: { home: { fromMatch: 81, type: 'winner' }, away: { fromMatch: 82, type: 'winner' } },
  94: { home: { fromMatch: 83, type: 'winner' }, away: { fromMatch: 84, type: 'winner' } },
  95: { home: { fromMatch: 85, type: 'winner' }, away: { fromMatch: 86, type: 'winner' } },
  96: { home: { fromMatch: 87, type: 'winner' }, away: { fromMatch: 88, type: 'winner' } },
  97: { home: { fromMatch: 89, type: 'winner' }, away: { fromMatch: 90, type: 'winner' } },
  98: { home: { fromMatch: 91, type: 'winner' }, away: { fromMatch: 92, type: 'winner' } },
  99: { home: { fromMatch: 93, type: 'winner' }, away: { fromMatch: 94, type: 'winner' } },
  100: { home: { fromMatch: 95, type: 'winner' }, away: { fromMatch: 96, type: 'winner' } },
  101: { home: { fromMatch: 97, type: 'winner' }, away: { fromMatch: 98, type: 'winner' } },
  102: { home: { fromMatch: 99, type: 'winner' }, away: { fromMatch: 100, type: 'winner' } },
  103: { home: { fromMatch: 101, type: 'loser' }, away: { fromMatch: 102, type: 'loser' } },
  104: { home: { fromMatch: 101, type: 'winner' }, away: { fromMatch: 102, type: 'winner' } }
};
