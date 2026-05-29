<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    open = $bindable(false),
    title = '',
    children
  }: {
    open?: boolean;
    title?: string;
    children?: Snippet;
  } = $props();

  function close() {
    open = false;
  }

  function onBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) close();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:window onkeydown={open ? onKeydown : undefined} />

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="backdrop" onclick={onBackdrop} role="presentation">
    <div
      class="modal card"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabindex="-1"
    >
      <header class="m-head">
        <h3>{title}</h3>
        <button class="m-close" onclick={close} aria-label="Cerrar">✕</button>
      </header>
      <div class="m-body">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 4vh 1rem;
    overflow-y: auto;
  }
  .modal {
    width: 100%;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    max-height: 92vh;
    animation: fadeUp 0.16s ease;
  }
  .m-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--line);
  }
  .m-head h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text);
  }
  .m-close {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--muted);
    border-radius: 8px;
    width: 28px;
    height: 28px;
    line-height: 1;
    flex-shrink: 0;
  }
  .m-close:hover {
    border-color: var(--line-strong);
    color: var(--text);
  }
  .m-body {
    padding: 0.85rem;
    overflow-y: auto;
  }
</style>
