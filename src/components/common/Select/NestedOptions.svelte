<div class="nestedOptions" bind:this={el}>
  <slot />
</div>

<script lang="ts">
// Imports
import { onMount } from "svelte";
import { nestedOptionsIndicator, onSelectSymbol } from "@/components/common/Select/sharedSymbols";

// Data
let el: HTMLDivElement;

// Functions
function onSelect(value: unknown[]) {
    console.trace("Nested options", value);
    el.parentElement[onSelectSymbol]?.(value);
}

// Lifecycle
onMount(() => {
    el[nestedOptionsIndicator] = true;
    el[onSelectSymbol] = onSelect;
});
</script>

<style lang="scss">

.nestedOptions {
    position: fixed;
    padding: 0.5em 0;
    z-index: 128;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: auto;
    display: none;

    background-color: #fff;
    border: 1px solid #cecece;
    //box-shadow: var(--box-shadow);
    //border-radius: var(--border-radius-small);
    //border-top-left-radius: 0;
}

</style>
