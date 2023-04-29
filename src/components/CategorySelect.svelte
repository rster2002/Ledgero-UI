{JSON.stringify(path)}

<Select {label} bind:value={path}>
  <svelte:fragment slot="selected">
    <FullCategorySpan />
  </svelte:fragment>

  <Option value={null}>
    <CategorySpan category={null} />
  </Option>

  {#each categories as category}
    <Option value={category.id}>
      <CategorySpan {category} />

      {#if category.subcategories.length > 0}
        <NestedOptions>
          {#each category.subcategories as subcategory}
            <Option value={subcategory.id}>
              <SubcategorySpan {subcategory} />
            </Option>
          {/each}
        </NestedOptions>
      {/if}
    </Option>
  {/each}
</Select>

<script lang="ts">
// Imports
import CategoryService from "@/services/CategoryService";

// Components
import InputWrapper from "@/components/fragments/InputWrapper.svelte";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import Select from "@/components/common/Select.svelte";
import Option from "@/components/common/Select/Option.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import SubcategorySpan from "@/components/spans/SubcategorySpan.svelte";
import NestedOptions from "@/components/common/Select/NestedOptions.svelte";
import FullCategorySpan from "@/components/spans/FullCategorySpan.svelte";

// Props
export var categoryId: string | null = null;
export var subcategoryId: string | null = null;
export var label: string = "Category";

// Data
const categoriesService = new CategoryService();
let categories: CategoryDTO[] = [];
let path: [string?, string?] = [];

// Computed
$: selectedCategory = getSelectedCategory(categories, path);

// Functions
async function refresh() {
    categories = await categoriesService.getAllCategories();
}

function getSelectedCategory(categories: CategoryDTO[], path: [string?, string?]) {

}

const promise = refresh();
</script>
