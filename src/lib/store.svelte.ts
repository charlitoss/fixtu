import type { Result } from './types';
import { tzOptions } from './time';

const STORAGE_KEY = 'wc2026-fixture-v1';

interface Persisted {
  results: Record<number, Result>;
  knockoutTeams: Record<string, string>;
  favorite: string | null;
  tzId: string;
}

function loadPersisted(): Persisted {
  const fallback: Persisted = { results: {}, knockoutTeams: {}, favorite: 'ARG', tzId: 'arg' };
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      results: parsed.results ?? {},
      knockoutTeams: parsed.knockoutTeams ?? {},
      favorite: parsed.favorite ?? null,
      tzId: parsed.tzId ?? 'arg'
    };
  } catch {
    return fallback;
  }
}

class FixtureStore {
  results = $state<Record<number, Result>>({});
  /** clave `${matchId}:home|away` -> teamId, sólo para slots editables (R32) */
  knockoutTeams = $state<Record<string, string>>({});
  favorite = $state<string | null>(null);
  tzId = $state<string>('arg');
  /** se incrementa al resetear, para forzar el remount de inputs de resultado */
  rev = $state<number>(0);

  constructor() {
    const p = loadPersisted();
    this.results = p.results;
    this.knockoutTeams = p.knockoutTeams;
    this.favorite = p.favorite;
    this.tzId = p.tzId;

    // Autoguardado ante cualquier cambio
    $effect.root(() => {
      $effect(() => {
        const snapshot: Persisted = {
          results: this.results,
          knockoutTeams: this.knockoutTeams,
          favorite: this.favorite,
          tzId: this.tzId
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        } catch {
          /* almacenamiento no disponible: se ignora */
        }
      });
    });
  }

  get tz(): string | 'venue' {
    return tzOptions.find((o) => o.id === this.tzId)?.tz ?? 'America/Argentina/Buenos_Aires';
  }

  setResult(matchId: number, homeGoals: number, awayGoals: number, shootoutWinner: 'home' | 'away' | null = null) {
    this.results = { ...this.results, [matchId]: { homeGoals, awayGoals, shootoutWinner } };
  }

  clearResult(matchId: number) {
    const { [matchId]: _removed, ...rest } = this.results;
    this.results = rest;
  }

  setKnockoutTeam(matchId: number, side: 'home' | 'away', teamId: string | null) {
    const key = `${matchId}:${side}`;
    if (teamId === null || teamId === '') {
      const { [key]: _r, ...rest } = this.knockoutTeams;
      this.knockoutTeams = rest;
    } else {
      this.knockoutTeams = { ...this.knockoutTeams, [key]: teamId };
    }
  }

  setFavorite(teamId: string | null) {
    this.favorite = teamId;
  }

  resetAll() {
    this.results = {};
    this.knockoutTeams = {};
    this.rev++;
  }
}

export const store = new FixtureStore();
