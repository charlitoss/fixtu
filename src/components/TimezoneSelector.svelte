<script lang="ts">
  import { tzOptions } from '../lib/time';
  import { store } from '../lib/store.svelte';
</script>

<label class="tz">
  <span class="ico">🕑</span>
  <select bind:value={store.tzId} aria-label="Huso horario">
    {#each tzOptions as opt}
      <option value={opt.id}>{opt.label}</option>
    {/each}
  </select>
</label>

<style>
  .tz {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--bg-2);
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 0.3rem 0.7rem;
    min-width: 0;
    max-width: 100%;
  }
  .ico { font-size: 0.9rem; flex-shrink: 0; }
  select {
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 0.82rem;
    font-weight: 600;
    font-family: var(--font-narrow);
    min-width: 0;
    max-width: 100%;
  }
  select:focus { outline: none; }
  select option { background: var(--bg-2); color: var(--text); font-family: var(--font-body); }
</style>
