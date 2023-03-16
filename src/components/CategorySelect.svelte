<AsyncContent {promise}>
  <Select
    {label}
    bind:value
    items={categories}
    searchKey={category => category?.name ?? "No category"}
    valueKey={category => category?.id ?? null}
    let:item
  >
    <CategorySpan category={item} />
  </Select>
</AsyncContent>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";

// Components
import Select from "@/components/common/Select.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import CategoryService from "@/services/CategoryService";
import CategorySpan from "@/components/spans/CategorySpan.svelte";

// Props
export var label: string = "Category";
export var value: string | null = null;

// Data
const categoryService = new CategoryService();
let categories: CategoryDTO[] = [];

// Functions
async function refresh() {
    categories = await categoryService.getAllCategories();
    categories.unshift(null);
    categories = categories;
}

const promise = refresh();
</script>
