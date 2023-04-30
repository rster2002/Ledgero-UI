<AsyncContent {promise}>
  <Select {label} bind:value={path}>
    <svelte:fragment slot="selected">
      <FullCategorySpan
        category={selectedCategory}
        subcategory={selectedSubcategory}
      />
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
</AsyncContent>

<script lang="ts">
// Imports
import CategoryService from "@/services/CategoryService";

// Components
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
let path: [string?, string?] = [categoryId, subcategoryId];

// Computed
$: [categoryId, subcategoryId] = path;
$: selectedCategory = getSelectedCategory(categories, path[0]);
$: selectedSubcategory = getSelectedSubcategory(selectedCategory, path[1]);

// Functions
async function refresh() {
    categories = await categoriesService.getAllCategories();
}

function getSelectedCategory(categories: CategoryDTO[], categoryId?: string) {
    let category = categories.find(category => category.id === categoryId);
    return category ?? null;
}

function getSelectedSubcategory(category: CategoryDTO | null, subcategoryId?: string) {
    if (category === null) {
        return null;
    }

    let subcategory = category.subcategories.find(subcategory => subcategory.id === subcategoryId);
    return subcategory ?? null;
}

const promise = refresh();
</script>
