import type { Venue } from '../types';

// Las 16 sedes. utcPlus = horas a sumar a la hora local de la sede para
// obtener UTC durante junio-julio 2026 (EE.UU./Canadá con horario de verano;
// México sin horario de verano).
export const venues: Record<string, Venue> = {
  mex_city: { id: 'mex_city', name: 'Estadio Ciudad de México', city: 'Ciudad de México', country: 'MX', tz: 'America/Mexico_City', utcPlus: 6 },
  guadalajara: { id: 'guadalajara', name: 'Estadio Guadalajara', city: 'Zapopan', country: 'MX', tz: 'America/Mexico_City', utcPlus: 6 },
  monterrey: { id: 'monterrey', name: 'Estadio Monterrey', city: 'Guadalupe', country: 'MX', tz: 'America/Monterrey', utcPlus: 6 },
  toronto: { id: 'toronto', name: 'Estadio Toronto', city: 'Toronto', country: 'CA', tz: 'America/Toronto', utcPlus: 4 },
  vancouver: { id: 'vancouver', name: 'BC Place', city: 'Vancouver', country: 'CA', tz: 'America/Vancouver', utcPlus: 7 },
  la: { id: 'la', name: 'Estadio Los Ángeles', city: 'Los Ángeles', country: 'US', tz: 'America/Los_Angeles', utcPlus: 7 },
  sf: { id: 'sf', name: 'Estadio Bahía de San Francisco', city: 'San Francisco', country: 'US', tz: 'America/Los_Angeles', utcPlus: 7 },
  seattle: { id: 'seattle', name: 'Estadio Seattle', city: 'Seattle', country: 'US', tz: 'America/Los_Angeles', utcPlus: 7 },
  nynj: { id: 'nynj', name: 'Estadio Nueva York Nueva Jersey', city: 'Nueva Jersey', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  boston: { id: 'boston', name: 'Estadio Boston', city: 'Boston', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  philadelphia: { id: 'philadelphia', name: 'Estadio Filadelfia', city: 'Filadelfia', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  atlanta: { id: 'atlanta', name: 'Estadio Atlanta', city: 'Atlanta', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  miami: { id: 'miami', name: 'Estadio Miami', city: 'Miami', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  dallas: { id: 'dallas', name: 'Estadio Dallas', city: 'Arlington', country: 'US', tz: 'America/Chicago', utcPlus: 5 },
  houston: { id: 'houston', name: 'Estadio Houston', city: 'Houston', country: 'US', tz: 'America/Chicago', utcPlus: 5 },
  kansas: { id: 'kansas', name: 'Estadio Kansas City', city: 'Kansas City', country: 'US', tz: 'America/Chicago', utcPlus: 5 }
};
