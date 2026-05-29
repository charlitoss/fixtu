<script lang="ts">
  import { teams, teamsById } from '../lib/data/teams';
  import { groupMatches } from '../lib/data/groupMatches';
  import { knockoutMatches } from '../lib/data/knockoutMatches';
  import { matchInstant } from '../lib/time';
  import { resolveKnockout } from '../lib/bracket';
  import { computeStandings } from '../lib/standings';
  import { store } from '../lib/store.svelte';
  import { flagEmoji } from '../lib/flags';
  import MatchCard from './MatchCard.svelte';

  const sorted = [...teams].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  let selected = $state(store.favorite ?? 'ARG');

  const team = $derived(teamsById[selected]);
  const ko = $derived(resolveKnockout(store.results, store.knockoutTeams));

  const groupGames = $derived(
    groupMatches
      .filter((m) => m.homeId === selected || m.awayId === selected)
      .sort((a, b) => matchInstant(a).getTime() - matchInstant(b).getTime())
  );

  const koGames = $derived(
    knockoutMatches.filter((m) => ko[m.id]?.homeId === selected || ko[m.id]?.awayId === selected)
  );

  const standing = $derived.by(() => {
    const table = computeStandings(team.group, groupMatches, store.results);
    return table.find((r) => r.team.id === selected);
  });

  const stageNames: Record<string, string> = {
    r32: 'Ronda de 32', r16: 'Octavos', qf: 'Cuartos', sf: 'Semifinal', bronze: 'Tercer puesto', final: 'Final'
  };
</script>

<div class="picker">
  <label class="eyebrow" for="team-select">Elegí un equipo</label>
  <div class="select-wrap">
    <span class="big-flag">{flagEmoji(team.flag)}</span>
    <select id="team-select" bind:value={selected}>
      {#each sorted as t}
        <option value={t.id}>{t.name} (Grupo {t.group})</option>
      {/each}
    </select>
  </div>
</div>

{#if standing}
  <div class="summary card">
    <div class="s-item"><span class="k">Grupo</span><span class="v">{team.group}</span></div>
    <div class="s-item"><span class="k">Pos.</span><span class="v">{standing.rank}º</span></div>
    <div class="s-item"><span class="k">PJ</span><span class="v">{standing.played}</span></div>
    <div class="s-item"><span class="k">Pts</span><span class="v hi">{standing.points}</span></div>
    <div class="s-item"><span class="k">DG</span><span class="v">{standing.gd > 0 ? '+' : ''}{standing.gd}</span></div>
  </div>
{/if}

{#key store.rev + selected}
  <h3 class="section-title">Fase de grupos</h3>
  <div class="list">
    {#each groupGames as m (m.id)}
      <MatchCard match={m} homeId={m.homeId} awayId={m.awayId} />
    {/each}
  </div>

  {#if koGames.length > 0}
    <h3 class="section-title">Eliminatorias</h3>
    <div class="list">
      {#each koGames as m (m.id)}
        <MatchCard
          match={m}
          homeId={ko[m.id]?.homeId}
          awayId={ko[m.id]?.awayId}
          homeSlotText={`${stageNames[m.stage]} · ${m.homeSlot ?? ''}`}
          awaySlotText={m.awaySlot ?? ''}
        />
      {/each}
    </div>
  {:else}
    <p class="empty">Cargá resultados en la pestaña <strong>Llave</strong> para ver a {team.name} en eliminatorias.</p>
  {/if}
{/key}

<style>
  .picker { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.45rem; }
  .select-wrap {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    background: var(--bg-2);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 0.5rem 0.8rem;
    max-width: 460px;
  }
  .big-flag { font-size: 2rem; line-height: 1; }
  select {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 1.15rem;
    font-weight: 700;
    font-family: var(--font-display);
  }
  select:focus { outline: none; }
  select option { background: var(--bg-2); color: var(--text); }

  .summary {
    display: flex;
    gap: 1.4rem;
    padding: 0.8rem 1.1rem;
    margin-bottom: 1.4rem;
    flex-wrap: wrap;
  }
  .s-item { display: flex; flex-direction: column; gap: 0.1rem; }
  .s-item .k { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-2); font-family: var(--font-narrow); }
  .s-item .v { font-size: 1.3rem; font-weight: 800; font-family: var(--font-mono); }
  .s-item .v.hi { color: var(--accent); }

  .section-title {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    font-family: var(--font-narrow);
    margin: 1.3rem 0 0.7rem;
  }
  .list { display: flex; flex-direction: column; gap: 0.5rem; }
  .empty { color: var(--muted-2); font-size: 0.88rem; }
</style>
