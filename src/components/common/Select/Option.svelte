<div
  class="option"
  bind:this={optionEl}
  on:click={onClick}
>
  <slot />

  {#if nestedOptionsEl !== null}
    <ChevronRightIcon />
  {/if}
</div>

<script lang="ts">
// Imports
import { nestedOptionsIndicator, onSelectSymbol, optionValueSymbol } from "@/components/common/Select/sharedSymbols";
import { onMount } from "svelte";
import { createFloatingActions } from "svelte-floating-ui";
import { flip, offset, shift, size } from "svelte-floating-ui/dom";
import applyAction from "@/utils/applyAction";
import type { Action } from "@/utils/applyAction";

// Components
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.svelte";

// Props
type $$Generic = unknown;
type T = $$Generic;
export var value: T;

// Data
let optionEl: HTMLDivElement;
let nestedOptionsEl: HTMLDivElement | null = null;
let open = false;

// Computed
$: setValue(optionEl, value);

// Functions
function setValue(el: HTMLDivElement, value: unknown) {
    if (el === undefined) {
        return;
    }

    el[optionValueSymbol] = value;
}

function onSelect(parentValue: unknown[]) {
    console.log("Option select", { value });
    optionEl.parentElement[onSelectSymbol]?.([value, ...parentValue]);
}

function onClick(event: PointerEvent) {
    let nestedIndex = event.composedPath()
        .findIndex(target => target[nestedOptionsIndicator]);

    let ownIndex = event.composedPath()
        .findIndex(target => target === optionEl);

    console.log(value, nestedIndex, ownIndex);
    if (nestedIndex === -1 || ownIndex < nestedIndex) {
        optionEl.parentElement[onSelectSymbol]?.([value]);
    }


    // if (!isNested) {
    //     optionEl.parentElement[onSelectSymbol]?.([value]);
    // }
}

// Lifecycle
onMount(() => {
    optionEl[onSelectSymbol] = onSelect;
    let possibleNestedOptions = optionEl.querySelector(".nestedOptions");

    if (possibleNestedOptions && possibleNestedOptions[nestedOptionsIndicator]) {
        nestedOptionsEl = possibleNestedOptions as HTMLDivElement;

        const [floatingRef, floatingContent] = createFloatingActions({
            placement: "right-start",
            strategy: "fixed",
            middleware: [
                offset({
                    mainAxis: 0,
                    crossAxis: -9,
                }),
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

        applyAction(optionEl, floatingRef as Action<unknown>);
        applyAction(nestedOptionsEl, floatingContent as Action<unknown>);
    }
});
</script>

<style lang="scss">

.option {
    padding: 0.4em 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.4em;
    align-items: center;
    pointer-events: auto;

    cursor: default;

    &:hover {
        background-color: #e7e7e7;

        & > :global(.nestedOptions) {
            display: flex;
        }
    }
}

</style>
