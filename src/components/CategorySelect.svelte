<AsyncContent {promise}>
  <Select
    bind:value
    items={categories}
    searchKey={category => category.name}
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
import CategorySpan from "@/components/CategorySpan.svelte";

// Props
export var value: CategoryDTO | null = null;

// Data
const categoryService = new CategoryService();
let categories: CategoryDTO[] = [];

// Functions
async function refresh() {
    categories = await categoryService.getAllCategories();
}

const promise = refresh();
</script>
