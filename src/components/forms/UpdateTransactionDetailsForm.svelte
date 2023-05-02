<Input label="Description" bind:value={updateDetails.description} />

<CategorySelect
  bind:categoryId={updateDetails.categoryId}
  bind:subcategoryId={updateDetails.subcategoryId}
/>

<ExternalAccountSelect
  bind:externalAccountId={updateDetails.externalAccountId}
  {externalAccountName}
/>

<script lang="ts">
// Imports
import type UpdateTransactionDetailsDTO from "@/models/dto/transactions/UpdateTransactionDetailsDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";

// Components
import Input from "@/components/common/Input.svelte";
import CategorySelect from "@/components/CategorySelect.svelte";
import ExternalAccountSelect from "@/components/ExternalAccountSelect.svelte";

// Props
export var updateDetails: UpdateTransactionDetailsDTO;
export var externalAccountName: string | undefined;

// Data
let selectedCategory: CategoryDTO = null;
</script>
