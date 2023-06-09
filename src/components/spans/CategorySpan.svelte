<Chip color={categoryColor}>
  {#if icon}
    {#if category}
      <CategoryIcon />
    {:else}
      <NoCategoryIcon />
    {/if}
  {/if}

  {categoryName}
</Chip>

<!--<span-->
<!--&lt;!&ndash;  class="chip {navigation && 'navigationEnabled'} {navigation && category !== null && 'navigation'}"&ndash;&gt;-->
<!--  on:click={openCategory}-->
<!--&gt;-->

<!--  {categoryName}-->
<!--</span>-->

<script lang="ts">
// Imports
import textColorBasedOnHex, { lighten } from "@/utils/textForBackground";
import { push } from "svelte-spa-router";
import SlimCategoryDTO from "@/models/dto/categories/SlimCategoryDTO";

// Components
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import NoCategoryIcon from "@/components/icons/NoCategoryIcon.svelte";
import Chip from "@/components/spans/Chip.svelte";

// Props
export var category: SlimCategoryDTO | null;
export var navigation: boolean = false;
export var icon = true;

// Computed
$: categoryName = category?.name ?? "No category";
$: categoryColor = category?.hexColor ?? "f1f1f1";
// $: borderColor = category?.hexColor ?? "f1f1f1";
// $: foregroundColor = textColorBasedOnHex(backgroundColor);
// $: lightened = lighten(backgroundColor, 0.85);
// $: style = `background-color: #${backgroundColor}; color: #${foregroundColor};`

// Functions
function openCategory() {
    if (category === null || !navigation) {
        return;
    }

    push(`/categories/${category.id}`);
}
</script>
