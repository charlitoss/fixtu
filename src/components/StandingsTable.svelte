<script lang="ts">
  import type { GroupId } from '../lib/types';
  import { store } from '../lib/store.svelte';
  import { computeStandings } from '../lib/standings';
  import { groupMatches } from '../lib/data/groupMatches';
  import { flagEmoji } from '../lib/flags';

  let { group }: { group: GroupId } = $props();

  const rows = $derived(computeStandings(group, groupMatches, store.results));
</script>

<table class="standings">
  <thead>
    <tr>
      <th class="pos">#</th>
      <th class="team">Equipo</th>
      <th>PJ</th>
      <th>G</th>
      <th>E</th>
      <th>P</th>
      <th class="hide-sm">GF</th>
      <th class="hide-sm">GC</th>
      <th>DG</th>
      <th class="pts">Pts</th>
    </tr>
  </thead>
  <tbody>
    {#each rows as row (row.team.id)}
      <tr
        class:qualify={row.rank <= 2}
        class:third={row.rank === 3}
      >
        <td class="pos mono">{row.rank}</td>
        <td class="team">
          <div class="team-inner">
            <span class="flag">{flagEmoji(row.team.flag)}</span>
            <span class="name">{row.team.name}</span>
          </div>
        </td>
        <td class="mono">{row.played}</td>
        <td class="mono">{row.won}</td>
        <td class="mono">{row.drawn}</td>
        <td class="mono">{row.lost}</td>
        <td class="mono hide-sm">{row.gf}</td>
        <td class="mono hide-sm">{row.ga}</td>
        <td class="mono dg">{row.gd > 0 ? '+' : ''}{row.gd}</td>
        <td class="pts mono">{row.points}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .standings {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.82rem;
  }
  thead th {
    font-family: var(--font-narrow);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.66rem;
    font-weight: 700;
    color: var(--muted-2);
    text-align: center;
    padding: 0.35rem 0.25rem;
    border-bottom: 1px solid var(--line);
  }
  thead th.team { text-align: left; padding-left: 0.2rem; }
  td {
    text-align: center;
    padding: 0.4rem 0.25rem;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
  }
  tbody tr:last-child td { border-bottom: none; }
  .pos { color: var(--muted-2); width: 1.6rem; }
  td.team {
    text-align: left;
    color: var(--text);
    font-weight: 600;
    width: 100%;
    max-width: 0;
  }
  .team-inner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }
  .team-inner .flag { font-size: 1.15em; flex-shrink: 0; }
  .team-inner .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
  .pts { color: var(--text); font-weight: 700; font-size: 0.95rem; }
  .dg { font-variant-numeric: tabular-nums; }

  tr.qualify .pos {
    color: var(--accent);
    font-weight: 700;
    position: relative;
  }
  tr.qualify .pos::before {
    content: '';
    position: absolute;
    left: -0.25rem;
    top: 20%;
    height: 60%;
    width: 3px;
    border-radius: 3px;
    background: var(--accent);
  }
  tr.third .pos { color: var(--gold); }

  @media (max-width: 560px) {
    .hide-sm { display: none; }
  }
</style>
