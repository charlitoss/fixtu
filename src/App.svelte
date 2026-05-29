<script lang="ts">
  import { store } from './lib/store.svelte';
  import TimezoneSelector from './components/TimezoneSelector.svelte';
  import FavoriteSelector from './components/FavoriteSelector.svelte';
  import GroupsView from './components/GroupsView.svelte';
  import CalendarView from './components/CalendarView.svelte';
  import TeamView from './components/TeamView.svelte';
  import BracketView from './components/BracketView.svelte';

  type Tab = 'grupos' | 'calendario' | 'equipo' | 'llave';
  let tab = $state<Tab>('grupos');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'grupos', label: 'Grupos' },
    { id: 'calendario', label: 'Calendario' },
    { id: 'equipo', label: 'Por equipo' },
    { id: 'llave', label: 'Llave' }
  ];

  function reset() {
    if (confirm('¿Borrar todos los resultados cargados? Esta acción no se puede deshacer.')) {
      store.resetAll();
    }
  }
</script>

<div class="shell">
  <header class="topbar">
    <div class="brand">
      <div class="logo">
        <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
          <circle cx="16" cy="16" r="13" fill="none" stroke="var(--accent)" stroke-width="2" />
          <path d="M16 7l3.8 2.8-1.45 4.5h-4.7L12.2 9.8z" fill="var(--accent)" />
        </svg>
      </div>
      <div class="titles">
        <span class="kicker eyebrow">FIFA · USA · Canadá · México</span>
        <h1>Mundial <span class="year">2026</span> <span class="sub">Fixture</span></h1>
      </div>
    </div>

    <div class="controls">
      <FavoriteSelector />
      <TimezoneSelector />
      <button class="reset" onclick={reset} title="Borrar resultados">Reiniciar</button>
    </div>
  </header>

  <nav class="tabs">
    {#each tabs as t}
      <button class="tab" class:active={tab === t.id} onclick={() => (tab = t.id)}>
        {t.label}
      </button>
    {/each}
  </nav>

  <main class="content">
    {#if tab === 'grupos'}
      <GroupsView />
    {:else if tab === 'calendario'}
      <CalendarView />
    {:else if tab === 'equipo'}
      <TeamView />
    {:else if tab === 'llave'}
      <BracketView />
    {/if}
  </main>

  <footer class="foot">
    <span>Datos del sorteo y calendario oficial (dic. 2025). Resultados cargados a mano y guardados en este navegador.</span>
  </footer>
</div>

<style>
  .shell { max-width: var(--maxw); margin: 0 auto; padding: 1.4rem 1.1rem 4rem; }

  .topbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.3rem;
  }
  .brand { display: flex; align-items: center; gap: 0.8rem; }
  .logo {
    display: grid;
    place-items: center;
    background: var(--bg-2);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 0.4rem;
  }
  .titles { display: flex; flex-direction: column; gap: 0.15rem; }
  .kicker { color: var(--muted-2); }
  h1 {
    font-size: clamp(1.6rem, 4vw, 2.3rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.95;
  }
  .year { color: var(--accent); }
  .sub {
    font-family: var(--font-narrow);
    font-weight: 700;
    color: var(--muted);
    font-size: 0.5em;
    letter-spacing: 0.1em;
    vertical-align: 0.3em;
    margin-left: 0.2em;
  }

  .controls { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
  .reset {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--muted);
    border-radius: 20px;
    padding: 0.32rem 0.8rem;
    font-size: 0.78rem;
    font-family: var(--font-narrow);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .reset:hover { border-color: var(--loss); color: var(--loss); }

  .tabs {
    display: flex;
    gap: 0.3rem;
    background: var(--bg-2);
    border: 1px solid var(--line);
    border-radius: 30px;
    padding: 0.3rem;
    margin-bottom: 1.6rem;
    position: sticky;
    top: 0.6rem;
    z-index: 10;
    backdrop-filter: blur(8px);
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
  }
  .tab {
    background: transparent;
    border: none;
    color: var(--muted);
    padding: 0.45rem 1.1rem;
    border-radius: 30px;
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: color 0.15s, background 0.15s;
  }
  .tab:hover { color: var(--text); }
  .tab.active { background: var(--accent); color: #0a0d0b; }

  .content { animation: fadeUp 0.3s ease; }

  .foot {
    margin-top: 2.5rem;
    padding-top: 1.2rem;
    border-top: 1px solid var(--line);
    color: var(--muted-2);
    font-size: 0.75rem;
    line-height: 1.5;
  }

  @media (max-width: 560px) {
    .topbar { align-items: flex-start; }
    .controls { width: 100%; }
  }
</style>
