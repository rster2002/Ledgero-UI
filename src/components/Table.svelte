<div class="tableWrapper" bind:this={box}>
  <table>
    <thead>
      <slot name="header" />
    </thead>

    <tbody>
      {#each items as item}
        <tr class="{clickable && 'clickable'}" on:click={() => dispatchClick(item)}>
          <slot name="row" {item} />
        </tr>
      {/each}
    </tbody>

    <tfoot>
      <slot name="footer" />
    </tfoot>
  </table>
</div>

<script lang="ts">
// Imports
import { createEventDispatcher, onMount } from "svelte";
const dispatch = createEventDispatcher();

// Generic
type $$Generic = null;
type T = $$Generic;

// Props
export var items: T[];
export var clickable = false;

// Data
const observer = new ResizeObserver(() => {
    bounding = box?.getClientRects();
    calculateMaxWidth();
});
let box: HTMLElement = null;
let bounding: DOMRectList;
let maxWidth = [];

// Computed
$: {
    // It's probably possible with just CSS, but I've been stuck at this for a week now so this will have to do.
    box; items;
    bounding = box?.getClientRects();

    // Calculate the max width of 'wide' columns using ts
    if (bounding) {
        queueMicrotask(() => {
            calculateMaxWidth();
        });
    }
}

// Functions
function dispatchClick(item: T) {
    dispatch("click", item);
}

function calculateMaxWidth() {
    let [rect] = Array.from(bounding);
    let headerEls = Array.from(box.querySelectorAll("th"));

    let smallWidth = headerEls
        .filter(el => !el.classList.contains("wide"))
        .map(el => el.getClientRects())
        .reduce((acc, rect) => rect[0].width + acc, 0);

    let wideEls = headerEls
        .filter(el => el.classList.contains("wide"));

    let remainingWidth = rect.width - smallWidth;
    let widthPerEl = remainingWidth / wideEls.length;

    for (let i = 0; i < headerEls.length; i++) {
        let el = headerEls[i];

        if (el.classList.contains("wide")) {
            let computed = getComputedStyle(el);
            let paddingLeft = Number(computed.paddingLeft.replace("px", ""));
            let paddingRight = Number(computed.paddingRight.replace("px", ""));

            maxWidth[i] = widthPerEl - paddingLeft - paddingRight;
        }
    }

    let rows = Array.from(box.querySelectorAll("tr"));

    for (let row of rows) {
        let cols = row.querySelectorAll("td");

        for (let i = 0; i < cols.length; i++) {
            if (maxWidth[i]) {
                cols[i].style.maxWidth = maxWidth[i] + "px";
            }
        }
    }
}

// Life-cycle
onMount(() => {
    observer.observe(box);
});
</script>

<style lang="scss">

table {
    width: 100%;

    border-radius: var(--border-radius-small);
    border: 1px solid #cecece;
    padding: 0;
    border-spacing: 0;
    white-space: nowrap;
    background-color: var(--background);

    thead {
        background-color: var(--backdrop);
        border-radius: inherit;
    }

    tbody {
        tr {
            &.clickable {
                cursor: pointer;

                &:hover {
                    background-color: #f7f7f7;
                }
            }

            &:not(:last-child) {
                box-shadow: 0 1px 0 #e3e3e3;
            }
        }
    }
}

</style>
