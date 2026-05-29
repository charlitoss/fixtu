<script lang="ts">
  import { groupIds } from '../lib/data/teams';
  import GroupCard from './GroupCard.svelte';
</script>

<div class="intro">
  <p class="lead">
    Cargá los resultados tocando los casilleros de cada partido. Las posiciones se
    recalculan solas. <span class="hint">Los dos primeros</span> de cada grupo y los
    <span class="hint gold">8 mejores terceros</span> avanzan a la ronda de 32.
  </p>
</div>

<div class="grid">
  {#each groupIds as g}
    <GroupCard group={g} />
  {/each}
</div>

<style>
  .intro { margin-bottom: 1rem; }
  .lead { color: var(--muted); font-size: 0.92rem; line-height: 1.5; max-width: 60ch; margin: 0; }
  .hint { color: var(--accent); font-weight: 600; }
  .hint.gold { color: var(--gold); }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1rem;
    align-items: start;
  }
</style>
