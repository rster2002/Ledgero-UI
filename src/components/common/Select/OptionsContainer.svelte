<div
  class="optionsContainer {open && 'open'}"
  use:action
  bind:this={root}
  on:wheel={onWheel}
>
  <div
    class="innerWrapper"
    bind:this={wrapperEl}
  >
    <slot />
  </div>

  {#if showScrollbar}
    <div class="scrollbar">
      <div class="bar" style="height: {barHeight}%; top: {barTop}%;"></div>
    </div>
  {/if}
</div>

<script lang="ts">
// Imports
import { nestedOptionsIndicator, onSelectSymbol } from "@/components/common/Select/sharedSymbols";
import { onMount } from "svelte";

// Props
export let root: HTMLElement;
export var open: boolean = false;
export var action: any = () => {};

// Data
let wrapperEl: HTMLElement;
let showScrollbar: boolean = false;
let barHeight = 100;
let barTop = 0;

// Functions
function onSelect(value: unknown[]) {
    root[onSelectSymbol]?.(value);
}

function onWheel(event: WheelEvent) {
    wrapperEl.scrollTop += event.deltaY;
    updateScrollbar();
}

function updateScrollbar() {
    if (!wrapperEl) {
        return;
    }

    showScrollbar = wrapperEl.clientHeight < wrapperEl.scrollHeight;
    barHeight = (wrapperEl.clientHeight / wrapperEl.scrollHeight) * 100;
    barTop = (wrapperEl.scrollTop / wrapperEl.scrollHeight) * 100;
}

// Lifecycle
onMount(() => {
    wrapperEl[onSelectSymbol] = onSelect;
    root[nestedOptionsIndicator] = true;

    const resizeObserver = new ResizeObserver(updateScrollbar);
    const mutationObserver = new MutationObserver(updateScrollbar);

    mutationObserver.observe(wrapperEl, {
        childList: true,
        subtree: false,
    });

    resizeObserver.observe(wrapperEl, {
        box: "border-box",
    });

    return {
        destroy() {
            mutationObserver.disconnect();
            resizeObserver.disconnect();
        }
    }
});
</script>

<style lang="scss">

.optionsContainer {
    position: fixed;
    z-index: 128;
    flex-direction: row;
    box-sizing: border-box;
    overflow-y: hidden;
    display: none;

    background-color: var(--md-sys-color-surface-variant);
    border: 1px solid #cecece;

    &.open {
        display: flex;
    }

    .innerWrapper {
        padding: 0.5em 0;
        overflow-y: hidden;
    }

    .scrollbar {
        width: 0.75em;

        background-color: #ebebeb;

        .bar {
            width: 100%;

            position: relative;

            background-color: #828282;
        }
    }
}

</style>
