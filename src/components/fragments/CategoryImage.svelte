<div
  class="categoryImage"
  style="
    border-color: {borderColor};
    --light-color: {lightBackgroundColor};
    --light-front: {lightForegroundColor};
    --dark-color: {darkBackgroundColor};
    --dark-front: {darkForegroundColor}
  "
>
  {#if subcategory}
    <SubcategoryIcon />
  {:else if category}
    <CategoryIcon />
  {:else}
    <NoCategoryIcon />
  {/if}
</div>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";
import {lighten} from "@/utils/textForBackground";

// Components
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import NoCategoryIcon from "@/components/icons/NoCategoryIcon.svelte";
import SubcategoryIcon from "@/components/icons/SubcategoryIcon.svelte";

// Props
export var category: CategoryDTO | null;
export var subcategory: SubcategoryDTO | null | undefined;

// Computed
$: color = subcategory?.hexColor ?? category?.hexColor ?? "e3e3e3";
$: borderColor = color ? `#${color}` : "var(--md-sys-color-outline)";
$: lightBackgroundColor = lighten(color ?? "ffffff", 0.85);
$: lightForegroundColor = "var(--md-ref-palette-neutral20)";
$: darkBackgroundColor = color ? lighten(color, 0.5) : "var(--md-sys-color-surface-variant)";
$: darkForegroundColor = color ? "#000000" : "var(--md-ref-palette-neutral90)";
</script>

<style lang="scss">
@use "../../scss/dp";

.categoryImage {
    $size: dp.dp(32);

    height: $size;
    width: $size;

    display: grid;
    place-items: center;

    border-radius: var(--md-sys-shape-corner-full);
    background-color: var(--light-color);
    color: var(--light-front);
    border: solid dp.dp(1);

    & > :global(svg) {
        font-size: dp.dp(16);
    }
}

</style>
