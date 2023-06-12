<div
  class="select"
  bind:this={targetEl}
  on:click={() => open = true}
>
  <InputWrapper {label} padding active>
    <slot name="selected" />
  </InputWrapper>
</div>

<OptionsContainer
  bind:root={selectEl}
  action={inject}
  open={open}
>
  <slot />
</OptionsContainer>

{#if open}
  <div
    class="scim"
    on:click|self={() => open = false}
    use:inject
  ></div>
{/if}

<script lang="ts">
// Imports
//@ts-ignore
import inject from "svelte-inject";
import { offset, flip, size, shift } from "svelte-floating-ui/dom";
import { createFloatingActions } from "svelte-floating-ui";
import { onMount } from "svelte";
import { onSelectSymbol, selectRootSymbol } from "@/components/common/Select/sharedSymbols";
import applyAction from "@/utils/applyAction";
import type { Action } from "@/utils/applyAction";
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Components
import InputWrapper from "@/components/fragments/InputWrapper.svelte";
import OptionsContainer from "@/components/common/Select/OptionsContainer.svelte";

// Props
export var label: string;
export var value: unknown[];
export var open: boolean = false;

// Data
let targetEl: HTMLDivElement;
let selectEl: HTMLElement;

// Functions
function onSelect(newValue: unknown[]) {
    value = newValue;
    open = false;
}

// Lifecycle
onMount(() => {
    selectEl[selectRootSymbol] = true;
    selectEl[onSelectSymbol] = onSelect;

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

    applyAction(targetEl, floatingRef as Action<unknown>);
    applyAction(selectEl, floatingContent as Action<unknown>);
});
</script>

<style lang="scss">

.select {
    cursor: default;
}

.scim {
    height: 100%;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 127;
}

.routeWrapper {
    position: fixed;
    padding: 0.5em 0;
    z-index: 128;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: hidden;

    background-color: #ffffff;
    border: 1px solid #cecece;
    display: none;

    &.open {
        display: flex;
    }
    //box-shadow: var(--box-shadow);
    //border-radius: var(--border-radius-small);
}

</style>
