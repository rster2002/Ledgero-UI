<span {style} class="{navigation && 'navigationEnabled'} {navigation && subcategory !== null && 'navigation'}">
  {#if icon}
    {#if subcategory}
      <SubcategoryIcon />
    {:else}
      <NoCategoryIcon />
    {/if}
  {/if}

  {categoryName}
</span>

<script lang="ts">
// Imports
import textColorBasedOnHex from "@/utils/textForBackground";
import type SlimSubcategoryDTO from "@/models/dto/categories/subcategories/SlimSubcategoryDTO";

// Components
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import NoCategoryIcon from "@/components/icons/NoCategoryIcon.svelte";
import SubcategoryIcon from "@/components/icons/SubcategoryIcon.svelte";

// Props
export var subcategory: SlimSubcategoryDTO | null;
export var navigation: boolean = false;
export var icon = true;

// Computed
$: categoryName = subcategory?.name ?? "No subcategory";
$: backgroundColor = subcategory?.hexColor ?? "f1f1f1";
$: foregroundColor = textColorBasedOnHex(backgroundColor);
$: style = `background-color: #${backgroundColor}; color: #${foregroundColor};`
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
    border-radius: var(--border-radius-tiny);
    background-color: #f1f1f1;

    &.navigationEnabled {
        cursor: inherit;
    }

    &.navigation {
        cursor: pointer;
    }
}

</style>
