<div class="selectWrapper" on:click={() => selectOpen = true}>
  {#if currentValue}
    <slot name="currentValue" item={currentValue}>
      <slot item={currentValue} />
    </slot>
  {:else}
    <slot name="noValue" item={currentValue}>
      <slot name="currentValue" item={currentValue}>
        <slot item={currentValue} />
      </slot>
    </slot>
  {/if}
  <label>{label}</label>
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
export var label: string;
export var items: unknown[];
export var value: unknown = null;
export var searchKey: (x: unknown) => string = null;
export var valueKey: (x: unknown) => unknown = null;

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
$: selectedIndex = getSelectedIndex(value, items);
$: currentValue = items[selectedIndex] ?? null;
$: {
    if (!selectOpen) {
        query = "";
        focusedItemIndex = 0;
    }
}

// Functions
function getSelectedIndex(selectedValue: unknown, items: unknown[]): number {
    if (valueKey) {
        return items.findIndex(item => valueKey(item) === selectedValue);
    } else {
        return items.findIndex(item => item === selectedValue);
    }
}

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
    value = valueKey ? valueKey(item) : item;
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

.selectWrapper {
    width: 100%;

    position: relative;
    padding: 0.75em 0.75em 0.25em;
    box-sizing: border-box;

    border-radius: 0.5em;
    color: var(--text-on-background);
    font-weight: bold;
    outline: 0;
    border: 2px solid var(--accent-color);
    font-family: var(--font-family);
    cursor: pointer;

    label {
        position: absolute;
        padding: 0 0.3em;
        left: 0.9em;
        top: -0.7em;

        font-size: 0.75em;
        font-weight: 700;
        transition: all 150ms var(--standard-easing);
        background-color: var(--background);
        cursor: text;
        color: var(--accent-color);
    }

    //input {
    //
    //
    //    &:focus ~ label,
    //    &:not(:placeholder-shown) ~ label {

    //    }
    //}
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
