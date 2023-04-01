<Input label="Description" bind:value={updateDetails.description} />

<CategorySelect
  bind:categoryId={updateDetails.categoryId}
  bind:subcategoryId={updateDetails.subcategoryId}
/>

<script lang="ts">
// Imports
import type UpdateTransactionDetailsDTO from "@/models/dto/transactions/UpdateTransactionDetailsDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";

// Components
import Input from "@/components/common/Input.svelte";
import CategorySelect from "@/components/CategorySelect.svelte";

// Props
export var updateDetails: UpdateTransactionDetailsDTO;

// Data
let selectedCategory: CategoryDTO = null;
</script>
