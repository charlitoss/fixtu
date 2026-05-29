<script lang="ts">
  import type { GroupId } from '../lib/types';
  import { groupMatches } from '../lib/data/groupMatches';
  import { matchInstant } from '../lib/time';
  import { store } from '../lib/store.svelte';
  import StandingsTable from './StandingsTable.svelte';
  import MatchCard from './MatchCard.svelte';

  let { group }: { group: GroupId } = $props();

  const matches = groupMatches
    .filter((m) => m.group === group)
    .sort((a, b) => matchInstant(a).getTime() - matchInstant(b).getTime());

  let showMatches = $state(true);
</script>

<section class="group card">
  <header class="g-head">
    <div class="g-id">
      <span class="eyebrow">Grupo</span>
      <span class="letter">{group}</span>
    </div>
    <button class="toggle" onclick={() => (showMatches = !showMatches)}>
      {showMatches ? 'Ocultar partidos' : 'Ver partidos'}
    </button>
  </header>

  <StandingsTable {group} />

  {#if showMatches}
    {#key store.rev}
      <div class="g-matches">
        {#each matches as m (m.id)}
          <MatchCard match={m} homeId={m.homeId} awayId={m.awayId} />
        {/each}
      </div>
    {/key}
  {/if}
</section>

<style>
  .group { padding: 0.9rem; display: flex; flex-direction: column; gap: 0.8rem; }
  .g-head { display: flex; align-items: center; justify-content: space-between; }
  .g-id { display: flex; align-items: baseline; gap: 0.55rem; }
  .letter {
    font-family: var(--font-display);
    font-weight: 900;
    font-size: 1.8rem;
    line-height: 1;
    color: var(--accent);
    letter-spacing: -0.03em;
  }
  .toggle {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--muted);
    border-radius: 20px;
    padding: 0.25rem 0.7rem;
    font-size: 0.74rem;
    font-family: var(--font-narrow);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .toggle:hover { border-color: var(--line-strong); color: var(--text); }
  .g-matches { display: flex; flex-direction: column; gap: 0.5rem; }
</style>
