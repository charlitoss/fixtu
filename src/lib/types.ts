// Tipos del dominio del fixture

export interface Team {
  /** Identificador corto y estable, p.ej. "ARG" */
  id: string;
  /** Nombre en español */
  name: string;
  /** Código para generar la bandera (ISO 3166-1 alpha-2, o "special:..." para subdivisiones) */
  flag: string;
  group: GroupId;
}

export type GroupId =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';

export interface Venue {
  id: string;
  /** Nombre de la sede (nombre durante el torneo) */
  name: string;
  city: string;
  /** Código de país ISO alpha-2 */
  country: string;
  /** Zona horaria IANA de la sede */
  tz: string;
  /** Horas a SUMAR a la hora local de la sede para obtener UTC durante el torneo */
  utcPlus: number;
}

export type Stage =
  | 'group'
  | 'r32'
  | 'r16'
  | 'qf'
  | 'sf'
  | 'bronze'
  | 'final';

export interface Match {
  /** Número de partido oficial 1..104 */
  id: number;
  stage: Stage;
  group?: GroupId;
  /** ids de equipos para fase de grupos; undefined en eliminatorias hasta definirse */
  homeId?: string;
  awayId?: string;
  /** Etiqueta de slot para eliminatorias, p.ej. "1A", "2B", "Ganador M73" */
  homeSlot?: string;
  awaySlot?: string;
  /** Hora local de la sede, "YYYY-MM-DDTHH:mm" */
  localKickoff: string;
  venueId: string;
}

/** Resultado cargado por el usuario */
export interface Result {
  homeGoals: number;
  awayGoals: number;
  /** Para eliminatorias empatadas: quién ganó por penales ('home' | 'away' | null) */
  shootoutWinner?: 'home' | 'away' | null;
}

export interface StandingRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  /** posición 1..4 dentro del grupo (tras ordenar) */
  rank: number;
}
