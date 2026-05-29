<script lang="ts">
  import { teamsById } from '../lib/data/teams';
  import { flagEmoji } from '../lib/flags';
  import { store } from '../lib/store.svelte';

  let {
    teamId,
    placeholder = 'A definir',
    align = 'left',
    size = 'md',
    muted = false
  }: {
    teamId?: string;
    placeholder?: string;
    align?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg';
    muted?: boolean;
  } = $props();

  const team = $derived(teamId ? teamsById[teamId] : undefined);
  const isFav = $derived(!!team && store.favorite === team.id);
</script>

<span class="team {align} {size}" class:fav={isFav} class:placeholder={!team}>
  {#if align === 'right'}
    <span class="name" class:muted>{team ? team.name : placeholder}</span>
    <span class="flag" class:empty={!team}>{team ? flagEmoji(team.flag) : '⚪'}</span>
  {:else}
    <span class="flag" class:empty={!team}>{team ? flagEmoji(team.flag) : '⚪'}</span>
    <span class="name" class:muted>{team ? team.name : placeholder}</span>
  {/if}
</span>

<style>
  .team {
    display: inline-flex;
    align-items: center;
    gap: 0.55em;
    min-width: 0;
  }
  .team.right { flex-direction: row; justify-content: flex-end; text-align: right; }
  .flag { font-size: 1.25em; flex-shrink: 0; }
  .flag.empty { opacity: 0.4; }
  .name {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.01em;
    min-width: 0;
  }
  .name.muted { color: var(--muted); }
  .sm .name { font-size: 0.86rem; }
  .sm .flag { font-size: 1.1em; }
  .lg .name { font-size: 1.15rem; font-weight: 700; }
  .placeholder .name { color: var(--muted-2); font-style: italic; font-weight: 500; }

  .team.fav .name { color: var(--arg); }
  .team.fav .name::after {
    content: '★';
    margin-left: 0.4em;
    font-size: 0.7em;
    color: var(--arg);
    vertical-align: 0.1em;
  }
</style>
