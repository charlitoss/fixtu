<script lang="ts">
  import { store } from './lib/store.svelte';
  import TimezoneSelector from './components/TimezoneSelector.svelte';
  import OverviewView from './components/OverviewView.svelte';
  import GroupsView from './components/GroupsView.svelte';
  import CalendarView from './components/CalendarView.svelte';

  type Tab = 'fixture' | 'grupos' | 'calendario';
  let tab = $state<Tab>('fixture');

  // En mobile no entra la vista combinada: separamos grupos y calendario en pestañas.
  let isMobile = $state(false);
  $effect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const update = () => (isMobile = mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  });

  // Al cambiar de layout, normalizamos la pestaña activa entre los dos esquemas.
  $effect(() => {
    if (isMobile && tab === 'fixture') tab = 'grupos';
    else if (!isMobile && (tab === 'grupos' || tab === 'calendario')) tab = 'fixture';
  });

  const desktopTabs: { id: Tab; label: string }[] = [
    { id: 'fixture', label: 'Grupos y calendario' }
  ];
  const mobileTabs: { id: Tab; label: string }[] = [
    { id: 'grupos', label: 'Grupos' },
    { id: 'calendario', label: 'Calendario' }
  ];
  const tabs = $derived(isMobile ? mobileTabs : desktopTabs);

  function reset() {
    if (confirm('¿Borrar todos los resultados cargados? Esta acción no se puede deshacer.')) {
      store.resetAll();
    }
  }
</script>

<div class="shell">
  <header class="topbar">
    <img class="logo" src="/world-cup-logo.svg" alt="Mundial 2026" />

    <div class="controls">
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
    {#if tab === 'fixture'}
      <OverviewView />
    {:else if tab === 'grupos'}
      <GroupsView />
    {:else if tab === 'calendario'}
      <CalendarView />
    {/if}
  </main>

  <footer class="foot">
    <span>Datos del sorteo y calendario oficial (dic. 2025). Resultados cargados a mano y guardados en este navegador.</span>
  </footer>
</div>

<style>
  .shell { margin: 0 auto; padding: 1.4rem 1.1rem 4rem; }

  .topbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.3rem;
  }
  .logo {
    height: 92px;
    width: auto;
    display: block;
  }

  .controls { display: flex; align-items: center; justify-content: center; gap: 0.6rem; flex-wrap: wrap; }
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
    margin: 0 auto 1.6rem;
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
    .logo { height: 76px; }
  }
</style>
