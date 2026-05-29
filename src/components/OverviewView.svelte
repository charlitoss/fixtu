<script lang="ts">
  import GroupsView from './GroupsView.svelte';
  import CalendarView from './CalendarView.svelte';
</script>

<div class="overview">
  <section class="groups-col">
    <GroupsView />
  </section>

  <aside class="cal-col">
    <h2 class="cal-title">
      <span class="dot"></span>Calendario
    </h2>
    <CalendarView />
  </aside>
</div>

<style>
  .overview {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.6rem;
    align-items: start;
  }
  .groups-col { min-width: 0; }
  .cal-col {
    min-width: 0;
    position: sticky;
    top: 4.2rem;
    max-height: calc(100vh - 5rem);
    overflow-y: auto;
    padding-right: 0.25rem;
  }
  .cal-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted);
    margin: 0 0 0.9rem;
  }
  .cal-title .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }

  @media (max-width: 900px) {
    .overview { grid-template-columns: 1fr; }
    .cal-col {
      position: static;
      max-height: none;
      overflow: visible;
      padding-right: 0;
    }
  }
</style>
