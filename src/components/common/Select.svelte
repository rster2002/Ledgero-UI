<div
  class="ref"
  bind:this={targetEl}
  on:click={() => open = true}
>
  <InputWrapper {label} padding>
    <slot name="selected" />
  </InputWrapper>
</div>

<OptionsContainer
  bind:parent={selectEl}
  action={inject}
  open={open}
>
  <slot />
</OptionsContainer>

<!--<div-->
<!--  class="options {open && 'open'}"-->
<!--  use:floatingContent-->
<!--  use:inject-->
<!--  bind:this={selectEl}-->
<!--&gt;-->
<!--  <slot />-->
<!--</div>-->

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

// Components
import InputWrapper from "@/components/fragments/InputWrapper.svelte";
import { onMount } from "svelte";
import { onSelectSymbol, selectRootSymbol } from "@/components/common/Select/sharedSymbols";
import OptionsContainer from "@/components/common/Select/OptionsContainer.svelte";
import applyAction from "@/utils/applyAction";
import type { Action } from "@/utils/applyAction";

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

    console.log(targetEl, selectEl);
    applyAction(targetEl, floatingRef as Action<unknown>);
    applyAction(selectEl, floatingContent as Action<unknown>);
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
    overflow-y: hidden;

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
