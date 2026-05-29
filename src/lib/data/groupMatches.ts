import type { Match } from '../types';

// Fase de grupos: 72 partidos (11–27 junio 2026).
// localKickoff = hora LOCAL de la sede en formato "YYYY-MM-DDTHH:mm".
// Los partidos de "medianoche" se registran como las 00:00 del día siguiente.
export const groupMatches: Match[] = [
  // Jueves 11 junio
  { id: 1, stage: 'group', group: 'A', homeId: 'MEX', awayId: 'RSA', localKickoff: '2026-06-11T15:00', venueId: 'mex_city' },
  { id: 2, stage: 'group', group: 'A', homeId: 'KOR', awayId: 'CZE', localKickoff: '2026-06-11T22:00', venueId: 'guadalajara' },
  // Viernes 12 junio
  { id: 3, stage: 'group', group: 'B', homeId: 'CAN', awayId: 'BIH', localKickoff: '2026-06-12T15:00', venueId: 'toronto' },
  { id: 4, stage: 'group', group: 'D', homeId: 'USA', awayId: 'PAR', localKickoff: '2026-06-12T21:00', venueId: 'la' },
  // Sábado 13 junio
  { id: 5, stage: 'group', group: 'B', homeId: 'QAT', awayId: 'SUI', localKickoff: '2026-06-13T15:00', venueId: 'sf' },
  { id: 6, stage: 'group', group: 'C', homeId: 'BRA', awayId: 'MAR', localKickoff: '2026-06-13T18:00', venueId: 'nynj' },
  { id: 7, stage: 'group', group: 'C', homeId: 'HAI', awayId: 'SCO', localKickoff: '2026-06-13T21:00', venueId: 'boston' },
  { id: 8, stage: 'group', group: 'D', homeId: 'AUS', awayId: 'TUR', localKickoff: '2026-06-14T00:00', venueId: 'vancouver' },
  // Domingo 14 junio
  { id: 9, stage: 'group', group: 'E', homeId: 'GER', awayId: 'CUW', localKickoff: '2026-06-14T13:00', venueId: 'houston' },
  { id: 10, stage: 'group', group: 'F', homeId: 'NED', awayId: 'JPN', localKickoff: '2026-06-14T16:00', venueId: 'dallas' },
  { id: 11, stage: 'group', group: 'E', homeId: 'CIV', awayId: 'ECU', localKickoff: '2026-06-14T19:00', venueId: 'philadelphia' },
  { id: 12, stage: 'group', group: 'F', homeId: 'SWE', awayId: 'TUN', localKickoff: '2026-06-14T22:00', venueId: 'monterrey' },
  // Lunes 15 junio
  { id: 13, stage: 'group', group: 'H', homeId: 'ESP', awayId: 'CPV', localKickoff: '2026-06-15T12:00', venueId: 'atlanta' },
  { id: 14, stage: 'group', group: 'G', homeId: 'BEL', awayId: 'EGY', localKickoff: '2026-06-15T15:00', venueId: 'vancouver' },
  { id: 15, stage: 'group', group: 'H', homeId: 'KSA', awayId: 'URU', localKickoff: '2026-06-15T18:00', venueId: 'miami' },
  { id: 16, stage: 'group', group: 'G', homeId: 'IRN', awayId: 'NZL', localKickoff: '2026-06-15T21:00', venueId: 'la' },
  // Martes 16 junio
  { id: 17, stage: 'group', group: 'I', homeId: 'FRA', awayId: 'SEN', localKickoff: '2026-06-16T15:00', venueId: 'nynj' },
  { id: 18, stage: 'group', group: 'I', homeId: 'IRQ', awayId: 'NOR', localKickoff: '2026-06-16T18:00', venueId: 'boston' },
  { id: 19, stage: 'group', group: 'J', homeId: 'ARG', awayId: 'ALG', localKickoff: '2026-06-16T21:00', venueId: 'kansas' },
  { id: 20, stage: 'group', group: 'J', homeId: 'AUT', awayId: 'JOR', localKickoff: '2026-06-17T00:00', venueId: 'sf' },
  // Miércoles 17 junio
  { id: 21, stage: 'group', group: 'K', homeId: 'POR', awayId: 'COD', localKickoff: '2026-06-17T13:00', venueId: 'houston' },
  { id: 22, stage: 'group', group: 'L', homeId: 'ENG', awayId: 'CRO', localKickoff: '2026-06-17T16:00', venueId: 'dallas' },
  { id: 23, stage: 'group', group: 'L', homeId: 'GHA', awayId: 'PAN', localKickoff: '2026-06-17T19:00', venueId: 'toronto' },
  { id: 24, stage: 'group', group: 'K', homeId: 'UZB', awayId: 'COL', localKickoff: '2026-06-17T22:00', venueId: 'mex_city' },
  // Jueves 18 junio
  { id: 25, stage: 'group', group: 'A', homeId: 'CZE', awayId: 'RSA', localKickoff: '2026-06-18T12:00', venueId: 'atlanta' },
  { id: 26, stage: 'group', group: 'B', homeId: 'SUI', awayId: 'BIH', localKickoff: '2026-06-18T15:00', venueId: 'la' },
  { id: 27, stage: 'group', group: 'B', homeId: 'CAN', awayId: 'QAT', localKickoff: '2026-06-18T18:00', venueId: 'vancouver' },
  { id: 28, stage: 'group', group: 'A', homeId: 'MEX', awayId: 'KOR', localKickoff: '2026-06-18T21:00', venueId: 'guadalajara' },
  // Viernes 19 junio
  { id: 29, stage: 'group', group: 'D', homeId: 'USA', awayId: 'AUS', localKickoff: '2026-06-19T15:00', venueId: 'seattle' },
  { id: 30, stage: 'group', group: 'C', homeId: 'SCO', awayId: 'MAR', localKickoff: '2026-06-19T18:00', venueId: 'boston' },
  { id: 31, stage: 'group', group: 'C', homeId: 'BRA', awayId: 'HAI', localKickoff: '2026-06-19T21:00', venueId: 'philadelphia' },
  { id: 32, stage: 'group', group: 'D', homeId: 'TUR', awayId: 'PAR', localKickoff: '2026-06-20T00:00', venueId: 'sf' },
  // Sábado 20 junio
  { id: 33, stage: 'group', group: 'F', homeId: 'NED', awayId: 'SWE', localKickoff: '2026-06-20T13:00', venueId: 'houston' },
  { id: 34, stage: 'group', group: 'E', homeId: 'GER', awayId: 'CIV', localKickoff: '2026-06-20T16:00', venueId: 'toronto' },
  { id: 35, stage: 'group', group: 'E', homeId: 'ECU', awayId: 'CUW', localKickoff: '2026-06-20T20:00', venueId: 'kansas' },
  { id: 36, stage: 'group', group: 'F', homeId: 'TUN', awayId: 'JPN', localKickoff: '2026-06-21T00:00', venueId: 'monterrey' },
  // Domingo 21 junio
  { id: 37, stage: 'group', group: 'H', homeId: 'ESP', awayId: 'KSA', localKickoff: '2026-06-21T12:00', venueId: 'atlanta' },
  { id: 38, stage: 'group', group: 'G', homeId: 'BEL', awayId: 'IRN', localKickoff: '2026-06-21T15:00', venueId: 'la' },
  { id: 39, stage: 'group', group: 'H', homeId: 'URU', awayId: 'CPV', localKickoff: '2026-06-21T18:00', venueId: 'miami' },
  { id: 40, stage: 'group', group: 'G', homeId: 'NZL', awayId: 'EGY', localKickoff: '2026-06-21T21:00', venueId: 'vancouver' },
  // Lunes 22 junio
  { id: 41, stage: 'group', group: 'J', homeId: 'ARG', awayId: 'AUT', localKickoff: '2026-06-22T13:00', venueId: 'dallas' },
  { id: 42, stage: 'group', group: 'I', homeId: 'FRA', awayId: 'IRQ', localKickoff: '2026-06-22T17:00', venueId: 'philadelphia' },
  { id: 43, stage: 'group', group: 'I', homeId: 'NOR', awayId: 'SEN', localKickoff: '2026-06-22T20:00', venueId: 'nynj' },
  { id: 44, stage: 'group', group: 'J', homeId: 'JOR', awayId: 'ALG', localKickoff: '2026-06-22T23:00', venueId: 'sf' },
  // Martes 23 junio
  { id: 45, stage: 'group', group: 'K', homeId: 'POR', awayId: 'UZB', localKickoff: '2026-06-23T13:00', venueId: 'houston' },
  { id: 46, stage: 'group', group: 'L', homeId: 'ENG', awayId: 'GHA', localKickoff: '2026-06-23T16:00', venueId: 'boston' },
  { id: 47, stage: 'group', group: 'L', homeId: 'PAN', awayId: 'CRO', localKickoff: '2026-06-23T19:00', venueId: 'toronto' },
  { id: 48, stage: 'group', group: 'K', homeId: 'COL', awayId: 'COD', localKickoff: '2026-06-23T22:00', venueId: 'guadalajara' },
  // Miércoles 24 junio
  { id: 49, stage: 'group', group: 'B', homeId: 'SUI', awayId: 'CAN', localKickoff: '2026-06-24T15:00', venueId: 'vancouver' },
  { id: 50, stage: 'group', group: 'B', homeId: 'BIH', awayId: 'QAT', localKickoff: '2026-06-24T15:00', venueId: 'seattle' },
  { id: 51, stage: 'group', group: 'C', homeId: 'SCO', awayId: 'BRA', localKickoff: '2026-06-24T18:00', venueId: 'miami' },
  { id: 52, stage: 'group', group: 'C', homeId: 'MAR', awayId: 'HAI', localKickoff: '2026-06-24T18:00', venueId: 'atlanta' },
  { id: 53, stage: 'group', group: 'A', homeId: 'CZE', awayId: 'MEX', localKickoff: '2026-06-24T21:00', venueId: 'mex_city' },
  { id: 54, stage: 'group', group: 'A', homeId: 'RSA', awayId: 'KOR', localKickoff: '2026-06-24T21:00', venueId: 'monterrey' },
  // Jueves 25 junio
  { id: 55, stage: 'group', group: 'E', homeId: 'ECU', awayId: 'GER', localKickoff: '2026-06-25T16:00', venueId: 'nynj' },
  { id: 56, stage: 'group', group: 'E', homeId: 'CUW', awayId: 'CIV', localKickoff: '2026-06-25T16:00', venueId: 'philadelphia' },
  { id: 57, stage: 'group', group: 'F', homeId: 'JPN', awayId: 'SWE', localKickoff: '2026-06-25T19:00', venueId: 'dallas' },
  { id: 58, stage: 'group', group: 'F', homeId: 'TUN', awayId: 'NED', localKickoff: '2026-06-25T19:00', venueId: 'kansas' },
  { id: 59, stage: 'group', group: 'D', homeId: 'TUR', awayId: 'USA', localKickoff: '2026-06-25T22:00', venueId: 'la' },
  { id: 60, stage: 'group', group: 'D', homeId: 'PAR', awayId: 'AUS', localKickoff: '2026-06-25T22:00', venueId: 'sf' },
  // Viernes 26 junio
  { id: 61, stage: 'group', group: 'I', homeId: 'NOR', awayId: 'FRA', localKickoff: '2026-06-26T15:00', venueId: 'boston' },
  { id: 62, stage: 'group', group: 'I', homeId: 'SEN', awayId: 'IRQ', localKickoff: '2026-06-26T15:00', venueId: 'toronto' },
  { id: 63, stage: 'group', group: 'H', homeId: 'CPV', awayId: 'KSA', localKickoff: '2026-06-26T20:00', venueId: 'houston' },
  { id: 64, stage: 'group', group: 'H', homeId: 'URU', awayId: 'ESP', localKickoff: '2026-06-26T20:00', venueId: 'guadalajara' },
  { id: 65, stage: 'group', group: 'G', homeId: 'EGY', awayId: 'IRN', localKickoff: '2026-06-26T23:00', venueId: 'seattle' },
  { id: 66, stage: 'group', group: 'G', homeId: 'NZL', awayId: 'BEL', localKickoff: '2026-06-26T23:00', venueId: 'vancouver' },
  // Sábado 27 junio
  { id: 67, stage: 'group', group: 'L', homeId: 'PAN', awayId: 'ENG', localKickoff: '2026-06-27T17:00', venueId: 'nynj' },
  { id: 68, stage: 'group', group: 'L', homeId: 'CRO', awayId: 'GHA', localKickoff: '2026-06-27T17:00', venueId: 'philadelphia' },
  { id: 69, stage: 'group', group: 'K', homeId: 'COL', awayId: 'POR', localKickoff: '2026-06-27T19:30', venueId: 'miami' },
  { id: 70, stage: 'group', group: 'K', homeId: 'COD', awayId: 'UZB', localKickoff: '2026-06-27T19:30', venueId: 'atlanta' },
  { id: 71, stage: 'group', group: 'J', homeId: 'ALG', awayId: 'AUT', localKickoff: '2026-06-27T22:00', venueId: 'kansas' },
  { id: 72, stage: 'group', group: 'J', homeId: 'JOR', awayId: 'ARG', localKickoff: '2026-06-27T22:00', venueId: 'dallas' }
];
