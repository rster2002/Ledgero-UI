<span style={style} class="{navigation && 'navigationEnabled'} {navigation && category !== null && 'navigation'}" on:click={openCategory}>
  {#if category}
    <CategoryIcon />
  {:else}
    <NoCategoryIcon />
  {/if}

  {categoryName}
</span>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import textColorBasedOnHex from "@/utils/textForBackground";

// Components
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import NoCategoryIcon from "@/components/icons/NoCategoryIcon.svelte";
import { push } from "svelte-spa-router";

// Props
export var category: CategoryDTO | null;
export var navigation: boolean = false;

// Computed
$: categoryName = category?.name ?? "No category";
$: backgroundColor = category?.hexColor ?? "f1f1f1";
$: foregroundColor = textColorBasedOnHex(backgroundColor);
$: style = `background-color: #${backgroundColor}; color: #${foregroundColor};`

// Functions
function openCategory() {
    if (category === null || !navigation) {
        return;
    }

    push("/categories/" + category.id);
}
</script>

<style lang="scss">

span {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    padding: 0.2em 0.5em;

    font-family: var(--header-face);
    border-radius: var(--border-radius-round);
    background-color: #f1f1f1;

    &.navigationEnabled {
        cursor: default;
    }

    &.navigation {
        cursor: pointer;
    }
}

</style>
