<script lang="ts">
  import type { Match } from '../lib/types';
  import { store } from '../lib/store.svelte';
  import { formatKickoff } from '../lib/time';
  import { teamsById } from '../lib/data/teams';
  import { flagEmoji } from '../lib/flags';

  let { match }: { match: Match } = $props();

  const home = $derived(match.homeId ? teamsById[match.homeId] : undefined);
  const away = $derived(match.awayId ? teamsById[match.awayId] : undefined);
  const time = $derived(formatKickoff(match, store.tz));

  // "dd/mm XXhrs" — incluye minutos solo si no son :00 (p. ej. 19:30hrs).
  const when = $derived.by(() => {
    const [, mo, da] = time.dayKey.split('-');
    const [hh, mm] = time.time.split(':');
    const hourLabel = mm === '00' ? `${hh}hrs` : `${hh}:${mm}hrs`;
    return `${da}/${mo} ${hourLabel}`;
  });
</script>

<div class="next card">
  <div class="teams">
    <span class="team">
      <span class="flag">{home ? flagEmoji(home.flag) : '⚪'}</span>
      <span class="code">{match.homeId ?? '—'}</span>
    </span>
    <span class="vs">vs</span>
    <span class="team">
      <span class="flag">{away ? flagEmoji(away.flag) : '⚪'}</span>
      <span class="code">{match.awayId ?? '—'}</span>
    </span>
  </div>
  <span class="when mono">{when}</span>
</div>

<style>
  .next {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.55rem 0.75rem;
  }
  .teams {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }
  .team {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }
  .flag { font-size: 1.15em; }
  .code {
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    color: var(--text);
  }
  .vs {
    color: var(--muted-2);
    font-size: 0.72rem;
    font-family: var(--font-narrow);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .when {
    flex-shrink: 0;
    font-size: 0.8rem;
    color: var(--muted);
    white-space: nowrap;
  }
</style>
