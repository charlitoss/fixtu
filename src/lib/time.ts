import type { Match } from './types';
import { venues } from './data/venues';

// Convierte la hora local de la sede de un partido en un instante UTC (Date).
// localKickoff = "YYYY-MM-DDTHH:mm" en hora de la sede; utcPlus = horas a sumar
// para obtener UTC. Date.UTC maneja el desborde de horas/días automáticamente.
export function matchInstant(match: Match): Date {
  const v = venues[match.venueId];
  const [datePart, timePart] = match.localKickoff.split('T');
  const [y, mo, d] = datePart.split('-').map(Number);
  const [hh, mm] = timePart.split(':').map(Number);
  return new Date(Date.UTC(y, mo - 1, d, hh + v.utcPlus, mm));
}

export interface TzOption {
  id: string;
  /** Zona IANA o 'venue' para "hora de la sede" */
  tz: string | 'venue';
  label: string;
}

export const tzOptions: TzOption[] = [
  { id: 'arg', tz: 'America/Argentina/Buenos_Aires', label: 'Argentina (UTC−3)' },
  { id: 'venue', tz: 'venue', label: 'Hora de la sede' },
  { id: 'utc', tz: 'UTC', label: 'UTC / GMT' },
  { id: 'mex', tz: 'America/Mexico_City', label: 'Ciudad de México (UTC−6)' },
  { id: 'ny', tz: 'America/New_York', label: 'Nueva York (UTC−4)' },
  { id: 'la', tz: 'America/Los_Angeles', label: 'Los Ángeles (UTC−7)' },
  { id: 'madrid', tz: 'Europe/Madrid', label: 'España (UTC+2)' },
  { id: 'london', tz: 'Europe/London', label: 'Reino Unido (UTC+1)' },
  { id: 'sao', tz: 'America/Sao_Paulo', label: 'Brasil (UTC−3)' },
  { id: 'bogota', tz: 'America/Bogota', label: 'Colombia (UTC−5)' },
  { id: 'tokyo', tz: 'Asia/Tokyo', label: 'Japón (UTC+9)' }
];

function resolveTz(tz: string | 'venue', match: Match): string {
  if (tz === 'venue') return venues[match.venueId].tz;
  return tz;
}

const DAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export interface FormattedTime {
  /** "jue 11 jun" */
  date: string;
  /** "18:00" */
  time: string;
  /** clave de día para agrupar, p.ej. "2026-06-11" en la zona elegida */
  dayKey: string;
}

export function formatKickoff(match: Match, tz: string | 'venue'): FormattedTime {
  const instant = matchInstant(match);
  const zone = resolveTz(tz, match);
  // Partes en la zona elegida
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(instant);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const year = get('year');
  const month = get('month');
  const day = get('day');
  let hour = get('hour');
  if (hour === '24') hour = '00';
  const minute = get('minute');

  const jsDay = new Date(`${year}-${month}-${day}T00:00:00Z`).getUTCDay();
  const monthLabel = MONTHS[Number(month) - 1];

  return {
    date: `${DAYS[jsDay]} ${Number(day)} ${monthLabel}`,
    time: `${hour}:${minute}`,
    dayKey: `${year}-${month}-${day}`
  };
}

/** Para encabezados de día: "Jueves 11 de junio" */
export function formatDayHeading(dayKey: string): string {
  const [y, m, d] = dayKey.split('-').map(Number);
  const jsDay = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const full = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const fullMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${full[jsDay]} ${d} de ${fullMonths[m - 1]}`;
}
