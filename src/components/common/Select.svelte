<div
  class="ref"
  use:floatingRef
  on:click={() => open = true}
>
  <InputWrapper {label} padding>
    <slot name="selected" />
  </InputWrapper>
</div>

<div
  class="options {open && 'open'}"
  use:floatingContent
  use:inject
  bind:this={selectEl}
>
  <slot />
</div>

{#if open}
  <div class="scim" on:click|self={() => open = false}></div>
{/if}

<script lang="ts">
// Imports
//@ts-ignore
import inject from "svelte-inject";
import { offset, flip, size, shift } from "svelte-floating-ui/dom";
import { createFloatingActions } from "svelte-floating-ui";

// Components
import InputWrapper from "@/components/fragments/InputWrapper.svelte";
import { onMount } from "svelte";
import { onSelectSymbol, selectRootSymbol } from "@/components/common/Select/sharedSymbols";

// Props
export var label: string;
export var value: unknown[];
export var open: boolean = false;

// Data
let selectEl: HTMLDivElement;

// Functions
function onSelect(newValue: unknown[]) {
    value = newValue;
}

// Actions
const [floatingRef, floatingContent] = createFloatingActions({
    placement: "bottom-start",
    strategy: "fixed",
    middleware: [
        offset(),
        shift(),
        flip(),
        size({
            apply({availableWidth, availableHeight, elements}) {
                // Do things with the data, e.g.
                Object.assign(elements.floating.style, {
                    maxWidth: `${availableWidth}px`,
                    maxHeight: `${availableHeight - 16}px`,
                });
            },
        }),
    ],
});

// Lifecycle
onMount(() => {
    selectEl[selectRootSymbol] = true;
    selectEl[onSelectSymbol] = onSelect;
});
</script>

<style lang="scss">

.scim {
    height: 100%;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 127;
}

.options {
    position: fixed;
    padding: 0.5em 0;
    z-index: 128;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: auto;

    background-color: #fff;
    border: 1px solid #cecece;
    display: none;

    &.open {
        display: flex;
    }
    //box-shadow: var(--box-shadow);
    //border-radius: var(--border-radius-small);
}

</style>
