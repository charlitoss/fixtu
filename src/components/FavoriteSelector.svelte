<script lang="ts">
  import { teams } from '../lib/data/teams';
  import { store } from '../lib/store.svelte';
  import { flagEmoji } from '../lib/flags';

  const sorted = [...teams].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const favTeam = $derived(store.favorite ? teams.find((t) => t.id === store.favorite) : undefined);
</script>

<label class="fav">
  <span class="star">★</span>
  {#if favTeam}
    <span class="cur-flag">{flagEmoji(favTeam.flag)}</span>
  {/if}
  <select
    value={store.favorite ?? ''}
    onchange={(e) => store.setFavorite(e.currentTarget.value || null)}
    aria-label="Equipo favorito"
  >
    <option value="">Sin favorito</option>
    {#each sorted as t}
      <option value={t.id}>{t.name}</option>
    {/each}
  </select>
</label>

<style>
  .fav {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--bg-2);
    border: 1px solid rgba(121, 182, 230, 0.3);
    border-radius: 20px;
    padding: 0.3rem 0.7rem;
  }
  .star { color: var(--arg); font-size: 0.85rem; }
  .cur-flag { font-size: 1rem; }
  select {
    background: transparent;
    border: none;
    color: var(--arg);
    font-size: 0.82rem;
    font-weight: 700;
    font-family: var(--font-narrow);
  }
  select:focus { outline: none; }
  select option { background: var(--bg-2); color: var(--text); font-family: var(--font-body); }
</style>
