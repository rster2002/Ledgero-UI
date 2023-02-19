<div class="tableWrapper" bind:this={box}>
  <table>
    <thead>
      <slot name="header" />
    </thead>

    <tbody>
      {#each items as item}
        <tr>
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
// Generic
type $$Generic = null;
type T = $$Generic;

// Props
export var items: T[];

// Data
let box: HTMLElement = null;
let bounding: DOMRectList;
let maxWidth = [];

// Computed
$: {
    // It's probably possible with just CSS, but I've been
    // stuck at this for a week now so this will have
    // to do.

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

            console.log(paddingLeft, paddingRight);

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

    // let [rect] = Array.from(bounding);
    // let headerEls = Array.from(box.querySelectorAll("th"));
    //
    // let wideEls: HTMLElement[] = [];
    // let smallEls: HTMLElement[] = [];
    //
    // for (let el of headerEls) {
    //     if (!el.classList.contains("minimize")) {
    //         wideEls.push(el);
    //     } else {
    //         smallEls.push(el);
    //     }
    // }
    //

    //
    // let remainingWidth = rect.width - smallWidth;
    // let widthPerItem = (remainingWidth / wideEls.length) - headerEls.length * 3;
    //

    //
    // maxWidth = maxWidth;
}

// let thead: HTMLElement = null;
//
// // Life-cycle
// onMount(() => {
//     if (thead === null) {
//         throw new Error("Failed to mount");
//     }
//
//     const childEls = Array.from(thead.children);
//     const normalEls = childEls.filter(
//         (el) => !el.classList.contains("minimize")
//     ) as HTMLElement[];
//
//     for (const el of normalEls) {
//         el.style.width = `${100 / normalEls.length}%`;
//     }
// });
</script>

<style lang="scss">

table {
    width: 100%;

    border-radius: var(--border-radius-medium);
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
            &:not(:last-child) {
                box-shadow: 0 1px 0 #e3e3e3;
            }
        }
    }
}

</style>
