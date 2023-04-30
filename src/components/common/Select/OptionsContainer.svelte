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
      <div class="bar"></div>
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

// Functions
function onSelect(value: unknown[]) {
    root[onSelectSymbol]?.(value);
}

function onWheel(event: WheelEvent) {
    wrapperEl.scrollTop += event.deltaY;
}

// Lifecycle
onMount(() => {
    wrapperEl[onSelectSymbol] = onSelect;
    root[nestedOptionsIndicator] = true;

    const observer = new MutationObserver(() => {
        if (!wrapperEl) {
            return;
        }

        showScrollbar = wrapperEl.clientHeight < wrapperEl.scrollHeight;
    });

    observer.observe(wrapperEl, {
        childList: true,
        subtree: false,
    });

    return {
        destroy() {
            observer.disconnect();
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

    background-color: #fff;
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
            background-color: red;
        }
    }
    //box-shadow: var(--box-shadow);
    //border-radius: var(--border-radius-small);
    //border-top-left-radius: 0;
}

</style>
