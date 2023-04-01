{#if subcategory === null}
  <CategorySpan {category} />
{:else}
  <SubcategorySpan {subcategory} />
{/if}

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";

// Components
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import SubcategorySpan from "@/components/spans/SubcategorySpan.svelte";

// Props
export var category: CategoryDTO | null;
export var subcategory: SubcategoryDTO | null;
</script>
