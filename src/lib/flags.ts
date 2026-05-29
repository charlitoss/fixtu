// Convierte un código de país a su bandera emoji.
// Para subdivisiones (Escocia, Inglaterra) usa los emojis de bandera de etiqueta.

const SPECIAL: Record<string, string> = {
  'special:scotland': '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}',
  'special:england': '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}'
};

export function flagEmoji(code: string): string {
  if (code.startsWith('special:')) {
    return SPECIAL[code] ?? '\u{1F3F3}';
  }
  // Indicadores regionales: A-Z → 0x1F1E6..
  const cc = code.toUpperCase();
  if (cc.length !== 2) return '\u{1F3F3}';
  const base = 0x1f1e6;
  return String.fromCodePoint(
    base + (cc.charCodeAt(0) - 65),
    base + (cc.charCodeAt(1) - 65)
  );
}
