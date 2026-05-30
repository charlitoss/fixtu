<script lang="ts">
  import type { GroupId } from '../lib/types';
  import { groupMatches } from '../lib/data/groupMatches';
  import { matchInstant } from '../lib/time';
  import { store } from '../lib/store.svelte';
  import StandingsTable from './StandingsTable.svelte';
  import MatchCard from './MatchCard.svelte';
  import Modal from './Modal.svelte';

  let { group }: { group: GroupId } = $props();

  const matches = groupMatches
    .filter((m) => m.group === group)
    .sort((a, b) => matchInstant(a).getTime() - matchInstant(b).getTime());

  // Próximo partido: el primero sin resultado cargado; si están todos jugados, el último.
  const nextMatch = $derived(
    matches.find((m) => !store.results[m.id]) ?? matches[matches.length - 1]
  );
  const allPlayed = $derived(matches.every((m) => store.results[m.id]));

  let showAll = $state(false);
</script>

<section class="group card">
  <header class="g-head">
    <span class="g-tag">Grupo {group}</span>
    <button class="toggle" onclick={() => (showAll = true)}>
      Ver los {matches.length} partidos
    </button>
  </header>

  <StandingsTable {group} />

  <div class="g-next">
    <span class="next-label eyebrow">{allPlayed ? 'Último partido' : 'Próximo partido'}</span>
    {#key `${store.rev}-${nextMatch.id}`}
      <MatchCard match={nextMatch} homeId={nextMatch.homeId} awayId={nextMatch.awayId} />
    {/key}
  </div>
</section>

<Modal bind:open={showAll} title={`Grupo ${group} · todos los partidos`}>
  {#key store.rev}
    <div class="g-matches">
      {#each matches as m (m.id)}
        <MatchCard match={m} homeId={m.homeId} awayId={m.awayId} />
      {/each}
    </div>
  {/key}
</Modal>

<style>
  .group { padding: 0.9rem; display: flex; flex-direction: column; gap: 0.8rem; }
  .g-head { display: flex; align-items: center; justify-content: space-between; }
  .g-tag {
    color: var(--accent);
    border: 1px solid rgba(198, 255, 63, 0.25);
    border-radius: 20px;
    padding: 0.25rem 0.7rem;
    font-size: 0.74rem;
    font-family: var(--font-narrow);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
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
  .g-next { display: flex; flex-direction: column; gap: 0.4rem; }
  .next-label { color: var(--muted-2); }
  .g-matches { display: flex; flex-direction: column; gap: 0.5rem; }
</style>
