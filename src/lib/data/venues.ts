import type { Venue } from '../types';

// Las 16 sedes. utcPlus = horas a sumar a la hora local de la sede para
// obtener UTC durante junio-julio 2026 (EE.UU./Canadá con horario de verano;
// México sin horario de verano).
export const venues: Record<string, Venue> = {
  mex_city: { id: 'mex_city', name: 'Estadio Azteca', city: 'Ciudad de México', country: 'MX', tz: 'America/Mexico_City', utcPlus: 6 },
  guadalajara: { id: 'guadalajara', name: 'Estadio Akron', city: 'Zapopan', country: 'MX', tz: 'America/Mexico_City', utcPlus: 6 },
  monterrey: { id: 'monterrey', name: 'Estadio BBVA', city: 'Guadalupe', country: 'MX', tz: 'America/Monterrey', utcPlus: 6 },
  toronto: { id: 'toronto', name: 'BMO Field', city: 'Toronto', country: 'CA', tz: 'America/Toronto', utcPlus: 4 },
  vancouver: { id: 'vancouver', name: 'BC Place', city: 'Vancouver', country: 'CA', tz: 'America/Vancouver', utcPlus: 7 },
  la: { id: 'la', name: 'SoFi Stadium', city: 'Los Ángeles', country: 'US', tz: 'America/Los_Angeles', utcPlus: 7 },
  sf: { id: 'sf', name: "Levi's Stadium", city: 'San Francisco', country: 'US', tz: 'America/Los_Angeles', utcPlus: 7 },
  seattle: { id: 'seattle', name: 'Lumen Field', city: 'Seattle', country: 'US', tz: 'America/Los_Angeles', utcPlus: 7 },
  nynj: { id: 'nynj', name: 'MetLife Stadium', city: 'Nueva Jersey', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  boston: { id: 'boston', name: 'Gillette Stadium', city: 'Boston', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  philadelphia: { id: 'philadelphia', name: 'Lincoln Financial Field', city: 'Filadelfia', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  atlanta: { id: 'atlanta', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  miami: { id: 'miami', name: 'Hard Rock Stadium', city: 'Miami', country: 'US', tz: 'America/New_York', utcPlus: 4 },
  dallas: { id: 'dallas', name: 'AT&T Stadium', city: 'Arlington', country: 'US', tz: 'America/Chicago', utcPlus: 5 },
  houston: { id: 'houston', name: 'NRG Stadium', city: 'Houston', country: 'US', tz: 'America/Chicago', utcPlus: 5 },
  kansas: { id: 'kansas', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'US', tz: 'America/Chicago', utcPlus: 5 }
};
