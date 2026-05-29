import type { Team } from '../types';

// Los 48 equipos del Mundial 2026, con repechajes ya resueltos
// (Chequia → A, Bosnia y Herzegovina → B, Turquía → D, Suecia → F,
//  Irak → I, RD Congo → K).
export const teams: Team[] = [
  // Grupo A
  { id: 'MEX', name: 'México', flag: 'MX', group: 'A' },
  { id: 'KOR', name: 'Corea del Sur', flag: 'KR', group: 'A' },
  { id: 'RSA', name: 'Sudáfrica', flag: 'ZA', group: 'A' },
  { id: 'CZE', name: 'Chequia', flag: 'CZ', group: 'A' },
  // Grupo B
  { id: 'CAN', name: 'Canadá', flag: 'CA', group: 'B' },
  { id: 'SUI', name: 'Suiza', flag: 'CH', group: 'B' },
  { id: 'QAT', name: 'Catar', flag: 'QA', group: 'B' },
  { id: 'BIH', name: 'Bosnia y Herzegovina', flag: 'BA', group: 'B' },
  // Grupo C
  { id: 'BRA', name: 'Brasil', flag: 'BR', group: 'C' },
  { id: 'MAR', name: 'Marruecos', flag: 'MA', group: 'C' },
  { id: 'SCO', name: 'Escocia', flag: 'special:scotland', group: 'C' },
  { id: 'HAI', name: 'Haití', flag: 'HT', group: 'C' },
  // Grupo D
  { id: 'USA', name: 'Estados Unidos', flag: 'US', group: 'D' },
  { id: 'AUS', name: 'Australia', flag: 'AU', group: 'D' },
  { id: 'PAR', name: 'Paraguay', flag: 'PY', group: 'D' },
  { id: 'TUR', name: 'Turquía', flag: 'TR', group: 'D' },
  // Grupo E
  { id: 'GER', name: 'Alemania', flag: 'DE', group: 'E' },
  { id: 'ECU', name: 'Ecuador', flag: 'EC', group: 'E' },
  { id: 'CIV', name: 'Costa de Marfil', flag: 'CI', group: 'E' },
  { id: 'CUW', name: 'Curazao', flag: 'CW', group: 'E' },
  // Grupo F
  { id: 'NED', name: 'Países Bajos', flag: 'NL', group: 'F' },
  { id: 'JPN', name: 'Japón', flag: 'JP', group: 'F' },
  { id: 'TUN', name: 'Túnez', flag: 'TN', group: 'F' },
  { id: 'SWE', name: 'Suecia', flag: 'SE', group: 'F' },
  // Grupo G
  { id: 'BEL', name: 'Bélgica', flag: 'BE', group: 'G' },
  { id: 'IRN', name: 'Irán', flag: 'IR', group: 'G' },
  { id: 'EGY', name: 'Egipto', flag: 'EG', group: 'G' },
  { id: 'NZL', name: 'Nueva Zelanda', flag: 'NZ', group: 'G' },
  // Grupo H
  { id: 'ESP', name: 'España', flag: 'ES', group: 'H' },
  { id: 'URU', name: 'Uruguay', flag: 'UY', group: 'H' },
  { id: 'KSA', name: 'Arabia Saudita', flag: 'SA', group: 'H' },
  { id: 'CPV', name: 'Cabo Verde', flag: 'CV', group: 'H' },
  // Grupo I
  { id: 'FRA', name: 'Francia', flag: 'FR', group: 'I' },
  { id: 'SEN', name: 'Senegal', flag: 'SN', group: 'I' },
  { id: 'NOR', name: 'Noruega', flag: 'NO', group: 'I' },
  { id: 'IRQ', name: 'Irak', flag: 'IQ', group: 'I' },
  // Grupo J
  { id: 'ARG', name: 'Argentina', flag: 'AR', group: 'J' },
  { id: 'AUT', name: 'Austria', flag: 'AT', group: 'J' },
  { id: 'ALG', name: 'Argelia', flag: 'DZ', group: 'J' },
  { id: 'JOR', name: 'Jordania', flag: 'JO', group: 'J' },
  // Grupo K
  { id: 'POR', name: 'Portugal', flag: 'PT', group: 'K' },
  { id: 'COL', name: 'Colombia', flag: 'CO', group: 'K' },
  { id: 'UZB', name: 'Uzbekistán', flag: 'UZ', group: 'K' },
  { id: 'COD', name: 'RD Congo', flag: 'CD', group: 'K' },
  // Grupo L
  { id: 'ENG', name: 'Inglaterra', flag: 'special:england', group: 'L' },
  { id: 'CRO', name: 'Croacia', flag: 'HR', group: 'L' },
  { id: 'PAN', name: 'Panamá', flag: 'PA', group: 'L' },
  { id: 'GHA', name: 'Ghana', flag: 'GH', group: 'L' }
];

export const teamsById: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.id, t])
);

export const groupIds: Array<Team['group']> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export function teamsOfGroup(g: Team['group']): Team[] {
  return teams.filter((t) => t.group === g);
}
