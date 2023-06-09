<Chip color={subcategoryColor}>
  {#if icon}
    {#if subcategory}
      <SubcategoryIcon />
    {:else}
      <NoCategoryIcon />
    {/if}
  {/if}

  {subcategoryName}
</Chip>

<script lang="ts">
// Imports
import textColorBasedOnHex, { lighten } from "@/utils/textForBackground";
import type SlimSubcategoryDTO from "@/models/dto/categories/subcategories/SlimSubcategoryDTO";

// Components
import NoCategoryIcon from "@/components/icons/NoCategoryIcon.svelte";
import SubcategoryIcon from "@/components/icons/SubcategoryIcon.svelte";
import Chip from "@/components/spans/Chip.svelte";

// Props
export var subcategory: SlimSubcategoryDTO | null;
export var navigation: boolean = false;
export var icon = true;

// Computed
$: subcategoryName = subcategory?.name ?? "No subcategory";
$: subcategoryColor = subcategory?.hexColor ?? "f1f1f1";
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
