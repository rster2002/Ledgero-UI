<span {style} class="{navigation && 'navigationEnabled'} {navigation && category !== null && 'navigation'}" on:click={openCategory}>
  {#if icon}
    {#if category}
      <CategoryIcon />
    {:else}
      <NoCategoryIcon />
    {/if}
  {/if}

  {categoryName}
</span>

<script lang="ts">
// Imports
import textColorBasedOnHex from "@/utils/textForBackground";
import { push } from "svelte-spa-router";
import SlimCategoryDTO from "@/models/dto/categories/SlimCategoryDTO";

// Components
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import NoCategoryIcon from "@/components/icons/NoCategoryIcon.svelte";

// Props
export var category: SlimCategoryDTO | null;
export var navigation: boolean = false;
export var icon = true;

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

    push(`/categories/${category.id}`);
}
</script>

<style lang="scss">

span {
    max-width: 10em;

    display: inline-block;
    position: relative;
    padding: 0.2em 0.5em;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: var(--header-face);
    border-radius: var(--border-radius-full);
    background-color: #f1f1f1;

    &.navigationEnabled {
        cursor: inherit;
    }

    &.navigation {
        cursor: pointer;
    }
}

</style>
