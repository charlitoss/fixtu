<script lang="ts">
  import { untrack } from 'svelte';
  import type { Match } from '../lib/types';
  import { store } from '../lib/store.svelte';
  import { formatKickoff } from '../lib/time';
  import { venues } from '../lib/data/venues';
  import { teams } from '../lib/data/teams';
  import TeamLabel from './TeamLabel.svelte';

  let {
    match,
    homeId,
    awayId,
    editableTeams = false,
    showGroupTag = false,
    homeSlotText = '',
    awaySlotText = ''
  }: {
    match: Match;
    homeId?: string;
    awayId?: string;
    editableTeams?: boolean;
    showGroupTag?: boolean;
    homeSlotText?: string;
    awaySlotText?: string;
  } = $props();

  const isKnockout = $derived(match.stage !== 'group');

  // Estado local de los inputs (se inicializa una vez desde el store).
  const initial = untrack(() => store.results[match.id]);
  let homeVal = $state(initial ? String(initial.homeGoals) : '');
  let awayVal = $state(initial ? String(initial.awayGoals) : '');

  const time = $derived(formatKickoff(match, store.tz));
  const venue = $derived(venues[match.venueId]);
  const res = $derived(store.results[match.id]);
  const bothTeams = $derived(!!homeId && !!awayId);
  const isDraw = $derived(
    homeVal !== '' && awayVal !== '' && Number(homeVal) === Number(awayVal)
  );

  function commit() {
    const h = homeVal.trim();
    const a = awayVal.trim();
    if (h === '' || a === '' || isNaN(Number(h)) || isNaN(Number(a))) {
      store.clearResult(match.id);
      return;
    }
    const prev = store.results[match.id];
    const shoot = isKnockout ? (prev?.shootoutWinner ?? null) : null;
    store.setResult(match.id, Math.max(0, Number(h)), Math.max(0, Number(a)), shoot);
  }

  function setShootout(side: 'home' | 'away') {
    store.setResult(match.id, Number(homeVal), Number(awayVal), side);
  }

  function clear() {
    homeVal = '';
    awayVal = '';
    store.clearResult(match.id);
  }

  const sortedTeams = [...teams].sort(
    (a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name, 'es')
  );
</script>

<div class="match card" class:played={!!res}>
  <div class="when">
    <span class="date mono">{time.date}</span>
    <span class="time mono">{time.time}</span>
  </div>

  <div class="contest">
    <div class="side home">
      {#if editableTeams}
        <select
          class="teampick"
          value={homeId ?? ''}
          onchange={(e) => store.setKnockoutTeam(match.id, 'home', e.currentTarget.value)}
        >
          <option value="">{homeSlotText || 'Local'}</option>
          {#each sortedTeams as t}
            <option value={t.id}>{t.group} · {t.name}</option>
          {/each}
        </select>
      {:else}
        <TeamLabel teamId={homeId} placeholder={homeSlotText || 'A definir'} />
      {/if}
    </div>

    <div class="score">
      {#if bothTeams}
        <input
          class="goals mono"
          type="number"
          min="0"
          inputmode="numeric"
          placeholder="–"
          bind:value={homeVal}
          oninput={commit}
          aria-label="Goles local"
        />
        <span class="colon">:</span>
        <input
          class="goals mono"
          type="number"
          min="0"
          inputmode="numeric"
          placeholder="–"
          bind:value={awayVal}
          oninput={commit}
          aria-label="Goles visitante"
        />
      {:else}
        <span class="vs">vs</span>
      {/if}
    </div>

    <div class="side away">
      {#if editableTeams}
        <select
          class="teampick"
          value={awayId ?? ''}
          onchange={(e) => store.setKnockoutTeam(match.id, 'away', e.currentTarget.value)}
        >
          <option value="">{awaySlotText || 'Visitante'}</option>
          {#each sortedTeams as t}
            <option value={t.id}>{t.group} · {t.name}</option>
          {/each}
        </select>
      {:else}
        <TeamLabel teamId={awayId} placeholder={awaySlotText || 'A definir'} align="right" />
      {/if}
    </div>
  </div>

  <div class="meta">
    {#if showGroupTag && match.group}
      <span class="tag group">Grupo {match.group}</span>
    {/if}
    <span class="venue">{venue.name} · {venue.city}</span>
    {#if res}
      <button class="clear" onclick={clear} title="Borrar resultado">limpiar</button>
    {/if}
  </div>

  {#if isKnockout && bothTeams && isDraw}
    <div class="shootout">
      <span class="pen-label">Penales · pasa:</span>
      <button class:active={res?.shootoutWinner === 'home'} onclick={() => setShootout('home')}>Local</button>
      <button class:active={res?.shootoutWinner === 'away'} onclick={() => setShootout('away')}>Visitante</button>
    </div>
  {/if}
</div>

<style>
  .match {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'when'
      'contest'
      'meta';
    gap: 0.45rem;
    padding: 0.7rem 0.85rem;
    transition: border-color 0.15s, background 0.15s;
  }
  .match:hover { border-color: var(--line-strong); }
  .match.played { border-left: 2px solid var(--accent-dim); }

  .when {
    grid-area: when;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    gap: 0.5rem;
    line-height: 1.2;
    border-bottom: 1px solid var(--line);
    padding-bottom: 0.4rem;
  }
  .date { font-size: 0.74rem; color: var(--muted); text-transform: capitalize; }
  .time { font-size: 1rem; font-weight: 700; color: var(--text); }

  .contest {
    grid-area: contest;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 0.6rem;
  }
  .side { min-width: 0; }
  .side.home { justify-self: start; }
  .side.away { justify-self: end; text-align: right; }
  .side.away :global(.team) { justify-content: flex-end; }

  .score {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    justify-self: center;
  }
  .vs { color: var(--muted-2); font-size: 0.8rem; font-family: var(--font-narrow); text-transform: uppercase; letter-spacing: 0.1em; }
  .colon { color: var(--muted); font-weight: 700; }
  .goals {
    width: 2.4ch;
    text-align: center;
    background: var(--bg-3);
    border: 1px solid var(--line);
    border-radius: 7px;
    color: var(--text);
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.25rem 0.1rem;
    -moz-appearance: textfield;
    appearance: textfield;
  }
  .goals::-webkit-outer-spin-button,
  .goals::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .goals:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(198, 255, 63, 0.12); }

  .teampick {
    max-width: 100%;
    background: var(--bg-3);
    border: 1px solid var(--line);
    border-radius: 7px;
    color: var(--text);
    padding: 0.3rem 0.4rem;
    font-size: 0.82rem;
    font-weight: 600;
  }
  .teampick:focus { outline: none; border-color: var(--gold); }
  .side.away .teampick { text-align: right; }

  .meta {
    grid-area: meta;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    font-size: 0.72rem;
    color: var(--muted-2);
  }
  .venue { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tag.group {
    color: var(--accent);
    border: 1px solid rgba(198, 255, 63, 0.25);
    border-radius: 20px;
    padding: 0.05rem 0.5rem;
    font-family: var(--font-narrow);
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .clear {
    background: transparent;
    border: none;
    color: var(--muted-2);
    text-decoration: underline;
    font-size: 0.72rem;
    padding: 0;
  }
  .clear:hover { color: var(--loss); }

  .shootout {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0.45rem;
    margin-top: 0.1rem;
    border-top: 1px dashed var(--line);
  }
  .pen-label { font-size: 0.74rem; color: var(--gold); font-family: var(--font-narrow); text-transform: uppercase; letter-spacing: 0.06em; }
  .shootout button {
    background: var(--bg-3);
    border: 1px solid var(--line);
    color: var(--muted);
    border-radius: 20px;
    padding: 0.15rem 0.7rem;
    font-size: 0.76rem;
    font-weight: 600;
  }
  .shootout button.active { background: var(--gold); color: #1a1400; border-color: var(--gold); }

  @media (max-width: 560px) {
    .contest { gap: 0.3rem; }
    .side :global(.name) { font-size: 0.82rem; }
  }
</style>
