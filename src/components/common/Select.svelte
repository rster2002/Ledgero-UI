<div class="select" on:click={() => selectOpen = true}>
  {#if value}
    <slot name="currentValue" item={value}>
      <slot item={value} />
    </slot>
  {:else}
    <slot name="noValue" item={value}>
      <slot name="currentValue" item={value}>
        <slot item={value} />
      </slot>
    </slot>
  {/if}
</div>

<Popup bind:open={selectOpen} min noPadding>
  <div class="popupContent">
    {#if searchKey !== null}
      <input
        type="text"
        placeholder="Search options"
        bind:value={query}
        use:focus
        on:keydown={onKeydown}
      />
    {/if}

    <div class="options">
      {#each filteredItems as item, i}
        <div
          class="option {i === focusedItemIndex && 'focus'}"
          on:click={() => selectItem(item)}
        >
          <slot {item} />
        </div>
      {/each}
    </div>
  </div>
</Popup>

<script lang="ts">
// Imports
import focus from "@/actions/focus";
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Components
import Popup from "@/components/common/Popup.svelte";

// Props
export var items: unknown[];
export var value: unknown = null;
export var searchKey: (x: unknown) => string = null;

// Data
let focusedItemIndex = 0;
let query = "";
let selectOpen = false;

// Computed
$: filteredItems = filterList(items, query, searchKey);
$: {
    filteredItems;
    focusedItemIndex = 0;
}
$: {
    if (!selectOpen) {
        query = "";
        focusedItemIndex = 0;
    }
}

// Functions
function filterList(items: unknown[], query: string, searchKey: (x: unknown) => string | null): unknown[] {
    if (searchKey === null) {
        return items;
    }

    return items.filter((item) => {
        let key = searchKey(item).toLowerCase();
        return key.includes(query.toLowerCase());
    });
}

function selectItem(item: unknown) {
    value = item;
    selectOpen = false;
    dispatch("change", item);
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
        let item = filteredItems[focusedItemIndex];

        if (item) {
            selectItem(item);
            return;
        }
    }

    if (e.key === "Escape") {
        close();
        return;
    }

    if (e.key === "ArrowDown" || e.key === "Tab") {
        e.preventDefault();
        focusedItemIndex++;
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        focusedItemIndex--;
    }

    if (focusedItemIndex >= filteredItems.length) {
        focusedItemIndex = 0;
    }

    if (focusedItemIndex < 0) {
        focusedItemIndex = filteredItems.length - 1;
    }
}
</script>

<style lang="scss">

.select {
    display: contents;

    cursor: pointer;
}

.popupContent {
    width: 300px;

    input {
        padding: 1em;
        box-sizing: border-box;
        font-family: var(--font-family);

        border: 0;
        outline: 0;
        font-size: 1em;
    }

    .option {
        width: 100%;
        max-height: 400px;

        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.5em 1em;

        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        border: 2px solid transparent;
        box-sizing: border-box;
        border-radius: var(--border-radius-small);

        &.focus {
            border-color: var(--accent-color);
        }

        &:hover {
            background-color: var(--backdrop);
        }
    }
}

</style>
