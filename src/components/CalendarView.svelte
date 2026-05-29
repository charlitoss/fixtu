<script lang="ts">
  import { groupMatches } from '../lib/data/groupMatches';
  import { knockoutMatches } from '../lib/data/knockoutMatches';
  import { matchInstant, formatKickoff, formatDayHeading } from '../lib/time';
  import { resolveKnockout } from '../lib/bracket';
  import { store } from '../lib/store.svelte';
  import MatchCard from './MatchCard.svelte';

  const allMatches = [...groupMatches, ...knockoutMatches].sort(
    (a, b) => matchInstant(a).getTime() - matchInstant(b).getTime()
  );

  const stageNames: Record<string, string> = {
    r32: 'Ronda de 32', r16: 'Octavos', qf: 'Cuartos', sf: 'Semifinal', bronze: 'Tercer puesto', final: 'Final'
  };

  const ko = $derived(resolveKnockout(store.results, store.knockoutTeams));

  // Agrupar por día (en la zona elegida)
  const byDay = $derived.by(() => {
    const groups: { dayKey: string; matches: typeof allMatches }[] = [];
    for (const m of allMatches) {
      const key = formatKickoff(m, store.tz).dayKey;
      let bucket = groups.find((g) => g.dayKey === key);
      if (!bucket) {
        bucket = { dayKey: key, matches: [] };
        groups.push(bucket);
      }
      bucket.matches.push(m);
    }
    return groups;
  });

  function resolvedHome(id: number, fallback?: string) {
    return fallback ?? ko[id]?.homeId;
  }
  function resolvedAway(id: number, fallback?: string) {
    return fallback ?? ko[id]?.awayId;
  }
</script>

{#key store.rev}
  <div class="calendar">
    {#each byDay as day (day.dayKey)}
      <div class="day">
        <h3 class="day-head">
          <span class="dot"></span>{formatDayHeading(day.dayKey)}
          <span class="count mono">{day.matches.length}</span>
        </h3>
        <div class="day-matches">
          {#each day.matches as m (m.id)}
            <MatchCard
              match={m}
              homeId={resolvedHome(m.id, m.homeId)}
              awayId={resolvedAway(m.id, m.awayId)}
              showGroupTag={m.stage === 'group'}
              homeSlotText={m.stage !== 'group' ? `${stageNames[m.stage]} · ${m.homeSlot ?? ''}` : ''}
              awaySlotText={m.stage !== 'group' ? (m.awaySlot ?? '') : ''}
            />
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/key}

<style>
  .calendar { display: flex; flex-direction: column; gap: 1.6rem; }
  .day-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.05rem;
    font-weight: 800;
    text-transform: capitalize;
    margin-bottom: 0.7rem;
    position: sticky;
    top: 0;
    z-index: 2;
    background: linear-gradient(180deg, var(--bg) 70%, transparent);
    padding: 0.4rem 0;
  }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
  .count {
    margin-left: auto;
    font-size: 0.74rem;
    color: var(--muted-2);
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 0.05rem 0.55rem;
  }
  .day-matches { display: flex; flex-direction: column; gap: 0.5rem; }
</style>
