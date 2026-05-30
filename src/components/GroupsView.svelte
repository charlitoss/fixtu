<script lang="ts">
  import { groupIds } from '../lib/data/teams';
  import GroupCard from './GroupCard.svelte';
</script>

<div class="grid">
  {#each groupIds as g}
    <GroupCard group={g} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1rem;
    align-items: start;
  }
</style>
