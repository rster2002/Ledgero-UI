<div
  class="optionsContainer {open && 'open'}"
  use:action
  bind:this={parent}
>
  <slot />
</div>

<script lang="ts">
// Imports
import { nestedOptionsIndicator, onSelectSymbol } from "@/components/common/Select/sharedSymbols";
import { onMount } from "svelte";

// Props
export let parent: HTMLElement;
export var open: boolean = false;
export var action: any = () => {};

// Functions
function onSelect(value: unknown[]) {
    parent.parentElement[onSelectSymbol]?.(value);
}

// Lifecycle
onMount(() => {
    parent[onSelectSymbol] = onSelect;
    parent[nestedOptionsIndicator] = true;
});
</script>

<style lang="scss">

.optionsContainer {
    position: fixed;
    padding: 0.5em 0;
    z-index: 128;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: hidden;
    display: none;

    background-color: #fff;
    border: 1px solid #cecece;

    &.open {
        display: flex;
    }
    //box-shadow: var(--box-shadow);
    //border-radius: var(--border-radius-small);
    //border-top-left-radius: 0;
}

</style>
