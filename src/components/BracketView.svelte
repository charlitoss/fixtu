<script lang="ts">
  import { knockoutMatches } from '../lib/data/knockoutMatches';
  import { resolveKnockout } from '../lib/bracket';
  import { store } from '../lib/store.svelte';
  import type { Stage } from '../lib/types';
  import MatchCard from './MatchCard.svelte';

  const ko = $derived(resolveKnockout(store.results, store.knockoutTeams));

  const columns: { stage: Stage; title: string }[] = [
    { stage: 'r32', title: 'Ronda de 32' },
    { stage: 'r16', title: 'Octavos' },
    { stage: 'qf', title: 'Cuartos' },
    { stage: 'sf', title: 'Semifinales' },
    { stage: 'final', title: 'Final' }
  ];

  function matchesOf(stage: Stage) {
    return knockoutMatches.filter((m) => m.stage === stage);
  }
  const bronze = knockoutMatches.find((m) => m.stage === 'bronze')!;
</script>

<div class="intro">
  <p class="lead">
    En la <span class="hint">Ronda de 32</span> elegí los equipos clasificados desde los
    desplegables; en las rondas siguientes los ganadores avanzan automáticamente al cargar
    cada resultado. En partidos empatados, marcá quién pasa por <span class="hint gold">penales</span>.
  </p>
</div>

{#key store.rev}
  <div class="bracket">
    {#each columns as col}
      <div class="col">
        <h3 class="col-title">{col.title}</h3>
        <div class="col-matches" class:wide={col.stage === 'r32'}>
          {#each matchesOf(col.stage) as m (m.id)}
            <div class="slot">
              <span class="mno mono">M{m.id}</span>
              <MatchCard
                match={m}
                homeId={ko[m.id]?.homeId}
                awayId={ko[m.id]?.awayId}
                editableTeams={m.stage === 'r32'}
                homeSlotText={m.homeSlot ?? ''}
                awaySlotText={m.awaySlot ?? ''}
              />
            </div>
          {/each}

          {#if col.stage === 'final'}
            <h3 class="col-title bronze-title">Tercer puesto</h3>
            <div class="slot">
              <span class="mno mono">M{bronze.id}</span>
              <MatchCard
                match={bronze}
                homeId={ko[bronze.id]?.homeId}
                awayId={ko[bronze.id]?.awayId}
                homeSlotText={bronze.homeSlot ?? ''}
                awaySlotText={bronze.awaySlot ?? ''}
              />
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/key}

<style>
  .intro { margin-bottom: 1.2rem; }
  .lead { color: var(--muted); font-size: 0.92rem; line-height: 1.5; max-width: 70ch; margin: 0; }
  .hint { color: var(--accent); font-weight: 600; }
  .hint.gold { color: var(--gold); }

  .bracket {
    display: flex;
    gap: 1.1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    align-items: flex-start;
  }
  .col { flex: 0 0 auto; width: 340px; }
  .col-matches { display: flex; flex-direction: column; gap: 0.6rem; }
  .col-title {
    font-family: var(--font-narrow);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.8rem;
    color: var(--gold);
    margin-bottom: 0.8rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--line);
  }
  .bronze-title { margin-top: 1.4rem; color: var(--muted); }
  .slot { position: relative; }
  .mno {
    position: absolute;
    top: -7px;
    left: 10px;
    z-index: 1;
    font-size: 0.6rem;
    background: var(--bg-3);
    color: var(--muted-2);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 0 0.4rem;
  }

  @media (max-width: 720px) {
    .col { width: 300px; }
  }
</style>
